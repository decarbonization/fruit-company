import { describe, expect, it } from "@jest/globals";
import { Comfort, humidityComfortFrom } from "../../../lib/weather";

describe("weather#derivatives#comfort module", () => {
    describe("#humidityComfortFrom", () => {
        it("should reject invalid values", () => {
            expect(() => humidityComfortFrom(-0.1)).toThrowError();
            expect(() => humidityComfortFrom(1.1)).toThrowError();
        });

        it("should return tooLow", () => {
            expect(humidityComfortFrom(0.0)).toStrictEqual(Comfort.tooLow);
            expect(humidityComfortFrom(0.2)).toStrictEqual(Comfort.tooLow);
        });

        it("should return fair", () => {
            // Fairly low
            expect(humidityComfortFrom(0.21)).toStrictEqual(Comfort.fair);
            expect(humidityComfortFrom(0.3)).toStrictEqual(Comfort.fair);
            
            // Fairly high
            expect(humidityComfortFrom(0.61)).toStrictEqual(Comfort.fair);
            expect(humidityComfortFrom(0.7)).toStrictEqual(Comfort.fair);
        });

        it("should return good", () => {
            expect(humidityComfortFrom(0.31)).toStrictEqual(Comfort.good);
            expect(humidityComfortFrom(0.6)).toStrictEqual(Comfort.good);
        });

        it("should return tooHigh", () => {
            expect(humidityComfortFrom(0.71)).toStrictEqual(Comfort.tooHigh);
            expect(humidityComfortFrom(1.0)).toStrictEqual(Comfort.tooHigh);
        });
    });
});