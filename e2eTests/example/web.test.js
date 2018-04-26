import io from "socket.io-client";
import showcases from "./component.showcase";
import fructose from "./../../setup";
import { Chromeless } from "chromeless";

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

describe("Web example tests", () => {
  let fructoseClient;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    fructoseClient = await fructose.hooks.web.setup(3000, 60000);
  }, 60000);

  it("loads all expected components ", async () => {
    expect.assertions(showcases.children.length);

    new Chromeless()
      .goto("http://localhost:3000")
      .exists("[data-testid='fructose']");

    await deviceReady();

    for (let i = 0; i < showcases.children.length; i++) {
      const result = await fructoseClient.loadComponent(
        `${showcases.name}/${showcases.children[i].name}`
      );

      expect(result).toBe("component loaded");
    }
  });

  afterAll(async () => {
    await fructose.hooks.web.cleanup();
  });
});
