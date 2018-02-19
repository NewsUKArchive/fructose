/* globals describe it expect */
import React from "react";
import { Text } from "react-native";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MenuComponent from "./menuComponent";

configure({ adapter: new Adapter() });

describe("Menu Component", () => {
  const expectedComponentList = ["item1", "item2"];
  const expectedEvents = { emit: jest.fn() };
  const expectedChildren = <Text>Test Text</Text>;
  const componentUnderTest = (
    <MenuComponent
      componentList={expectedComponentList}
      events={expectedEvents}
    >
      {expectedChildren}
    </MenuComponent>
  );

  it("renders specified component", () => {
    const wrapper = shallow(componentUnderTest);
    expect(wrapper).toMatchSnapshot();
  });

  it("emits correct load event on menu item press", () => {
    const expectedComponentId = "component1";
    const wrapper = shallow(componentUnderTest);
    wrapper.instance().onMenuItemPress(expectedComponentId);
    expect(expectedEvents.emit).toHaveBeenCalledWith(
      "load",
      expectedComponentId
    );
  });
});
