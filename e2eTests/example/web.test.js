import { fructoseClient } from '@times-components/fructose';
import io from "socket.io-client";

describe("Web example tests", () => {

    let client;
    let chromeless;

    const setup = () => {
      chromeless = new Chromeless();
    };

    const deviceReady = () => {
      const config = {
        transports: ["websocket"],
        query: {
          clientType: "client"
        }
      };

      const socket = io("http://localhost:7811", config);

      return new Promise(resolve => {
        socket.on("fructose-app-ready", () => {
          resolve("ready");
        });
      });
    };


    beforeAll(() => {
        client = fructoseClient(7811);
    });

    beforeEach(setup)

    it("works", async () => {
        await deviceReady
        await client.loadComponent('Web-ExampleTests/Article Label')
    })
})
}
