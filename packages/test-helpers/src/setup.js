import "babel-polyfill";
import { FructoseServer } from "../../server";
import log from "../../common/logger";
import checkIfWebStarted from "./didWebStart";
import Snapper from "../../snapshots/snapper";
import { disconnectClient } from "./withComponent";
import fructoseClient from "../../client";

const mobileHooks = () => {
  let server;

  const setup = async () => {
    server = new FructoseServer(7811);

    global.fructoseClient = fructoseClient(7811);

    await server
      .start()
      .then(() =>
        log.verbose("setup", `fructose server started on port : 7811`)
      );
  };

  const cleanup = async () => {
    await disconnectClient();
    server.close();
  };

  const takeScreenShot = async (platform, screenshotPath) => {
    const snapper = new Snapper(platform);
    await snapper.snap(screenshotPath);
  };

  return { setup, cleanup, takeScreenShot };
};

const webHooks = () => {
  let server;

  const setup = async (port, timeout) => {
    const appStarted = await checkIfWebStarted(port, timeout);
    if (!appStarted) {
      throw new Error(
        "App did not start. Run 'fructose-web --build-dir path/to/dir' first"
      );
    }
    server = new FructoseServer(7811);
    await server.start();
  };

  const cleanup = async () => {
    await disconnectClient();
    server.close();
  };

  return { setup, cleanup };
};
export default {
  web: webHooks(),
  mobile: mobileHooks()
};
