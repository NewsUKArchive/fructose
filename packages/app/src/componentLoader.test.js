/* globals it withComponent expect */

import loader from "./componentLoader";

it("returns an object containing unique keys/values", () => {
  const obj1 = { a: 1, b: 1, c: 1, props: { fructoseID: "obj1" } };
  const obj2 = { d: 1, e: 1, f: 1, props: { fructoseID: "obj2" } };

  const loadable = () => {
    withComponent(obj1);
    withComponent(obj1);
    withComponent(obj1);
    withComponent(obj2);
  };
  const loaded = loader(loadable);
  expect(Object.keys(loaded)).toHaveLength(2);
  expect(Object.values(loaded)).toContain(obj1);
  expect(Object.values(loaded)).toContain(obj2);
});
