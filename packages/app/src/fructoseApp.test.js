/* globals expect jest it describe */
import FructoseApp from "./fructoseApp";

jest.mock("./components/fructoseComponent");
jest.mock("./componentLoader");

it("returns a function", () => {
  const f = FructoseApp();
  expect(typeof f).toBe("function");
});

describe("the function returned from FructoseApp()", () => {
  it("returns a React component built with FructoseComponent", () => {
    const f = FructoseApp({ event: true });
    const ui = f({ something: "something" });
    expect(ui().props).toEqual({
      components: "componentsLoaded",
      events: {
        event: true
      }
    });
  });
});
