import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import componentLoader from "./componentLoader";
import ErrorView from "./components/errorViewComponent";
import ErrorState from "./components/errorStateComponent";

const appUI = (components, events) => (
  <ErrorView>
    {({ hasError, error }) =>
      hasError ? (
        <ErrorState events={events} error={error} />
      ) : (
        <FructoseComponent events={events} components={components} />
      )
    }
  </ErrorView>
);

export default function Fructose(events) {
  console.disableYellowBox = true; // eslint-disable-line

  return loadComponents => {
    const components = componentLoader(loadComponents);
    return () => appUI(components, events);
  };
}
