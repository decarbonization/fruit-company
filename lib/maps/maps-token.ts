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
import { FetchAuthorityAuthenticateOptions, FruitAuthority, FruitAuthorityError, FruitAuthorityRefreshOptions } from "../core/authority";
import { FruitError } from "../core/error";
import { MapErrorResponse, mapKitApiUrl } from "./models";

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
 * A token used to interact with weather services.
 */
export class MapsToken implements FruitAuthority {
    /**
     * Create a token to interact with weather services.
     * 
     * @param appId An app identifier from an Apple developer account.
     * @param teamId A team identifier from an Apple developer account.
     * @param keyId The identifier of the key used to sign requests.
     * @param privateKey A WeatherKit REST key generated using an Apple developer account.
     */
    constructor(
        private readonly appId: string,
        private readonly teamId: string,
        private readonly keyId: string,
        private readonly privateKey: string | Buffer
    ) {
        this.accessToken = "";
        this.expiresAt = new Date(0);
    }

    /**
     * The bearer token used to decorate requests.
     */
    private accessToken: string;

    /**
     * When this token expires.
     */
    private expiresAt: Date;

    get retryLimit(): number {
        return 2;
    }

    get isValid(): boolean {
        return (this.accessToken !== "" && new Date() > this.expiresAt);
    }

    async refresh({ fetch }: FruitAuthorityRefreshOptions): Promise<void> {
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

        const response = await fetch(`${mapKitApiUrl}/token`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json() as MapErrorResponse;
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

    async authenticate({ fetchRequest }: FetchAuthorityAuthenticateOptions): Promise<void> {
        if (!this.isValid) {
            throw new FruitAuthorityError("Invalid WeatherToken cannot be used to authenticate requests.");
        }
        fetchRequest.headers.set("Authorization", `Bearer ${this.accessToken}`);
    }
}
