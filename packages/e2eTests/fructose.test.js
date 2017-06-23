import "babel-polyfill";
import detox from "detox";
const FructoseClient = require("fructose-client");
import { FructoseServer } from "fructose-server";

const detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/e2eTests.app",
      build:
        "xcodebuild -project ios/e2eTests.xcodeproj -scheme e2eTests -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
};

describe("fructose", () => {
  const client = FructoseClient(7811);
  const server = new FructoseServer(7811);
  beforeAll(async () => {
    await detox.init(detoxConfig);
    await server.start();
  }, 60000);

  afterAll(async () => {
    client.disconnect();
    server.close();
    await detox.cleanup();
  });

  beforeEach(async () => {
    /* add this in to reload the rn environment for each test - makes tests slower by ~500ms
      BUT it could make the environment more stable. I've found no reason to use it YET.
    await device.reloadReactNative();
    */
  });

  it("can load a component", async () => {
    await client.loadComponent("Component1", {});
    await expect(element(by.text("COMPONENT 1"))).toBeVisible();
  });

  it("can load a component1", async () => {
    await client.loadComponent("Component2", {});
    await expect(element(by.text("COMPONENT 2"))).toBeVisible();
  });

  it("can load a component2", async () => {
    await client.loadComponent("Component1", {});
    await expect(element(by.text("COMPONENT 1"))).toBeVisible();
  });

  it("can load a component3", async () => {
    await client.loadComponent("Component2", {});
    await expect(element(by.text("COMPONENT 2"))).toBeVisible();
  });
});
