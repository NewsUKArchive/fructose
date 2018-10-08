/* globals describe beforeEach it expect */

import React from "react";
import express from "express";
import http from "http";
import socketio from "socket.io";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navigation from "./navigation";

configure({
  adapter: new Adapter()
});

describe("Navigation", () => {
  let app;
  let server;
  let io;

  beforeAll(() => {
    app = express();
    server = http.Server(app);
    io = socketio(server);
  });

  beforeEach(done => {
    server.listen(7811, done);
  });

  afterEach(() => server.close());

  it("emits when the app is ready", done => {
    app = shallow(<Navigation items={[{ key: "component" }]} />);

    io.on("connection", socket => {
      socket.on("fructose-app-ready", () => {
        done();
      });
    });
  });

  it("send a list of loaded components in the app", done => {
    app = shallow(
      <Navigation
        items={[{ key: "componentloaded" }, { key: "anothercomponent" }]}
      />
    );

    io.on("connection", socket => {
      socket.on("send-loaded-app-components", sentComponents => {
        expect(sentComponents).toEqual(["componentloaded", "anothercomponent"]);
        done();
      });

      socket.emit("get-loaded-app-components");
    });
  });

  it("loads a component in the app", done => {
    const navigationMock = { navigate: jest.fn() };
    app = shallow(
      <Navigation
        navigation={navigationMock}
        items={[{ key: "componentloaded" }, { key: "anothercomponent" }]}
      />
    );

    io.on("connection", socket => {
      socket.emit("load-component-in-app", "componentloaded");

      setTimeout(() => {
        expect(navigationMock.navigate).toBeCalledWith("componentloaded");
        done();
      }, 5);
    });
  });

  it("renders when is parent menu", () => {
    app = shallow(
      <Navigation
        items={[{ key: "componentLoaded" }, { key: "anotherComponent" }]}
      />
    );
    expect(app).toMatchSnapshot();
  });

  it("renders when is child menu", () => {
    app = shallow(
      <Navigation
        items={[{ key: "componentLoaded" }, { key: "anotherComponent" }]}
      />
    );
    app.setState({ isParentMenu: false });
    expect(app).toMatchSnapshot();
  });
});
