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

import jwt from "jsonwebtoken";
import { AuthorityError, SereneAuthority, SereneAuthorityAuthenticateOptions, SereneAuthorityRefreshOptions } from "serene-front";
import { setRequestHeaders } from "serene-front/urls";

/**
 * A token used to interact with Apple Music.
 */
export class MusicDeveloperToken implements SereneAuthority {
    /**
     * Create a token to interact with Apple Music.
     * 
     * @param appId An app identifier from an Apple developer account.
     * @param teamId A team identifier from an Apple developer account.
     * @param keyId The identifier of the key used to sign requests.
     * @param privateKey An Apple Music key generated using an Apple developer account.
     */
    constructor(
        private readonly appId: string,
        private readonly teamId: string,
        private readonly keyId: string,
        private readonly privateKey: string | Buffer
    ) {
        this._bearerToken = "";
    }

    /**
     * The bearer token used to decorate requests.
     */
    private _bearerToken: string;

    get retryLimit(): number {
        return 1;
    }

    get isValid(): boolean {
        if (this._bearerToken === "") {
            return false;
        }
        const payload = jwt.decode(this._bearerToken);
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

    /**
     * Access the bearer token returning `undefined` if the token is not valid.
     * 
     * Use this to share the same token between a backend using this
     * library and a front end using the MusicKit JS library.
     */
    get bearerToken(): string | undefined {
        if (!this.isValid) {
            return undefined;
        }
        return this._bearerToken;
    }

    async refresh({ }: SereneAuthorityRefreshOptions): Promise<void> {
        this._bearerToken = jwt.sign({
            sub: this.appId,
        }, this.privateKey, {
            issuer: this.teamId,
            expiresIn: "24h",
            keyid: this.keyId,
            algorithm: "ES256",
        });
    }

    async authenticate({ fetchRequest }: SereneAuthorityAuthenticateOptions): Promise<Request> {
        if (!this.isValid) {
            throw new AuthorityError(
                401,
                "Unauthorized",
                "Invalid MusicDeveloperToken cannot be used to authenticate requests."
            );
        }
        return setRequestHeaders(fetchRequest, [
            ["Authorization", `Bearer ${this._bearerToken}`],
        ]);
    }

    /**
     * @ignore
     */
    toString(): string {
        return `MusicDeveloperToken(isValid: ${this.isValid})`;
    }
}
