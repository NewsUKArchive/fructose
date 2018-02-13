/* globals it expect jest */
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Fructose from "./index";

configure({ adapter: new Adapter() });

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
