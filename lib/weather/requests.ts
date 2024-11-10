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

import { RESTError, SereneRequest, SereneRequestParseOptions, SereneRequestPrepareOptions } from "serene-front";
import { LocationCoordinates } from "serene-front/data";
import { Attribution, weatherKitUrl } from "./models";
import { Weather, parseWeather } from "./models/weather";
import { WeatherToken } from "./token";

export type WeatherDataSet =
    | "currentWeather"
    | "forecastDaily"
    | "forecastHourly"
    | "forecastNextHour"
    | "weatherAlerts";

export const allWeatherDataSets = Object.freeze<WeatherDataSet[]>([
    'currentWeather',
    'forecastDaily',
    'forecastHourly',
    'forecastNextHour',
    'weatherAlerts',
]);

export interface WeatherQueryOptions {
    readonly language: string;
    readonly location: LocationCoordinates;
    readonly timezone: string;
    readonly countryCode?: string;
    readonly currentAsOf?: Date;
    readonly dailyEnd?: Date;
    readonly dailyStart?: Date;
    readonly dataSets?: readonly WeatherDataSet[];
    readonly hourlyEnd?: Date;
    readonly hourlyStart?: Date;
}

export class WeatherQuery implements SereneRequest<WeatherToken, Weather> {
    constructor(readonly options: WeatherQueryOptions) {
    }

    prepare({ }: SereneRequestPrepareOptions<WeatherToken>): Request {
        const url = new URL(`${weatherKitUrl}/api/v1/weather/${this.options.language}/${this.options.location.latitude}/${this.options.location.longitude}`);
        for (const [key, value] of Object.entries(this.options)) {
            if (key === "location" || key === "language") {
                // Skip, part of the path.
                continue;
            } else if (Array.isArray(value)) {
                url.searchParams.append(key, value.join(","));
            } else if (value instanceof Date) {
                url.searchParams.append(key, value.toISOString());
            } else if (typeof value === "number") {
                url.searchParams.append(key, String(value));
            } else if (typeof value === "string") {
                url.searchParams.append(key, value);
            } else {
                throw new Error(`GetWeatherOptions.${key} invalid <${value}>`);
            }
        }
        if (this.options.countryCode !== undefined) {
            // The documentation for how to specify a country code is likely wrong.
            // See <https://forums.developer.apple.com/forums/thread/723800> for discussion.
            // Including both parameters here just in case.
            url.searchParams.append("country", this.options.countryCode);
        }
        return new Request(url);
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<WeatherToken>): Promise<Weather> {
        if (!fetchResponse.ok) {
            throw new RESTError(
                fetchResponse.status,
                fetchResponse.statusText,
                `<${fetchResponse.url}>`
            );
        }
        const raw = await fetchResponse.text();
        return parseWeather(raw);
    }

    toString(): string {
        return `WeatherQuery(${JSON.stringify(this.options)})`;
    }
}

export interface WeatherAttributionOptions {
    readonly language: string;
}

export class WeatherAttribution implements SereneRequest<WeatherToken, Attribution> {
    constructor(readonly options: WeatherAttributionOptions) {
    }

    prepare({ }: SereneRequestPrepareOptions<WeatherToken>): Request {
        const url = new URL(`${weatherKitUrl}/attribution/${this.options.language}`);
        return new Request(url);
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<WeatherToken>): Promise<Attribution> {
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

