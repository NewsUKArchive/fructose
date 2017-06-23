import { tearDown, getUI, addComponent } from "./index";

describe("index", () => {
  it("is bound to the right context", () => {
    addComponent("1", "A");
    addComponent("2", "B");
    const ui = getUI();
    const expected = {
      "1": "A",
      "2": "B"
    };
    tearDown();
    expect(ui.props.components).toMatchObject(expected);
  });
});
