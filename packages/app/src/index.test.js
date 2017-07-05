import Fructose, { tearDown } from "./index";

describe("index", () => {
  it("exports 'Fructose' Function", () => {
    expect(Fructose).toBeInstanceOf(Function);
  });

  it("exports a teardown Function", () => {
    expect(tearDown).toBeInstanceOf(Function);
  });
});
