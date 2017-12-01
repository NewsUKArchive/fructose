/* globals describe it beforeEach expect */
import React from "react";
import { Text } from "react-native";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { EventEmitter } from "events";
import FructoseComponent from "./fructoseComponent";

configure({ adapter: new Adapter() });

const MockComponent = props => <Text id={props.id} />; // eslint-disable-line react/prop-types

describe("Functional React Component Tester UI", () => {
  let wrapper;
  let events;
  const components = {
    "abc123-test-string": <MockComponent id="testIdBlah" />,
    abcNewKey: <MockComponent id="testIdBlah" />
  };

  beforeEach(() => {
    events = new EventEmitter();
    wrapper = shallow(
      <FructoseComponent events={events} components={components} />
    );
  });

  it("snapshot: instantiated FunctionalRCTUI component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("adds event listener for 'load' on creation", () => {
    expect(events.listeners("load")).toHaveLength(1);
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

  it("loadComponent throws error when component not found", () => {
    expect(() =>
      wrapper.instance().loadComponent("non-existent-component")
    ).toThrow();
  });

  it("loadComponent throws error when component not found", () => {
    expect(() =>
      wrapper.instance().loadComponent("non-existent-component")
    ).toThrow();
  });

  it("removes 'load' listener on unmount", () => {
    wrapper.unmount();
    expect(events.listeners("load")).toHaveLength(0);
  });

  it("adds event listener for 'publish-component-store' on creation", () => {
    expect(events.listeners("publish-component-store")).toHaveLength(1);
  });

  it("returns an array of component keys when publish event event triggered", () =>
    new Promise(resolve => {
      const eventEmitter = new EventEmitter();
      eventEmitter.on("loaded-app-components", componentKeys => {
        expect(componentKeys).toMatchObject([
          "abc123-test-string",
          "abcNewKey"
        ]);
        resolve();
      });
      shallow(
        <FructoseComponent events={eventEmitter} components={components} />
      );
      eventEmitter.emit("publish-component-store");
    }));
});
