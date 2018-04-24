import io from "socket.io-client";
import showcases from "./component.showcase";

describe("Web example tests", () => {
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

  it("loads all expected components ", async () => {
    expect.assertions(showcases.children.length);

    new Chromeless()
      .goto("http://localhost:3000")
      .exists("[data-testid='fructose']");

    await deviceReady();

    for (let i = 0; i < showcases.children.length; i++) {
      const result = await global.fructoseClient.loadComponent(
        `${showcases.name}/${showcases.children[i].name}`
      );

      expect(result).toBe("component loaded");
    }
  });
});
