/* globals describe beforeEach it expect */

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ParentNavigationItem from "./parentNavigationItem";

configure({
  adapter: new Adapter()
});

describe("Parent Navigation Header", () => {
  let app;

  it("Renders without back icon", () => {
    app = shallow(
      <ParentNavigationItem label="label to render" onPress={() => {}} />
    );
    expect(app).toMatchSnapshot();
  });
});
