/* globals describe it expect */
import React from "react";
import { Text } from "react-native";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import navigationWrapper from "./navigationWrapper";

configure({ adapter: new Adapter() });

describe("Menu navigation Component", () => {
  const expectedComponentList = ["item1", "item2"];
  const loadComponent = () => {};
  const expectedChildren = <Text>Test Text</Text>;
  const componentUnderTest = (
    <navigationWrapper
      componentList={expectedComponentList}
      loadComponent={loadComponent}
    >
      {expectedChildren}
    </navigationWrapper>
  );

  it("renders the expected component list", () => {
    const wrapper = shallow(componentUnderTest);
    expect(wrapper).toMatchSnapshot();
  });
});
