import { disconnectClient, startClient } from "./withComponent";
import Client from "../../client/client"

describe("withComponent client", () => {

    let client;

    it("starts the client", async () => {
        client = await startClient();
        expect(client).toBeInstanceOf(Client);
        await disconnectClient();
    });
})