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

import { describe, expect, it } from "@jest/globals";
import { LocationCoordinates, truncateLocationCoordinates, urlLocationCoordinates } from "../../../lib/core/models/common";

describe("core#models#common module", () => {
    describe("#truncateLocationCoordinates", () => {
        it("should reduce the accuracy of geographic coordinates", () => {
            const subject: LocationCoordinates = {
                latitude: 35.689506,
                longitude: 139.6917,
            };
            expect(truncateLocationCoordinates(subject, 1)).toEqual({
                latitude: 35.6,
                longitude: 139.6,
            });
            expect(truncateLocationCoordinates(subject, 2)).toEqual({
                latitude: 35.68,
                longitude: 139.69,
            });
            expect(truncateLocationCoordinates(subject, 4)).toEqual({
                latitude: 35.6895,
                longitude: 139.6917,
            });
        });
    });

    describe("#urlLocationCoordinates", () => {
        it("should format coordinates like required by fruit company APIs", () => {
            const subject: LocationCoordinates = {
                latitude: 35.689506,
                longitude: 139.6917,
            };
            expect(urlLocationCoordinates(subject)).toStrictEqual("35.689506,139.6917");
        });
    });
});
