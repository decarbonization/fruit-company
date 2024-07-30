import { describe, expect, it } from "@jest/globals";
import { Chance, probabilityChanceFrom } from "../../../lib/weather";

describe("weather#derivatives#chance module", () => {
    describe("#probabilityChanceFrom", () => {
        it("should reject invalid values", () => {
            expect(() => probabilityChanceFrom(-0.1)).toThrowError();
            expect(() => probabilityChanceFrom(1.1)).toThrowError();
        });

        it("should return none", () => {
            expect(probabilityChanceFrom(0.0)).toStrictEqual(Chance.none);
        });

        it("should return slight", () => {
            expect(probabilityChanceFrom(0.01)).toStrictEqual(Chance.slight);
            expect(probabilityChanceFrom(0.2)).toStrictEqual(Chance.slight);
        });

        it("should return possible", () => {
            expect(probabilityChanceFrom(0.21)).toStrictEqual(Chance.possible);
            expect(probabilityChanceFrom(0.8)).toStrictEqual(Chance.possible);
        });

        it("should return likely", () => {
            expect(probabilityChanceFrom(0.81)).toStrictEqual(Chance.likely);
            expect(probabilityChanceFrom(0.99)).toStrictEqual(Chance.likely);
        });

        it("should return certain", () => {
            expect(probabilityChanceFrom(1.0)).toStrictEqual(Chance.certain);
        });
    });
});