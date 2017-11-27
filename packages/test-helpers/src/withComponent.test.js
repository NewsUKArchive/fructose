import { disconnectClient, startClient } from "./withComponent";
import Client from "../../client/client"

describe("withComponent client", () => {

    let client;

    afterEach( () => {
        client.disconnect();
    });

    it("starts the client", async () => {
        client = await startClient();
        expect(client).toBeInstanceOf(Client) 
    });

    it("rejects when client is not started", () => {
        expect(getClient()).rejects.toBe("client has not been started")
    });
})