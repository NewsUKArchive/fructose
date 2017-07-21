/* globals describe it expect jest withComponent */
import { shallow } from "enzyme";
import Fructose, { tearDown } from "./index";

jest.mock("events", () => {
  function EventEmitter() {
    this.value = "mockEventEmitter";
    this.on = () => {};
    this.emit = () => {};
  }
  return {
    EventEmitter
  };
});

const mockSocketDisconnect = jest.fn();

jest.mock("socket.io-client", () => () => ({
  disconnect: () => mockSocketDisconnect(),
  on: () => {},
  emit: () => {}
}));

it("exports 'Fructose' Function", () => {
  expect(Fructose).toBeInstanceOf(Function);
});

describe("FructoseApp", () => {
  it("returns a function that returns a function that returns the app", () => {
    const appFunction = Fructose(() => withComponent({ a: 1 }));
    const app = appFunction();
    const props = shallow(app).instance().props;
    expect(props).toMatchObject({
      components: { '{"a":1}': { a: 1 } },
      events: { value: "mockEventEmitter" }
    });
  });
});

