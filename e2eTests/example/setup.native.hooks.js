/* globals jasmine */
import fructose from "../../setup";
import io from "socket.io-client";

const deviceReady = () => {
  const config = {
    transports: ["websocket"],
    query: {
      clientType: "client"
    }
  };

  const socket = io("http://localhost:7811", config);

  return new Promise(resolve => {
    socket.on("fructose-app-ready", () => {
      resolve("ready");
    });
  });
};

export const setup = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
  const fructoseClient = await fructose.hooks.mobile.setup();
  await deviceReady();
  return fructoseClient;
};

export const teardown = async () => {
  await fructose.hooks.mobile.cleanup();
};
