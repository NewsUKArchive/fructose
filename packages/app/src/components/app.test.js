/* globals describe beforeEach it expect */

import React from "react";
import { View } from "react-native";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app";

configure({ adapter: new Adapter() });

describe("App", () => {
  let app;
  let components;

  beforeEach(() => {
    components = {
      component1: () => <View />,
      component2: () => <View />,
      component3: () => <View />
    };
  });

  it("Renders the root stack", () => {
    app = shallow(<App components={components} />);

    expect(app).toMatchSnapshot();
  });
});
