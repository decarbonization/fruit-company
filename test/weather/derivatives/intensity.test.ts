import { describe, expect, it } from "@jest/globals";
import { Intensity, precipitationIntensityFrom } from "../../../lib/weather";

describe("weather#derivatives#intensity module", () => {
    describe("#precipitationIntensityFrom", () => {
        it("should reject invalid values", () => {
            expect(() => precipitationIntensityFrom(-1.0)).toThrow();
        });

        it("should detect light values", () => {
            expect(precipitationIntensityFrom(0.0)).toStrictEqual(Intensity.light);
            expect(precipitationIntensityFrom(2.5)).toStrictEqual(Intensity.light);
        });

        it("should detect moderate values", () => {
            expect(precipitationIntensityFrom(2.6)).toStrictEqual(Intensity.moderate);
            expect(precipitationIntensityFrom(7.5)).toStrictEqual(Intensity.moderate);
        });

        it("should detect moderate values", () => {
            expect(precipitationIntensityFrom(7.6)).toStrictEqual(Intensity.heavy);
            expect(precipitationIntensityFrom(50.0)).toStrictEqual(Intensity.heavy);
        });

        it("should detect violent values", () => {
            expect(precipitationIntensityFrom(51.0)).toStrictEqual(Intensity.violent);
            expect(precipitationIntensityFrom(Number.MAX_VALUE)).toStrictEqual(Intensity.violent);
        });
    });
});
