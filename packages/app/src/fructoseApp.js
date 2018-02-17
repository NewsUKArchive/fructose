import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import ErrorView from "./components/errorViewComponent";
import ErrorState from "./components/errorStateComponent";

export default Fructose = (props) => {
  // console.disableYellowBox = true; // eslint-disable-line
  return (
    <ErrorView events={props.events}>
      {({ hasError, error }) =>
        hasError ? (
          <ErrorState events={props.events} error={error} />
        ) : (
          <FructoseComponent events={props.events} component={props.component} />
        )
      }
    </ErrorView>
  );
}
