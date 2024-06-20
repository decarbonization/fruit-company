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

/**
 * A string containing the URL of the Apple MapKit API REST services.
 */
export const mapKitApiUrl = "https://maps-api.apple.com/v1";

/**
 * Information about an error that occurs while processing a request.
 */
export interface MapErrorResponse {
    /**
     * An array of strings with additional details about the error
     */
    readonly details: string[];

    /**
     * A message that provides details about the error.
     */
    readonly message: string;
}

/**
 * An object that describes a map region in terms of its upper-right and lower-left corners as a pair of geographic points.
 */
export interface MapRegion {
    /**
     * A double value that describes the east longitude of the map region.
     */
    readonly eastLongitude: number;

    /**
     * A double value that describes the north latitude of the map region.
     */
    readonly northLatitude: number;

    /**
     * A double value that describes the south latitude of the map region.
     */
    readonly southLatitude: number;

    /**
     * A double value that describes west longitude of the map region.
     */
    readonly westLongitude: number;
}

/**
 * An object that describes the detailed address components of a place.
 */
export interface StructuredAddress {
    /**
     * The state or province of the place.
     */
    readonly administrativeArea: string;

    /**
     * The short code for the state or area.
     */
    readonly administrativeAreaCode: string;

    /**
     * Common names of the area in which the place resides.
     */
    readonly areasOfInterest: string[];

    /**
     * Common names for the local area or neighborhood of the place.
     */
    readonly dependentLocalities: string[];

    /**
     * A combination of thoroughfare and subthoroughfare.
     */
    readonly fullThoroughfare: string;

    /**
     * The city of the place.
     */
    readonly locality: string;

    /**
     * The postal code of the place.
     */
    readonly postCode: string;

    /**
     * The name of the area within the locality.
     */
    readonly subLocality: string;

    /**
     * The number on the street at the place.
     */
    readonly subThoroughfare: string;

    /**
     * The street name at the place.
     */
    readonly thoroughfare: string;
}
