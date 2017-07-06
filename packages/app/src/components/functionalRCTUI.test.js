/* globals describe it beforeEach expect */
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import { EventEmitter } from "events";
import FunctionalRCTUI from "./functionalRCTUI";

const MockComponent = React.createClass({
  render: () => <Text id={this.props.id} />
});

describe("Functional React Component Tester UI", () => {
  let wrapper;
  let events;

  beforeEach(() => {
    events = new EventEmitter();
    wrapper = shallow(
      <FunctionalRCTUI
        events={events}
        components={{ "abc123-test-string": <MockComponent id="testIdBlah" /> }}
      />
    );
  });

  it("snapshot: instantiated FunctionalRCTUI component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("loads default component on render", () => {
    expect(wrapper.contains(<Text>Fructose</Text>)).toBe(true);
  });

  it("snapshot: loading MockComponent", () => {
    wrapper.instance().loadComponent("abc123-test-string");
    expect(wrapper.update()).toMatchSnapshot();
  });

  it("loadComponent loads component into View", () => {
    wrapper.instance().loadComponent("abc123-test-string");
    expect(wrapper.update().contains(<MockComponent id="testIdBlah" />)).toBe(
      true
    );
  });
});
