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

import { LocationCoordinates } from "../../core/models/common";
import { MapRegion, StructuredAddress } from "./base";

/**
 * An object that describes a place in terms of a variety of spatial, administrative, and qualitative properties.
 */
export interface Place {
    /**
     * The country or region of the place.
     */
    readonly country: string;

    /**
     * The 2-letter country code of the place.
     */
    readonly countryCode: string;

    /**
     * The geographic region associated with the place.
     * 
     * This is a rectangular region on a map expressed as south-west and north-east points.
     * Specifically south latitude, west longitude, north latitude, and east longitude.
     */
    readonly displayMapRegion: MapRegion;

    /**
     * The address of the place, formatted using its conventions of its country or region.
     */
    readonly formattedAddressLines: string[];

    /**
     * A place name that you can use for display purposes.
     */
    readonly name: string;

    /**
     * The latitude and longitude of this place.
     */
    readonly coordinate: LocationCoordinates;

    /**
     * A StructuredAddress object that describes details of the place’s address.
     */
    readonly structuredAddress: StructuredAddress;
}

/**
 * An object that contains an array of places.
 */
export interface PlaceResults {
    /**
     * An array of one or more Place objects.
     */
    readonly results: Place[];
}
