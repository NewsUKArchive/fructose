/* globals it withComponent expect */

import loader from "./componentLoader";

it("returns an object containing component functions", () => {
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
  expect(loaded.obj1()).toMatchObject(obj1);
  expect(loaded.obj2()).toMatchObject(obj2);
});

it("returns an object with keys when using .showcasefiles", () => {
  // mocks the showcase structure that is exported in times-components
  const mockShowcase = {
    default: {
      name: "Primitives/ArticleLabel",
      children: [
        {
          type: "story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];
  const loadedShowcases = loader(getShowcasesObject);
  const returnedComponent = loadedShowcases[
    "Primitives/ArticleLabel/Article Label"
  ]();
  expect(returnedComponent).toEqual("lol");
});

it("filters out non story showcases", () => {
  // mocks the showcase structure that is exported in times-components
  const mockShowcase = {
    default: {
      name: "Primitives/ArticleLabel",
      children: [
        {
          type: "not a story",
          name: "Article Label",
          component: () => "lol"
        }
      ]
    }
  };

  const getShowcasesObject = () => [mockShowcase];

  const loaded = loader(getShowcasesObject);
  expect(loaded).toEqual({});
});
