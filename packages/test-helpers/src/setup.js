import 'babel-polyfill';
import './fakeCliArgs' // the order is important - this file must run before we import detox
import detox from "detox";
import { FructoseServer } from "fructose-server";
import Client from "fructose-client";
import { spawnSync } from "child_process";
import { startPackager, kill } from "./startPackager";

// The paths in this need to be relative to <rootDir>/packages/component
const detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/e2eTests.app",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
};
var fructosePackager;
var server;

export const setup = async () => {
  fructosePackager = await startPackager();
  server = new FructoseServer(7811);
  await server.start();
  await detox.init(detoxConfig);
};

export const teardown = async () => {
  await kill(fructosePackager);
  server.close();
  await detox.cleanup();
};
