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
import { importPKCS8, SignJWT } from "jose";
import { AuthorityError, SereneAuthority, SereneAuthorityAuthenticateOptions, SereneAuthorityRefreshOptions } from "serene-front";
import { setRequestHeaders } from "serene-front/urls";
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
export class MapsToken implements SereneAuthority {
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
        private readonly privateKey: string,
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
        return (this.accessToken !== "" && this.expiresAt >= new Date());
    }

    async refresh({ fetch }: SereneAuthorityRefreshOptions): Promise<void> {
        const privateKeyPKCS8 = await importPKCS8(this.privateKey, "ES256");
        const signBearerTokenPayload = new SignJWT({ sub: this.appId })
            .setIssuer(this.teamId)
            .setIssuedAt()
            .setExpirationTime("1 m")
            .setProtectedHeader({
                alg: "ES256",
                kid: this.keyId,
                typ: "JWT",
                id: `${this.teamId}.${this.appId}`,
            });
        const authToken = await signBearerTokenPayload.sign(privateKeyPKCS8);

        const response = await fetch(`${mapKitApiUrl}/token`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json() as MapErrorResponse;
            throw new AuthorityError(
                response.status,
                response.statusText,
                `${errorResponse.message} (${errorResponse.details.join(', ')})`
            );
        }
        const tokenResponse = await response.json() as TokenResponse;
        this.accessToken = tokenResponse.accessToken;
        this.expiresAt = addSeconds(new Date(), tokenResponse.expiresInSeconds);
    }

    async authenticate({ fetchRequest }: SereneAuthorityAuthenticateOptions): Promise<Request> {
        if (!this.isValid) {
            throw new AuthorityError(
                401,
                "Unauthorized",
                "Invalid MapsToken cannot be used to authenticate requests."
            );
        }
        return setRequestHeaders(fetchRequest, [
            ["Authorization", `Bearer ${this.accessToken}`],
        ]);
    }

    /**
     * @ignore
     */
    toString(): string {
        return `MapsToken(isValid: ${this.isValid}, expiresAt: ${this.expiresAt})`;
    }
}
