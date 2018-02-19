/* globals describe it expect */
import React from "react";
import { Text, View } from "react-native";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { version } from "../../../../package.json";

import FructoseComponent from "./fructoseComponent";

configure({ adapter: new Adapter() });

describe("Fructose Component", () => {
  it("renders specified component", () => {
    const Foo = () => <View />;

    const wrapper = shallow(<FructoseComponent component={<Foo />} />);
    expect(wrapper.find(Foo)).toHaveLength(1);
  });
  it("renders null if no component is specified", () => {
    const wrapper = shallow(<FructoseComponent />);
    expect(
      wrapper
        .find(Text)
        .dive()
        .text()
    ).toBe(`FRUCTOSE @ ${version}`);
  });
});
