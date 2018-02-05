import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import componentLoader from "./componentLoader";

const appUI = (components, events) => (
  <FructoseComponent events={events} components={components} />
);

export default function Fructose(events) {
  console.disableYellowBox = true; // eslint-disable-line

  return loadComponents => {
    const components = componentLoader(loadComponents);
    return () => appUI(components, events);
  };
}
