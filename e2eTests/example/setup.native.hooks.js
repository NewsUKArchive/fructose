/* globals jasmine */
import fructose from "../../setup";
import io from "socket.io-client";

export const setup = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
  const fructoseClient = await fructose.hooks.mobile.setup();
  return fructoseClient;
};

export const teardown = async () => {
  await fructose.hooks.mobile.cleanup();
};
