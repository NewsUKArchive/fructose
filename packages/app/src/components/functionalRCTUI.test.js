import React from "react";
import { Text, View } from "react-native";
import { shallow } from "enzyme";
import FunctionalRCTUI from "./functionalRCTUI";
import { EventEmitter } from "events";

const MockComponent = React.createClass({
  render: () => <Text id={this.props.id} />
});

describe("Functional React Component Tester UI", () => {
  var wrapper;
  var events;

  beforeEach(() => {
    events = new EventEmitter();
    wrapper = shallow(
      <FunctionalRCTUI events={events} components={{ MockComponent }} />
    );
  });

  it("snapshot: instantiated FunctionalRCTUI component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("loads default component on render", () => {
    expect(wrapper.contains(<Text>reactase</Text>)).toBe(true);
  });

  it("snapshot: loading MockComponent", () => {
    wrapper.instance().loadComponent(MockComponent.displayName, { id: "mock" });
    expect(wrapper.update()).toMatchSnapshot();
  });

  it("loadComponent loads component into View", () => {
    wrapper.instance().loadComponent(MockComponent.displayName, { id: "mock" });
    expect(wrapper.update().contains(<MockComponent id="mock" />)).toBe(true);
  });
});
