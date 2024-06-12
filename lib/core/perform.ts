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
import { FruitRequest } from "./request";
import { FruitToken } from "./token";

export interface FruitPerformOptions<Token extends FruitToken, Result> {
    readonly token: Token;
    readonly request: FruitRequest<Token, Result>;
    readonly fetch?: FetchFunction;
}

export async function perform<T extends FruitToken, R>({
    token,
    request,
    fetch = defaultFetch,
}: FruitPerformOptions<T, R>): Promise<R> {
    if (!token.isValid) {
        await token.refresh(fetch);
    }
    for (let retry = 0, retryLimit = token.retryLimit; retry <= retryLimit; retry++) {
        const fetchRequest = request.prepare(token);
        const fetchResponse = await fetch(fetchRequest);
        if (!fetchResponse.ok && fetchResponse.status === 401) {
            await token.refresh(fetch);
            continue;
        }
        return await request.parse(fetchResponse);
    }
    throw new FruitError(401, "Unauthorized", "Retry limit exceeded");
}
