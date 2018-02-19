/* globals describe beforeEach it expect */

import React from "react";
import { View } from "react-native";
import { EventEmitter } from "events";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./app";

configure({ adapter: new Adapter() });

describe("App", () => {
  let app;
  let messaging;
  let components;
  let componentList;
  beforeEach(() => {
    messaging = {
      events: new EventEmitter(),
      socket: new EventEmitter()
    };

    components = {
      component1: <View testId={1} />,
      component2: <View testId={2} />,
      component3: <View testId={3} />
    };

    componentList = Object.keys(components).map(key => key);
  });

  it("loads a component via events", () => {
    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );
    messaging.events.emit("load", "component1");
    expect(app.instance().state.component).toBe(components.component1);
  });

  it("loads a component via socket", () => {
    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );
    messaging.socket.emit("load-on-device", "component1");
    expect(app.instance().state.component).toBe(components.component1);
  });

  it("returns the list of components that can be loaded", done => {
    messaging.socket.on("loaded-app-components", list => {
      expect(list).toBe(componentList);
      done();
    });
    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );
    messaging.socket.emit("get-app-components");
  });

  it("lets clients know when the app is ready", done => {
    messaging.socket.on("fructose-app-ready", () => {
      // If this test fails due to timeout the app is not emitting the fructose-app-ready message
      done();
    });

    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );
  });

  it("lets clients know that component is loaded", done => {
    messaging.socket.on("loadedOnDevice", () => {
      done();
    });
    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );

    // assumption being made that the app will re-render
    app.instance().componentDidUpdate();
    messaging.events.emit("load", "component1");
  });

  it("throws error when requested to load component that does not exist", () => {
    app = shallow(
      <App
        comms={messaging}
        components={components}
        componentList={componentList}
      />
    );
    expect(() =>
      app.instance().loadComponent("non-existent-component")
    ).toThrow();
  });
});
