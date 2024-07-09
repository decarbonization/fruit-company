import { describe, expect, it } from "@jest/globals";
import { MapsToken } from "../../lib";

describe("maps/maps-token module", () => {
    const appId = "com.fruit-company.maps";
    const teamId = "fruit-company team";
    const keyId = "8675309";
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgir767IOFOYHsYtNQ
wsvLeJVu3bxCLL/SURQvMZw6QumgCgYIKoZIzj0DAQehRANCAARuwGOLtHY99zLl
iyACJp6xmj6YfE8bOLxHTZGkoC/+yNgf/fBpwf5Nin2pzyM8FUOYXg1R1v2bQqJy
wHYtSkc1
-----END PRIVATE KEY-----`;
    describe("MapsToken", () => {
        describe("#authenticate", () => {
            it("should throw on invalid token", async () => {
                const token = new MapsToken(appId, teamId, keyId, privateKey);
                const fetchRequest = new Request("http://localhost:3000");
                expect(token.isValid).toStrictEqual(false);
                await expect(async () => token.authenticate({ fetchRequest })).rejects.toThrow();
            });
        });
    });
});
