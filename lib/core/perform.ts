/*
 * MIT No Attribution
 * 
 * Copyright 2024 Peter "Kevin" Contreras
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { FruitError } from "./error";
import { FetchFunction, defaultFetch } from "./fetch";
import { FruitLogger, defaultLogger } from "./logger";
import { FruitRequest } from "./request";
import { FruitAuthority } from "./authority";

export interface FruitPerformOptions<Authority extends FruitAuthority, Result> {
    /**
     * The object to use to authenticate the `request` to a service.
     */
    readonly authority: Authority;

    /**
     * An object encapsulating a request to a RESTful API service.
     */
    readonly request: FruitRequest<Authority, Result>;

    /**
     * The fetch function to use to perform network operations.
     */
    readonly fetch?: FetchFunction;

    /**
     * The logger to use to record the internal operations of the perform function.
     */
    readonly logger?: FruitLogger;
}

export async function perform<A extends FruitAuthority, R>({
    authority,
    request,
    fetch = defaultFetch,
    logger = defaultLogger,
}: FruitPerformOptions<A, R>): Promise<R> {
    if (!authority.isValid) {
        logger({ event: "willRefreshAuthority", authority });
        await authority.refresh({ fetch });
    }
    for (let retry = 0, retryLimit = authority.retryLimit; retry <= retryLimit; retry++) {
        const fetchRequest = request.prepare({ authority });
        logger({ event: "willAuthenticate", authority, fetchRequest });
        authority.authenticate({ fetchRequest });
        logger({ event: "willFetch", fetchRequest });
        const fetchResponse = await fetch(fetchRequest);
        if (!fetchResponse.ok && fetchResponse.status === 401) {
            logger({ event: "willRefreshAuthority", authority, retry });
            await authority.refresh({ fetch });
            continue;
        }
        logger({ event: "willParse", fetchResponse });
        return await request.parse({ authority, fetchResponse });
    }
    throw new FruitError(401, "Unauthorized", "Retry limit exceeded");
}
