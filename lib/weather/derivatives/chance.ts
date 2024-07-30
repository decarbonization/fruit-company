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
 * The chance of a probability measurement leading to an event, such as rain.
 */
export const enum Chance {
    /**
     * Indicates that there is no chance of an event occurring.
     */
    none = "none",

    /**
     * Indicates that it is unlikely that an event will occurr.
     */
    slight = "slight",

    /**
     * Indicates that it is possible for an event to occur.
     */
    possible = "possible",

    /**
     * Indicates that it is highly likely an event will occur.
     */
    likely = "likely",

    /**
     * Indicates that it is certain an event will occur.
     */
    certain = "certain",
}

/**
 * Determine the chance of a given probability value.
 * 
 * @param p A probability value in the range [0, 1].
 * @returns A chance category for the given probability.
 */
export function probabilityChanceFrom(p: number): Chance {
    if (p === 0.0) {
        return Chance.none;
    } else if (p > 0.0 && p <= 0.2) {
        return Chance.slight;
    } else if (p > 0.2 && p <= 0.8) {
        return Chance.possible;
    } else if (p > 0.8 && p < 1.0) {
        return Chance.likely;
    } else if (p === 1.0) {
        return Chance.certain;
    } else {
        throw new RangeError(`<${p}> is not a valid probability`);
    }
}
