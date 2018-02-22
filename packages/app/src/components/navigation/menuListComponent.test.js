/* globals describe it expect */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MenuListComponent from "./menuListComponent";

configure({ adapter: new Adapter() });

describe("Menu List Component", () => {
  const expectedMenuHeader = "Test Header";
  const expectedMenuItems = ["item1", "item2"];
  const expectedOnMenuItemPress = jest.fn();
  const componentUnderTest = (
    <MenuListComponent
      menuHeader={expectedMenuHeader}
      menuItems={expectedMenuItems}
      onMenuItemPress={expectedOnMenuItemPress}
    />
  );

  it("renders specified component", () => {
    const wrapper = shallow(componentUnderTest);
    expect(wrapper).toMatchSnapshot();
  });
});
