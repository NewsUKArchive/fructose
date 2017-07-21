/* eslint import/first: 0 */
import "./fakeCliArgs"; // the order is important - this file must run before we import detox

import "babel-polyfill";
import detox from "detox";
import { FructoseServer } from "../../server";
import { startPackager, kill } from "./startPackager";

// The paths in this need to be relative to <rootDir>/packages/component
const detoxConfig = {
  configurations: {
    "ios.sim.debug": {
      binaryPath: "",
      type: "ios.simulator",
      name: "iPhone 7"
    }
  }
};
let fructosePackager;
let server;

export const setup = async (config = {}) => {
  fructosePackager = await startPackager();
  server = new FructoseServer(7811);
  await server.start();
  if (config.binaryPath) {
    detoxConfig.configurations["ios.sim.debug"].binaryPath = config.binaryPath;
  } else {
    throw new Error({
      msg: "No binaryPath was provided, you need to pass in a config object"
    });
  }
  await detox.init(detoxConfig);
};

export const teardown = async () => {
  await kill(fructosePackager);
  server.close();
  await detox.cleanup();
};
