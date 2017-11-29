/* globals describe it expect jest withComponent */
import { configure, shallow } from "enzyme";
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

describe("FructoseApp", () => {
  it("returns a function that returns a function that returns the app", () => {
    const testComponent = { props: { fructoseID: "id" } };
    const appFunction = Fructose(() => withComponent(testComponent));
    const app = appFunction();
    const props = shallow(app).instance().props;
    expect(props).toMatchObject({
      components: { id: testComponent },
      events: { value: "mockEventEmitter" }
    });
  });
});
