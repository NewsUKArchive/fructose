import "babel-polyfill";
import { FructoseServer } from "../../server";
import Packager from "./startPackager";

const log = require("npmlog");

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

    await packager.start().then(() => log.verbose("packager started"));

    await server
      .start()
      .then(() =>
        log.verbose("fructose server started on 7811", server.server.address())
      );
  };

  const cleanup = async () => {
    await packager.kill();
    server.close();
  };
  return { setup, cleanup };
};

const webHooks = () => {
  let server;

  const setup = async () => {
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
