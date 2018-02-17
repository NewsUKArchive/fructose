import React from "react";
import FructoseComponent from "./components/fructoseComponent";
import ErrorView from "./components/errorViewComponent";
import ErrorState from "./components/errorStateComponent";

export default ({component, comms}) => 
  // console.disableYellowBox = true; // eslint-disable-line
   (
    <ErrorView events={comms.events}>
      {({ hasError, error }) =>
        hasError ? (
          <ErrorState error={error} />
        ) : (
          <FructoseComponent component={component} />
        )
      }
    </ErrorView>
  )
