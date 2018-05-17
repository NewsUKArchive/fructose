/* globals it expect */

import React from "react";
import { Text } from "react-native";
import { EventEmitter } from "events";
import renderer from "react-test-renderer";

import ErrorBoundary from "./errorBoundaryComponent";

const ThrowAnError = () => <Text>{lol}</Text>; // eslint-disable-line

describe("Error Boundary", () => {
  it("It renders the error View when error is triggered", () => {
    const wrapper = renderer
      .create(
        <ErrorBoundary socket={new EventEmitter()} events={new EventEmitter()}>
          <ThrowAnError />
        </ErrorBoundary>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it("it render a component when there is no error", () => {
    const wrapper = renderer
      .create(
        <ErrorBoundary socket={new EventEmitter()} events={new EventEmitter()}>
          <Text>Hey I rendered</Text>
        </ErrorBoundary>
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
