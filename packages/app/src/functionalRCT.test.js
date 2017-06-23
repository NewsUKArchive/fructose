import FunctionalRCT from "./functionalRCT";
import { shallow } from "enzyme";

describe("FunctionalRCT", () => {
  var fcrt;

  beforeEach(() => {
    fcrt = new FunctionalRCT();
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
      fcrt.addComponent((name = "name"), (component = "component"));
      expect(fcrt.components["name"]).toBe("component");
    });
  });

  describe("#loadComponent", () => {
    it("emits an event with componentDetails", () => {
      const test = new Promise((resolve, reject) => {
        fcrt.events.on("load", (name, component) => {
          try {
            expect(name).toBe("name");
            expect(component).toBe("props");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
      fcrt.loadComponent("name", "props");
      return test;
    });
  });

  describe("#getFunctionalRCTUI", () => {
    it("returns a FunctionalRCTUI component with the correct props", () => {
      fcrt.addComponent((name = "1"), (component = "A"));
      fcrt.addComponent((name = "2"), (component = "B"));
      const ui = fcrt.getFunctionalRCTUI();
      const expected = {
        "1": "A",
        "2": "B"
      };
      expect(ui.props.components).toMatchObject(expected);
      expect(ui.props.events).toBe(fcrt.events);
    });
  });
});
