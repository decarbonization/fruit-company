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
 * The risk category of a measurement such as UV index.
 */
export const enum Risk {
    /**
     * Low danger for the measured value for the average person.
     */
    low = "low",

    /**
     * Moderate danger for the measured value for the average person.
     */
    moderate = "moderate",

    /**
     * High danger for the measured value for the average person.
     */
    high = "high",

    /**
     * Very high danger for the measured value for the average person.
     */
    veryHigh = "veryHigh",


    /**
     * Extreme danger for the measured value for the average person.
     */
    extreme = "extreme",
}

/**
 * Determine the risk a given UV Index poses to the average person.
 * 
 * @param uvIndex The UV Index.
 * @returns The risk.
 */
export function uvIndexRiskFrom(uvIndex: number): Risk {
    if (uvIndex >= 0 && uvIndex <= 2) {
        return Risk.low;
    } else if (uvIndex >= 3 && uvIndex <= 5) {
        return Risk.moderate;
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        return Risk.high;
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        return Risk.veryHigh;
    } else if (uvIndex >= 11) {
        return Risk.extreme;
    } else {
        throw new RangeError(`<${uvIndex}> is not a valid UV Index value`);
    }
}