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
 * The intensity category of a measurement such as precipitation intensity per hour.
 */
export type Intensity =
    | "light"
    | "moderate"
    | "heavy"
    | "violent";

/**
 * Determine the intensity of the given precipitation rate.
 * 
 * @param rateMMpH A precipitation intensity value in millimeters per hour.
 * @returns An intensity band for the given value.
 * @throws A `RangeError` if `rateMMpH <= 0.0`.
 */
export function precipitationIntensityFrom(rateMMpH: number): Intensity {
    if (rateMMpH < 0.0) {
        throw new RangeError(`<${rateMMpH}> is not a valid rain precipitation intensity value`);
    } else if (rateMMpH <= 2.5) {
        return "light";
    } else if (rateMMpH <= 7.5) {
        return "moderate";
    } else if (rateMMpH <= 50) {
        return "heavy";
    } else {
        return "violent";
    }
}
