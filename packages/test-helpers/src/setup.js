import "babel-polyfill";
import { FructoseServer } from "../../server";
import Packager from "./startPackager";

const log = require("npmlog");

export default () => {
  const packager = new Packager();
  const server = new FructoseServer(7811);

  const setup = async () => {
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
    console.log("cleaned up fructose");
  };

  return {
    setup,
    cleanup
  };
};
