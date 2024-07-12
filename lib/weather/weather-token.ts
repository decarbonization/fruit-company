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

import jwt, { JwtHeader } from "jsonwebtoken";
import { AuthorityError, SereneAuthority, SereneAuthorityAuthenticateOptions, SereneAuthorityRefreshOptions } from "serene-front";

/**
 * A token used to interact with weather services.
 */
export class WeatherToken implements SereneAuthority {
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
        this.bearerToken = "";
    }

    /**
     * The bearer token used to decorate requests.
     */
    private bearerToken: string;

    get retryLimit(): number {
        return 1;
    }

    get isValid(): boolean {
        if (this.bearerToken === "") {
            return false;
        }
        const payload = jwt.decode(this.bearerToken);
        if (payload === null || typeof payload !== 'object') {
            return false;
        }
        const rawExpiration = payload.exp;
        if (rawExpiration === undefined) {
            return false;
        }
        const expiration = new Date(rawExpiration * 1000);
        return (expiration >= new Date());
    }

    async refresh({ }: SereneAuthorityRefreshOptions): Promise<void> {
        this.bearerToken = jwt.sign({
            sub: this.appId,
        }, this.privateKey, {
            issuer: this.teamId,
            expiresIn: "24h",
            keyid: this.keyId,
            algorithm: "ES256",
            header: {
                id: `${this.teamId}.${this.appId}`,
            } as unknown as JwtHeader,
        });
    }

    async authenticate({ fetchRequest }: SereneAuthorityAuthenticateOptions): Promise<Request> {
        if (!this.isValid) {
            throw new AuthorityError(
                401,
                "Unauthorized",
                "Invalid WeatherToken cannot be used to authenticate requests."
            );
        }
        const request = new Request(fetchRequest);
        request.headers.set("Authorization", `Bearer ${this.bearerToken}`);
        return request;
    }
}
