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

import { FruitAuthority } from "./authority";

/**
 * The options passed to a `FruitRequest`'s `prepare` method.
 */
export interface FruitRequestPrepareOptions<Authority extends FruitAuthority> {
    /**
     * The authority which will be used to authenticate the request's network request.
     * 
     * Most request objects do not need to use the authority directly when
     * preparing an outgoing network request.
     */
    readonly authority: Authority;
}

/**
 * The options passed to a `FruitRequest`'s `parse` method.
 */
export interface FruitRequestParseOptions<Authority extends FruitAuthority> {
    /**
     * The authority which was used to authenticate the request's network request.
     * 
     * Most request objects do not need to use the authority directly when
     * parsing the response from an outgoing network request.
     */
    readonly authority: Authority;

    /**
     * The response to sending an outgoing network request to a service.
     */
    readonly fetchResponse: Response;
}

/**
 * An object which encapsulates a request to a RESTful API service.
 */
export interface FruitRequest<Authority extends FruitAuthority, Result> {
    /**
     * Prepare an outgoing network request to the service this request 
     * object is designed to communicate with.
     * 
     * @param options The options to use when preparing an outgoing network request.
     * @returns A network request object which will be subsequently decorated
     * by the request's companion `FruitAuthority` object.
     */
    prepare(options: FruitRequestPrepareOptions<Authority>): Request;

    /**
     * Parse the response fetched from sending a request to the service
     * this request object is designed to communicate with.
     * 
     * @param options The options to use when parsing the response from a network request.
     * @returns A fully parsed object.
     * @throws A `FruitError` or `Error`-derivative if the response could not be parsed.
     * 
     * The request object is responsible for checking the response for error  
     * conditions and throwing error objects as appropriate.
     */
    parse(options: FruitRequestParseOptions<Authority>): Promise<Result>;
}
