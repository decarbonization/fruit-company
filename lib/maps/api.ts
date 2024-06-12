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

import { addSeconds } from "date-fns";
import jwt, { JwtHeader } from "jsonwebtoken";
import { FruitError } from "../core/error";
import { FetchFunction } from "../core/fetch";
import { LocationCoordinates, urlLocationCoordinates } from "../core/models/common";
import { FruitRequest } from "../core/request";
import { FruitToken } from "../core/token";
import { PlaceResults } from "./models/places";

const apiUrl = "https://maps-api.apple.com/v1";

/**
 * An object that contains an access token and an expiration time in seconds.
 */
interface TokenResponse {
    /**
     * A string that represents the access token.
     */
    readonly accessToken: string;

    /**
     * An integer that indicates the time, in seconds from now until the token expires.
     */
    readonly expiresInSeconds: number;
}

/**
 * Information about an error that occurs while processing a request.
 */
interface ErrorResponse {
    /**
     * An array of strings with additional details about the error
     */
    readonly details: string[];

    /**
     * A message that provides details about the error.
     */
    readonly message: string;
}

export class MapsToken implements FruitToken {
    constructor(
        private readonly appId: string,
        private readonly teamId: string,
        private readonly keyId: string,
        private readonly privateKey: string | Buffer
    ) {
        this.accessToken = "";
        this.expiresAt = new Date(0);
    }

    private accessToken: string;
    private expiresAt: Date;

    get headers(): Headers {
        return new Headers([
            ["Authorization", `Bearer ${this.accessToken}`],
        ]);
    }

    get retryLimit(): number {
        return 2;
    }

    get isValid(): boolean {
        return (this.accessToken !== "" && new Date() > this.expiresAt);
    }

    async refresh(fetch: FetchFunction): Promise<void> {
        const authToken = jwt.sign({
            sub: this.appId,
        }, this.privateKey, {
            issuer: this.teamId,
            expiresIn: "1m",
            keyid: this.keyId,
            algorithm: "ES256",
            header: {
                id: `${this.teamId}.${this.appId}`,
            } as unknown as JwtHeader,
        });

        const response = await fetch(`${apiUrl}/token`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json() as ErrorResponse;
            throw new FruitError(
                response.status,
                response.statusText,
                `${errorResponse.message} (${errorResponse.details.join(', ')})`
            );
        }
        const tokenResponse = await response.json() as TokenResponse;
        this.accessToken = tokenResponse.accessToken;
        this.expiresAt = addSeconds(new Date(), tokenResponse.expiresInSeconds);
    }
}

class MapsRequest<Result> implements FruitRequest<MapsToken, Result> {
    constructor() {
    }

    prepare(_token: MapsToken): Request {
        throw new Error("Method not implemented.");
    }

    async parse(fetchResponse: Response): Promise<Result> {
        if (!fetchResponse.ok) {
            const errorResponse = await fetchResponse.json() as ErrorResponse;
            throw new FruitError(
                fetchResponse.status,
                fetchResponse.statusText,
                `${errorResponse.message} (${errorResponse.details.join(', ')})`
            );
        }
        return await fetchResponse.json() as Result;
    }
}

export class GeocodeAddress extends MapsRequest<PlaceResults> {
    constructor(readonly options: Readonly<{
        query: string,
        limitToCountries?: string[],
        language?: string,
        searchLocation?: LocationCoordinates,
        searchRegion?: LocationCoordinates,
        userLocation?: LocationCoordinates,
    }>) {
        super();
    }

    override prepare(token: MapsToken): Request {
        const url = new URL(`${apiUrl}/geocode`);
        url.searchParams.append("q", this.options.query);
        if (this.options.limitToCountries !== undefined) {
            url.searchParams.append("limitToCountries", this.options.limitToCountries.join(","));
        }
        if (this.options.language !== undefined) {
            url.searchParams.append("lang", this.options.language);
        }
        if (this.options.searchLocation !== undefined) {
            url.searchParams.append("searchLocation", urlLocationCoordinates(this.options.searchLocation));
        }
        if (this.options.searchRegion !== undefined) {
            url.searchParams.append("searchRegion", urlLocationCoordinates(this.options.searchRegion));
        }
        if (this.options.userLocation !== undefined) {
            url.searchParams.append("userLocation", urlLocationCoordinates(this.options.userLocation));
        }
        return new Request(url, { headers: token.headers });
    }

    override toString(): string {
        return `GeocodeAddress(${JSON.stringify(this.options)})`;
    }
}

export class ReverseGeocodeAddress extends MapsRequest<PlaceResults> {
    constructor(readonly options: Readonly<{
        location: LocationCoordinates,
        language?: string,
    }>) {
        super();
    }

    override prepare(token: MapsToken): Request {
        const url = new URL(`${apiUrl}/reverseGeocode`);
        url.searchParams.append("loc", urlLocationCoordinates(this.options.location));
        if (this.options.language !== undefined) {
            url.searchParams.append("lang", this.options.language);
        }
        return new Request(url, { headers: token.headers });
    }

    override toString(): string {
        return `ReverseGeocodeAddress(${JSON.stringify(this.options)})`;
    }
}
