/* globals describe beforeEach it expect */

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationHeader from "./navigationHeader";

configure({
  adapter: new Adapter()
});

describe("Navigation Header", () => {
  let app;

  it("Renders without back icon", () => {
    app = shallow(
      <NavigationHeader
        navigateToCallback={() => {}}
        isParentMenu={() => true}
      />
    );
    expect(app).toMatchSnapshot();
  });

  it("Renders with back icon", () => {
    app = shallow(
      <NavigationHeader
        navigateToCallback={() => {}}
        isParentMenu={() => false}
      />
    );
    expect(app).toMatchSnapshot();
  });
});
