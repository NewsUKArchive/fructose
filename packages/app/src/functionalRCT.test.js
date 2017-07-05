import FunctionalRCT from "./functionalRCT";
import { shallow } from "enzyme";

import { EventEmitter } from "events";
import io from "socket.io-client";

describe("FunctionalRCT", () => {
  var fcrt;

  beforeEach(() => {
    const events =  new EventEmitter();
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

  describe("#addComponent", () => {
    it("adds a component to this.components", () => {
      fcrt.addComponent("name", "component");
      expect(fcrt.components["name"]).toBe("component");
    });
  });

  describe("#loadComponent", () => {
    it("emits an event with component string", () => {
      const test = new Promise((resolve, reject) => {
        fcrt.events.on("load", (name) => {
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
