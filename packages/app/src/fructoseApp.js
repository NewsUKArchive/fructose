import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import ErrorView from "./components/errorViewComponent";
import ErrorState from "./components/errorStateComponent";

export default Fructose = (props) => {
  // console.disableYellowBox = true; // eslint-disable-line
  return (
    <ErrorView events={props.comms.events}>
      {({ hasError, error }) =>
        hasError ? (
          <ErrorState error={error} />
        ) : (
          <FructoseComponent component={props.component} />
        )
      }
    </ErrorView>
  );
}
