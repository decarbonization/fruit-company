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
 * The subjective comfort of a measurement.
 */
export type Comfort =
    | "tooLow"
    | "fair"
    | "good"
    | "tooHigh";

/**
 * Determine the subjective comfort of a given relative humidity measurement.
 * 
 * @param humidity A relative humidity percentage.
 * @returns The subjective comfort of the given `humidity`.
 */
export function humidityComfortFrom(humidity: number): Comfort {
    if (humidity >= 0.0 && humidity <= 0.2) {
        return "tooLow";
    } else if (humidity > 0.2 && humidity <= 0.3) {
        return "fair";
    } else if (humidity > 0.3 && humidity <= 0.6) {
        return "good";
    } else if (humidity > 0.6 && humidity <= 0.7) {
        return "fair";
    } else if (humidity > 0.7 && humidity <= 1.0) {
        return "tooHigh";
    } else {
        throw new RangeError(`<${humidity}> is not a valid humidity`);
    }
}
