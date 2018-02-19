/* globals beforeEach afterEach describe it expect */

import { EventEmitter } from "events";
import io from "socket.io-client";

import Messaging from "./messaging";

describe("Messaging", () => {
  let messaging;

  beforeEach(() => {
    messaging = Messaging();
  });

  it("returns an object with events and socket", () => {
    expect(messaging.events).toBeInstanceOf(EventEmitter);
    expect(messaging.socket).toBeInstanceOf(io.Socket);
  });

  afterEach(() => {
    messaging.socket.destroy();
  });
});
