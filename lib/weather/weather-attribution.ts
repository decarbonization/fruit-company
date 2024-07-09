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

import { FruitRequest, FruitRequestParseOptions, FruitRequestPrepareOptions } from "../core";
import { Attribution, weatherKitUrl } from "./models";
import { WeatherToken } from "./weather-token";

export interface WeatherAttributionOptions {
    readonly language: string;
}

export class WeatherAttribution implements FruitRequest<WeatherToken, Attribution> {
    constructor(readonly options: WeatherAttributionOptions) {
    }

    prepare({ }: FruitRequestPrepareOptions<WeatherToken>): Request {
        const url = new URL(`${weatherKitUrl}/attribution/${this.options.language}`);
        return new Request(url);
    }

    async parse({ fetchResponse }: FruitRequestParseOptions<WeatherToken>): Promise<Attribution> {
        const raw = await fetchResponse.text();
        const object = JSON.parse(raw, (key, value) => {
            if (key.startsWith("logo")) {
                return `${weatherKitUrl}${value}`;
            } else {
                return value;
            }
        });
        return object as Attribution;
    }

    toString(): string {
        return `WeatherAttribution(${JSON.stringify(this.options)})`;
    }
}
