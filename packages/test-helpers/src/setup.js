import 'babel-polyfill';
import './fakeCliArgs' // the order is important - this file must run before we import detox
import detox from "detox";
import { FructoseServer } from "hjkadshhjkl-server";
import { spawnSync } from "child_process";
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
var fructosePackager;
var server;

export const setup = async (config={}) => {
  fructosePackager = await startPackager();
  server = new FructoseServer(7811);
  await server.start();
  if(config.binaryPath){
    detoxConfig.configurations["ios.sim.debug"].binaryPath = config.binaryPath;
  } else {
    throw("No binaryPath was provided, you need to pass in a config object");
  }
  await detox.init(detoxConfig);
};

export const teardown = async () => {
  await kill(fructosePackager);
  server.close();
  await detox.cleanup();
};
