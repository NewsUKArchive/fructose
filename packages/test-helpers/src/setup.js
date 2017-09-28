import "babel-polyfill";
import { FructoseServer } from "../../server";
import Packager from "./startPackager";
import log from "../../common/logger";
import checkIfWebStarted from "./didWebStart";

const mobileHooks = () => {
  let packager;
  let server;

  const setup = async () => {
    packager = new Packager();
    server = new FructoseServer(7811);

    packager.events.on("terminateTests", () => {
      log.error("ERROR: TERMINATING TESTS");
      process.exit(1);
    });

    await packager.start().then(() => log.verbose("setup", "packager started"));

    await server
      .start()
      .then(() =>
        log.verbose("setup", `fructose server started on port : 7811`)
      );
  };

  const cleanup = async () => {
    await packager.kill().then(() => log.verbose("setup", "Packager Killed"));
    server.close();
  };
  return { setup, cleanup };
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
    server.close();
  };

  return { setup, cleanup };
};
export default {
  web: webHooks(),
  mobile: mobileHooks()
};
