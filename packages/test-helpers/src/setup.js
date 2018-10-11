import "babel-polyfill";
import { Chromeless } from "chromeless";
import { FructoseServer } from "../../server";
import log from "../../common/logger";
import checkIfWebStarted from "./didWebStart";
import fructoseClient from "../../client";

const fructosePort = 7811;
let server;
let client;
let chromeless;

const mobileHooks = () => {
  const setup = async () => {
    server = new FructoseServer(fructosePort);

    await server
      .start()
      .then(() =>
        log.verbose(
          "setup",
          `fructose server started on port : ${fructosePort}`
        )
      );

    client = fructoseClient(fructosePort);
    await client.waitForApp();
    return client;
  };

  const cleanup = () => {
    client.disconnect();
    server.close();
  };

  return { setup, cleanup };
};

const webHooks = () => {
  const setup = async (port, timeout) => {
    const appStarted = await checkIfWebStarted(port, timeout);
    if (!appStarted) {
      throw new Error(
        "App did not start. Run 'fructose-web --build-dir path/to/dir' first"
      );
    }
    server = new FructoseServer(fructosePort);

    await server.start();

    client = fructoseClient(fructosePort);

    chromeless = new Chromeless()
      .goto("http://localhost:3000")
      .exists("[data-testid='fructose']");

    await client.waitForApp();
    return { client, chromeless };
  };

  const cleanup = async () => {
    await chromeless.end();
    client.disconnect();
    server.close();
  };

  return { setup, cleanup };
};
export default {
  web: webHooks(),
  mobile: mobileHooks()
};
