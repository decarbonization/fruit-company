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

import { FetchFunction } from "./fetch";

/**
 * An object which is used to authenticate requests to a service.
 */
export interface FruitToken {
    /**
     * The number of times a token may be refreshed 
     * in response to a request failing due to a token
     * no longer being valid.
     */
    readonly retryLimit: number;

    /**
     * Whether this token may currently be valid.
     */
    readonly isValid: boolean;

    /**
     * Refresh this token to further authentic requests to a service.
     * 
     * @param fetch The fetch function to use for any network requests.
     */
    refresh(fetch: FetchFunction): Promise<void>;
}

/**
 * Encapsulates an error which occurred when working with an authentication token.
 */
export class FruitTokenError extends Error {

}
