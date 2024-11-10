import { describe, expect, it } from "@jest/globals";
import { uvIndexRiskFrom } from "../../../lib/weather";

describe("weather#derivatives#risk module", () => {
    describe("#uvIndexRiskFrom", () => {
        it("should reject invalid values", () => {
            expect(() => uvIndexRiskFrom(-1)).toThrow();
        });

        it("should return low values", () => {
            expect(uvIndexRiskFrom(0)).toStrictEqual("low");
            expect(uvIndexRiskFrom(2)).toStrictEqual("low");
        });

        it("should return moderate values", () => {
            expect(uvIndexRiskFrom(3)).toStrictEqual("moderate");
            expect(uvIndexRiskFrom(5)).toStrictEqual("moderate");
        });

        it("should return high values", () => {
            expect(uvIndexRiskFrom(6)).toStrictEqual("high");
            expect(uvIndexRiskFrom(7)).toStrictEqual("high");
        });

        it("should return very high values", () => {
            expect(uvIndexRiskFrom(8)).toStrictEqual("veryHigh");
            expect(uvIndexRiskFrom(10)).toStrictEqual("veryHigh");
        });

        it("should return extreme values", () => {
            expect(uvIndexRiskFrom(11)).toStrictEqual("extreme");
            expect(uvIndexRiskFrom(Number.MAX_SAFE_INTEGER)).toStrictEqual("extreme");
        });
    });
});
