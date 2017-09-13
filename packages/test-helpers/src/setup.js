import "babel-polyfill";
import { FructoseServer } from "../../server";
import Packager from "./startPackager";
import log from "../../../logger";

export default () => {
  const packager = new Packager();
  const server = new FructoseServer(7811);

  const setup = async () => {
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

  return {
    setup,
    cleanup
  };
};
