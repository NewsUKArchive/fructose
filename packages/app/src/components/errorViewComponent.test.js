/* globals describe it beforeEach expect */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorComponent from "./errorViewComponent";

configure({ adapter: new Adapter() });

describe("Error View Handler", () => {
  let wrapper;
  let error;

  beforeEach(() => {
    error = new Error("I am ERRRRRR");
    wrapper = shallow(<ErrorComponent error={error} />);
  });

  it("prints out error", () => expect(wrapper).toMatchSnapshot());
});
