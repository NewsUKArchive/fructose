/* globals describe it beforeEach afterEach expect*/

import { EventEmitter } from "events";
import io from "socket.io-client";
import FunctionalRCT from "./functionalRCT";

describe("FunctionalRCT", () => {
  let fcrt;
  let events;

  beforeEach(() => {
    events = new EventEmitter();
    const socket = io("http://localhost:7811");
    fcrt = new FunctionalRCT(events, socket);
  });

  afterEach(() => {
    if (fcrt.socket) {
      fcrt.socket.disconnect();
    }
  });
  it("is initialised with an empty components object", () => {
    const lengthOfComponents = Object.keys(fcrt.components).length;
    expect(lengthOfComponents).toBe(0);
  });

  describe("#loadComponent", () => {
    it("emits an event with component string", () => {
      const test = new Promise((resolve, reject) => {
        events.on("load", name => {
          try {
            expect(name).toBe("name");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
      fcrt.loadComponent("name");
      return test;
    });
  });
});
