import { describe, expect, it } from "@jest/globals";
import { MusicDeveloperToken } from "../../lib/music";

describe("music/token module", () => {
    const appId = "com.fruit-company.music";
    const teamId = "fruit-company team";
    const keyId = "8675309";
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgir767IOFOYHsYtNQ
wsvLeJVu3bxCLL/SURQvMZw6QumgCgYIKoZIzj0DAQehRANCAARuwGOLtHY99zLl
iyACJp6xmj6YfE8bOLxHTZGkoC/+yNgf/fBpwf5Nin2pzyM8FUOYXg1R1v2bQqJy
wHYtSkc1
-----END PRIVATE KEY-----`;
    describe("MusicDeveloperToken", () => {
        describe("#isValid", () => {
            it("should be invalid before calling refresh", async () => {
                const token = new MusicDeveloperToken(appId, teamId, keyId, privateKey);
                expect(token.isValid).toStrictEqual(false);
                await token.refresh({ fetch: globalThis.fetch });
                expect(token.isValid).toStrictEqual(true);
            });

            it("should be invalid with expired token", async () => {
                const token = new MusicDeveloperToken(appId, teamId, keyId, privateKey);

                await token.refresh({ fetch: globalThis.fetch });
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

        describe("#authenticate", () => {
            it("should throw on invalid token", async () => {
                const token = new MusicDeveloperToken(appId, teamId, keyId, privateKey);
                const fetchRequest = new Request("http://localhost:3000");
                expect(token.isValid).toStrictEqual(false);
                await expect(async () => await token.authenticate({ fetchRequest })).rejects.toThrow();
            });
        });
    });
});
