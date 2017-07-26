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
      name: "iPhone 7 Plus"
    }
  }
};
let fructosePackager;
let server;

export const setup = async (config = {}) => {
  fructosePackager = await startPackager().then(() => console.log("packager started"));
  server = new FructoseServer(7811);
  await server.start().then(() => console.log("fructose server started on 7811", server.server.address()));
  if (config.binaryPath) {
    detoxConfig.configurations["ios.sim.debug"].binaryPath = config.binaryPath;
  } else {
    throw new Error({
      msg: "No binaryPath was provided, you need to pass in a config object"
    });
  }
  await detox.init(detoxConfig).then(() => console.log("detox inited"));
};

export const teardown = async () => {
  await kill(fructosePackager);
  server.close();
  await detox.cleanup();
};
