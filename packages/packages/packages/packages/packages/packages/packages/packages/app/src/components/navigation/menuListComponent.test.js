/* globals describe it expect */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MenuListComponent from "./menuListComponent";

configure({ adapter: new Adapter() });

describe("Menu List Component", () => {
  const expectedMenuItems = [
    "parent1/parent1child",
    "parent1/parent1child2",
    "parent2/parent2child",
    "parent2/parent2child2",
    "parent1/parent1child3",
    "parent3"
  ];

  const expectedOnMenuItemPress = jest.fn();
  const componentUnderTest = (
    <MenuListComponent
      menuItems={expectedMenuItems}
      onMenuItemPress={expectedOnMenuItemPress}
    />
  );

  it("renders specified component", () => {
    const wrapper = shallow(componentUnderTest);
    expect(wrapper).toMatchSnapshot();
  });
});
