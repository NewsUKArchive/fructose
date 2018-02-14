/* globals beforeAll jasmine afterAll */
import fructose from "@times-components/fructose/setup";
import io from "socket.io-client";

let socket;

const deviceReady = () => {
  const config = {
    transports: ["websocket"],
    query: {
      clientType: "client"
    }
  };

  socket = io("http://localhost:7811", config);

  return new Promise(resolve => {
    socket.on("fructose-app-ready", () => {
      resolve("ready");
    });
  });
};

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
  await fructose.hooks.mobile.setup();
  await deviceReady();
}, 180000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
