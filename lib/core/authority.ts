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
 * The options passed to a `FruitAuthority` object's `refresh` method.
 */
export interface FruitAuthorityRefreshOptions {
    /**
     * The fetch function to use to perform any network operations required 
     * to refresh an authority's ability to authenticate requests to a service.
     */
    readonly fetch: FetchFunction;
}

/**
 * The options passed to a `FruitAuthority` object's `authenticate` method.
 */
export interface FetchAuthorityAuthenticateOptions {
    /**
     * The soon-to-be outgoing network operation to communicate with  
     * a service that must be authenticated by an authority first.
     */
    readonly fetchRequest: Request;
}

/**
 * An object which is used to authenticate requests to a service.
 */
export interface FruitAuthority {
    /**
     * The number of times an authority may be refreshed in response
     * to a request failing due to an authority no longer being valid.
     */
    readonly retryLimit: number;

    /**
     * Indicates whether this authority object is valid 
     * and can be used to authenticate requests.
     */
    readonly isValid: boolean;

    /**
     * Refresh this authority to further authentic requests to a service.
     * 
     * @param options The options the authority should use when refreshing itself,
     * including the `fetch` function it should use for any network operations.
     * @throws A `FruitAuthorityError` or `Error`-derivative if the authority 
     * cannot be refreshed.
     */
    refresh(options: FruitAuthorityRefreshOptions): Promise<void>;

    /**
     * Authenticate a soon-to-be outgoing network request to a service.
     * 
     * @param options The options the authority should use when authenticating 
     * a network request, including the request itself.
     * @throws A `FruitAuthorityError` or `Error`-derivative if the network 
     * cannot be authenticated, such as when the authority is not valid.
     */
    authenticate(options: FetchAuthorityAuthenticateOptions): Promise<void>;
}

/**
 * Encapsulates an error which occurred when working with an `FruitAuthority` object.
 */
export class FruitAuthorityError extends Error {

}
