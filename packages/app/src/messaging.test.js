/* globals beforeEach describe it expect */

import { EventEmitter } from "events";
import appTestBridge from "./messaging";

let events;
let socket;

beforeEach(() => {
  events = new EventEmitter();
  socket = new EventEmitter();
  appTestBridge(events, socket);
});

describe("load-on-device event", () => {
  it(
    "emits a 'load' event on events when triggered",
    () =>
      new Promise(resolve => {
        events.on("load", name => {
          expect(name).toBe("component-name");
          resolve();
        });
        socket.emit("load-on-device", "component-name");
      }),
    50
  );
});

describe("loaded event", () => {
  it(
    "emits a 'loadedOnDevice' event on socket when triggered",
    () =>
      new Promise(resolve => {
        socket.on("loadedOnDevice", () => {
          resolve();
        });
        events.emit("loaded");
      }),
    50
  );
});

describe("get-app-components", () => {
  it(
    "emits a 'publish-component-store' event when triggered",
    () =>
      new Promise(resolve => {
        events.on("publish-component-store", () => resolve());
        socket.emit("get-app-components");
      }),
    50
  );
});

describe("loaded-app-components event", () => {
  it(
    "emits a 'loadedOnDevice' event on socket when triggered",
    () =>
      new Promise(resolve => {
        socket.on("loaded-app-components", () => resolve());
        events.emit("loaded-app-components");
      }),
    50
  );
});
