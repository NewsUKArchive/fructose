import io from "socket.io-client";
import showcases from "./component.showcase";
import fructose from "./../../setup";

describe("Web example tests", () => {
  let fructoseClient;
  let chrome;

  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

    const { client, chromeless } = await fructose.hooks.web.setup(3000, 60000);
    fructoseClient = client;

    //for examples benefit
    chrome = chromeless;
  }, 60000);

  it("loads all expected components ", async () => {
    expect.assertions(showcases.children.length);

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
