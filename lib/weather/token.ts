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

import { decodeJwt, importPKCS8, SignJWT } from "jose";
import { AuthorityError, SereneAuthority, SereneAuthorityAuthenticateOptions, SereneAuthorityRefreshOptions } from "serene-front";
import { setRequestHeaders } from "serene-front/urls";

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
        private readonly privateKey: string,
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
        const payload = decodeJwt(this.bearerToken);
        if (payload === null || typeof payload !== 'object') {
            return false;
        }
        const rawExpiration = payload.exp;
        if (typeof rawExpiration !== 'number') {
            return false;
        }
        const expiration = new Date(rawExpiration * 1000);
        return (expiration >= new Date());
    }

    async refresh({ }: SereneAuthorityRefreshOptions): Promise<void> {
        const privateKeyPKCS8 = await importPKCS8(this.privateKey, "ES256");
        const signBearerTokenPayload = new SignJWT({ sub: this.appId })
            .setIssuer(this.teamId)
            .setIssuedAt()
            .setExpirationTime("24 h")
            .setProtectedHeader({
                alg: "ES256",
                kid: this.keyId,
                typ: "JWT",
                id: `${this.teamId}.${this.appId}`,
            });
        this.bearerToken = await signBearerTokenPayload.sign(privateKeyPKCS8);
    }

    async authenticate({ fetchRequest }: SereneAuthorityAuthenticateOptions): Promise<Request> {
        if (!this.isValid) {
            throw new AuthorityError(
                401,
                "Unauthorized",
                "Invalid WeatherToken cannot be used to authenticate requests."
            );
        }
        return setRequestHeaders(fetchRequest, [
            ["Authorization", `Bearer ${this.bearerToken}`],
        ]);
    }

    /**
     * @ignore
     */
    toString(): string {
        return `WeatherToken(isValid: ${this.isValid})`;
    }
}
