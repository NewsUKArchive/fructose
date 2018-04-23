/* globals beforeAll jasmine afterAll */
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

beforeAll(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;
  await fructose.hooks.mobile.setup();
  await deviceReady();
}, 180000);

afterAll(async () => {
  await fructose.hooks.mobile.cleanup();
});
