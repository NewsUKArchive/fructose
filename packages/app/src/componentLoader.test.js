/* globals it expect */

import loader from "./componentLoader";

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
