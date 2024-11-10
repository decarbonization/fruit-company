import { describe, expect, it } from "@jest/globals";
import { precipitationIntensityFrom } from "../../../lib/weather";

describe("weather#derivatives#intensity module", () => {
    describe("#precipitationIntensityFrom", () => {
        it("should reject invalid values", () => {
            expect(() => precipitationIntensityFrom(-1.0)).toThrow();
        });

        it("should detect light values", () => {
            expect(precipitationIntensityFrom(0.0)).toStrictEqual("light");
            expect(precipitationIntensityFrom(2.5)).toStrictEqual("light");
        });

        it("should detect moderate values", () => {
            expect(precipitationIntensityFrom(2.6)).toStrictEqual("moderate");
            expect(precipitationIntensityFrom(7.5)).toStrictEqual("moderate");
        });

        it("should detect moderate values", () => {
            expect(precipitationIntensityFrom(7.6)).toStrictEqual("heavy");
            expect(precipitationIntensityFrom(50.0)).toStrictEqual("heavy");
        });

        it("should detect violent values", () => {
            expect(precipitationIntensityFrom(51.0)).toStrictEqual("violent");
            expect(precipitationIntensityFrom(Number.MAX_VALUE)).toStrictEqual("violent");
        });
    });
});
