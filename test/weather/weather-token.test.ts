import { describe, expect, it } from "@jest/globals";
import { WeatherToken } from "../../lib";

describe("weather/weather-token module", () => {
    const appId = "com.fruit-company.weather";
    const teamId = "fruit-company team";
    const keyId = "8675309";
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgir767IOFOYHsYtNQ
wsvLeJVu3bxCLL/SURQvMZw6QumgCgYIKoZIzj0DAQehRANCAARuwGOLtHY99zLl
iyACJp6xmj6YfE8bOLxHTZGkoC/+yNgf/fBpwf5Nin2pzyM8FUOYXg1R1v2bQqJy
wHYtSkc1
-----END PRIVATE KEY-----`;
    describe("WeatherToken", () => {
        describe("#isValid", () => {
            it("should be invalid before calling refresh", async () => {
                const token = new WeatherToken(appId, teamId, keyId, privateKey);
                expect(token.isValid).toStrictEqual(false);
                await token.refresh(globalThis.fetch);
                expect(token.isValid).toStrictEqual(true);
            });

            it("should be invalid with expired token", async () => {
                const token = new WeatherToken(appId, teamId, keyId, privateKey);

                await token.refresh(globalThis.fetch);
                expect(token.isValid).toStrictEqual(true);

                // Inject an expired bearer token
                Object.assign(token, {
                    bearerToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijg2NzUzMDkiLCJpZCI6ImZydWl0LWNvbXBhbnkgdGVhbS5jb20uZnJ1aXQtY29tcGFueS53ZWF0aGVyIn0" +
                        ".eyJzdWIiOiJjb20uZnJ1aXQtY29tcGFueS53ZWF0aGVyIiwiaWF0IjoxNzE5NTE0NjI5LCJleHAiOjE3MTk1MTQ2MzAsImlzcyI6ImZydWl0LWNvbXBhbnkgdGVhbSJ9" +
                        ".-b7V0FHuvRrlPVX50NYCEberekU6K-ScNHwlqa1Oaf9ENUbJfScWdfIXmKhFbYSVGUmmpFPuHkNLuYU6EWOBWg",
                });
                expect(token.isValid).toStrictEqual(false);
            });
        });

        describe("#_headers", () => {
            it("should throw on invalid token", () => {
                const token = new WeatherToken(appId, teamId, keyId, privateKey);
                expect(token.isValid).toStrictEqual(false);
                expect(() => token._headers).toThrow();
            });
        });
    });
});
