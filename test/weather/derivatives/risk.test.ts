import { describe, expect, it } from "@jest/globals";
import { Risk, uvIndexRiskFrom } from "../../../lib/weather";

describe("weather#derivatives#risk module", () => {
    describe("#uvIndexRiskFrom", () => {
        it("should reject invalid values", () => {
            expect(() => uvIndexRiskFrom(-1)).toThrow();
        });

        it("should return low values", () => {
            expect(uvIndexRiskFrom(0)).toStrictEqual(Risk.low);
            expect(uvIndexRiskFrom(2)).toStrictEqual(Risk.low);
        });

        it("should return moderate values", () => {
            expect(uvIndexRiskFrom(3)).toStrictEqual(Risk.moderate);
            expect(uvIndexRiskFrom(5)).toStrictEqual(Risk.moderate);
        });

        it("should return high values", () => {
            expect(uvIndexRiskFrom(6)).toStrictEqual(Risk.high);
            expect(uvIndexRiskFrom(7)).toStrictEqual(Risk.high);
        });

        it("should return very high values", () => {
            expect(uvIndexRiskFrom(8)).toStrictEqual(Risk.veryHigh);
            expect(uvIndexRiskFrom(10)).toStrictEqual(Risk.veryHigh);
        });

        it("should return extreme values", () => {
            expect(uvIndexRiskFrom(11)).toStrictEqual(Risk.extreme);
            expect(uvIndexRiskFrom(Number.MAX_SAFE_INTEGER)).toStrictEqual(Risk.extreme);
        });
    });
});
