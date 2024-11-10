import { describe, expect, it } from "@jest/globals";
import { probabilityChanceFrom } from "../../../lib/weather";

describe("weather#derivatives#chance module", () => {
    describe("#probabilityChanceFrom", () => {
        it("should reject invalid values", () => {
            expect(() => probabilityChanceFrom(-0.1)).toThrowError();
            expect(() => probabilityChanceFrom(1.1)).toThrowError();
        });

        it("should return none", () => {
            expect(probabilityChanceFrom(0.0)).toStrictEqual("none");
        });

        it("should return slight", () => {
            expect(probabilityChanceFrom(0.01)).toStrictEqual("slight");
            expect(probabilityChanceFrom(0.2)).toStrictEqual("slight");
        });

        it("should return possible", () => {
            expect(probabilityChanceFrom(0.21)).toStrictEqual("possible");
            expect(probabilityChanceFrom(0.8)).toStrictEqual("possible");
        });

        it("should return likely", () => {
            expect(probabilityChanceFrom(0.81)).toStrictEqual("likely");
            expect(probabilityChanceFrom(0.99)).toStrictEqual("likely");
        });

        it("should return certain", () => {
            expect(probabilityChanceFrom(1.0)).toStrictEqual("certain");
        });
    });
});