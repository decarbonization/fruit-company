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

import { FruitError } from "../core/error";
import { LocationCoordinates, urlLocationCoordinates } from "../core/models/common";
import { FruitRequest } from "../core/request";
import { MapsToken } from "./maps-token";
import { MapErrorResponse, mapKitApiUrl } from "./models";
import { PlaceResults } from "./models/places";

class MapsGeocodingRequest<Result> implements FruitRequest<MapsToken, Result> {
    constructor() {
    }

    prepare(_token: MapsToken): Request {
        throw new Error("Method not implemented.");
    }

    async parse(fetchResponse: Response): Promise<Result> {
        if (!fetchResponse.ok) {
            const errorResponse = await fetchResponse.json() as MapErrorResponse;
            throw new FruitError(
                fetchResponse.status,
                fetchResponse.statusText,
                `${errorResponse.message} (${errorResponse.details.join(', ')})`
            );
        }
        return await fetchResponse.json() as Result;
    }
}

export class GeocodeAddress extends MapsGeocodingRequest<PlaceResults> {
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
        const url = new URL(`${mapKitApiUrl}/geocode`);
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
        return new Request(url, { headers: token._headers });
    }

    override toString(): string {
        return `GeocodeAddress(${JSON.stringify(this.options)})`;
    }
}

export class ReverseGeocodeAddress extends MapsGeocodingRequest<PlaceResults> {
    constructor(readonly options: Readonly<{
        location: LocationCoordinates,
        language?: string,
    }>) {
        super();
    }

    override prepare(token: MapsToken): Request {
        const url = new URL(`${mapKitApiUrl}/reverseGeocode`);
        url.searchParams.append("loc", urlLocationCoordinates(this.options.location));
        if (this.options.language !== undefined) {
            url.searchParams.append("lang", this.options.language);
        }
        return new Request(url, { headers: token._headers });
    }

    override toString(): string {
        return `ReverseGeocodeAddress(${JSON.stringify(this.options)})`;
    }
}
