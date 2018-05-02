/* globals jasmine */
import fructose from "../../setup";
import io from "socket.io-client";

export const setup = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
  const { client } = await fructose.hooks.mobile.setup();
  return client;
};

export const teardown = async () => {
  await fructose.hooks.mobile.cleanup();
};
