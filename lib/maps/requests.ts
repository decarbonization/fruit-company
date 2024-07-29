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
import { MapsToken } from "./token";
import { MapErrorResponse, mapKitApiUrl } from "./models";
import { parsePlaceResults, PlaceResults } from "./models/places";

class MapsGeocodingRequest implements SereneRequest<MapsToken, PlaceResults> {
    constructor() {
    }

    prepare({ }: SereneRequestPrepareOptions<MapsToken>): Request {
        throw new Error("Method not implemented.");
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<MapsToken>): Promise<PlaceResults> {
        if (!fetchResponse.ok) {
            const errorResponse = await fetchResponse.json() as MapErrorResponse;
            throw new RESTError(
                fetchResponse.status,
                fetchResponse.statusText,
                `${errorResponse.message} (${errorResponse.details.join(', ')})`
            );
        }
        const json = await fetchResponse.text();
        return parsePlaceResults(json);
    }
}

export class GeocodeAddress extends MapsGeocodingRequest {
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

    override prepare({ }: SereneRequestPrepareOptions<MapsToken>): Request {
        const url = new URL(`${mapKitApiUrl}/geocode`);
        url.searchParams.append("q", this.options.query);
        if (this.options.limitToCountries !== undefined) {
            url.searchParams.append("limitToCountries", this.options.limitToCountries.join(","));
        }
        if (this.options.language !== undefined) {
            url.searchParams.append("lang", this.options.language);
        }
        if (this.options.searchLocation !== undefined) {
            url.searchParams.append("searchLocation", this.options.searchLocation.urlPair);
        }
        if (this.options.searchRegion !== undefined) {
            url.searchParams.append("searchRegion", this.options.searchRegion.urlPair);
        }
        if (this.options.userLocation !== undefined) {
            url.searchParams.append("userLocation", this.options.userLocation.urlPair);
        }
        return new Request(url);
    }

    override toString(): string {
        return `GeocodeAddress(${JSON.stringify(this.options)})`;
    }
}

export class ReverseGeocodeAddress extends MapsGeocodingRequest {
    constructor(readonly options: Readonly<{
        location: LocationCoordinates,
        language?: string,
    }>) {
        super();
    }

    override prepare({ }: SereneRequestPrepareOptions<MapsToken>): Request {
        const url = new URL(`${mapKitApiUrl}/reverseGeocode`);
        url.searchParams.append("loc", this.options.location.urlPair);
        if (this.options.language !== undefined) {
            url.searchParams.append("lang", this.options.language);
        }
        return new Request(url);
    }

    override toString(): string {
        return `ReverseGeocodeAddress(${JSON.stringify(this.options)})`;
    }
}
