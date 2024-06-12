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
import { FruitError } from "../core/error";
import { FetchFunction } from "../core/fetch";
import { LocationCoordinates, urlLocationCoordinates } from "../core/models/common";
import { FruitRequest } from "../core/request";
import { FruitToken } from "../core/token";
import { Attribution } from "./models/attribution";
import { Weather } from "./models/weather";

const weatherKitUrl = "https://weatherkit.apple.com";
const apiUrl = `${weatherKitUrl}/api/v1`;

export class WeatherToken implements FruitToken {
    constructor(
        private readonly appId: string,
        private readonly teamId: string,
        private readonly keyId: string,
        private readonly privateKey: string | Buffer
    ) {
        this.bearerToken = "";
    }

    private bearerToken: string;

    get retryLimit(): number {
        return 1;
    }

    get headers(): Headers {
        return new Headers([
            ["Authorization", `Bearer ${this.bearerToken}`],
        ]);
    }

    get isValid(): boolean {
        return (this.bearerToken !== "");
    }

    async refresh(_fetch: FetchFunction): Promise<void> {
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
}

export const enum WeatherDataSet {
    currentWeather = "currentWeather",
    forecastDaily = "forecastDaily",
    forecastHourly = "forecastHourly",
    forecastNextHour = "forecastNextHour",
    weatherAlerts = "weatherAlerts",
}

export const allWeatherDataSets: readonly WeatherDataSet[] = [
    WeatherDataSet.currentWeather,
    WeatherDataSet.forecastDaily,
    WeatherDataSet.forecastHourly,
    WeatherDataSet.forecastNextHour,
    WeatherDataSet.weatherAlerts,
];

export class WeatherQuery implements FruitRequest<WeatherToken, Weather> {
    constructor(readonly options: Readonly<{
        language: string,
        location: LocationCoordinates,
        timezone: string,
        countryCode?: string,
        currentAsOf?: Date,
        dailyEnd?: Date,
        dailyStart?: Date,
        dataSets?: readonly WeatherDataSet[],
        hourlyEnd?: Date,
        hourlyStart?: Date
    }>) {
    }

    prepare(token: WeatherToken): Request {
        const url = new URL(`${apiUrl}/weather/${this.options.language}/${this.options.location.latitude}/${this.options.location.longitude}`);
        for (const [key, value] of Object.entries(this.options)) {
            if (Array.isArray(value)) {
                url.searchParams.append(key, value.join(","));
            } else if (value instanceof Date) {
                url.searchParams.append(key, value.toISOString());
            } else if (typeof value === "number") {
                url.searchParams.append(key, String(value));
            } else if (typeof value === "string") {
                url.searchParams.append(key, value);
            } else if (key === "location" && typeof value === "object") {
                url.searchParams.append(key, urlLocationCoordinates(value as LocationCoordinates));
            } else {
                throw new Error(`GetWeatherOptions.${key} invalid <${value}>`);
            }
        }
        return new Request(url, { headers: token.headers });
    }

    async parse(fetchResponse: Response): Promise<Weather> {
        const raw = await fetchResponse.text();
        const object = JSON.parse(raw, (key, value) => {
            if (typeof value === 'string' && (key === "asOf"
                || key === "moonrise"
                || key === "moonset"
                || key.startsWith("solar")
                || key.startsWith("sunrise")
                || key.startsWith("sunset")
                || key.endsWith("Time")
                || key.endsWith("End")
                || key.endsWith("Start"))) {
                return new Date(value);
            } else {
                return value;
            }
        });
        if (!fetchResponse.ok) {
            throw new FruitError(fetchResponse.status, fetchResponse.statusText, `<${fetchResponse.url}>`);
        }
        return object as Weather;
    }

    toString(): string {
        return `WeatherQuery(${JSON.stringify(this.options)})`;
    }
}

export class WeatherAttribution implements FruitRequest<WeatherToken, Attribution> {
    constructor(readonly options: Readonly<{
        language: string
    }>) {
    }

    prepare(_token: WeatherToken): Request {
        const url = new URL(`${weatherKitUrl}/attribution/${this.options.language}`);
        return new Request(url);
    }

    async parse(fetchResponse: Response): Promise<Attribution> {
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
