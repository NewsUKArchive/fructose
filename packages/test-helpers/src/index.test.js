test("index exports function as default", async () => {
  const fructose = require("./index").default;
  expect(typeof fructose.hooks.mobile.setup).toBe("function");
  expect(typeof fructose.hooks.mobile.cleanup).toBe("function");
  expect(typeof fructose.hooks.web.setup).toBe("function");
  expect(typeof fructose.hooks.web.cleanup).toBe("function");
});
