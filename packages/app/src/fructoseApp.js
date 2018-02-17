import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import ErrorView from "./components/errorViewComponent";
import ErrorState from "./components/errorStateComponent";

export default (props) => 
  // console.disableYellowBox = true; // eslint-disable-line
   (
    <ErrorView events={props.comms.events}>
      {({ hasError, error }) =>
        hasError ? (
          <ErrorState error={error} />
        ) : (
          <FructoseComponent component={props.component} />
        )
      }
    </ErrorView>
  )
