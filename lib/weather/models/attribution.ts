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
 * A list of image asset URLs for attribution.
 */
export interface Attribution {
    /**
     * The partial URL of the dark appearance of the Apple Weather logo with a scale factor of 1, or @1x.
     */
    readonly "logoDark@1x": string;

    /**
     * The partial URL of the dark appearance of the Apple Weather logo with a scale factor of 2, or @2x.
     */
    readonly "logoDark@2x": string;

    /**
     * The partial URL of the dark appearance of the Apple Weather logo with a scale factor of 3, or @3x.
     */
    readonly "logoDark@3x": string;

    /**
     * The partial URL of the light appearance of the Apple Weather logo with a scale factor of 1, or @1x.
     */
    readonly "logoLight@1x": string;

    /**
     * The partial URL of the light appearance of the Apple Weather logo with a scale factor of 2, or @2x.
     */
    readonly "logoLight@2x": string;

    /**
     * The partial URL of the light appearance of the Apple Weather logo with a scale factor of 3, or @3x.
     */
    readonly "logoLight@3x": string;

    /**
     * The partial URL of a square weather logo with a scale factor of 1, or @1x.
     */
    readonly "logoSquare@1x": string;

    /**
     * The partial URL of a square weather logo with a scale factor of 2, or @2x.
     */
    readonly "logoSquare@2x": string;

    /**
     * The partial URL of a square weather logo with a scale factor of 3, or @3x.
     */
    readonly "logoSquare@3x": string;

    /**
     * The name of the service.
     */
    readonly serviceName: string;
}
