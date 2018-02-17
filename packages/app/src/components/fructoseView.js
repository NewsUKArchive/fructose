import React from "react";
import PropTypes from "prop-types";

import FructoseComponent from "./fructoseComponent";
import ErrorView from "./errorViewComponent";
import ErrorState from "./errorStateComponent";

const FructoseApp = ({ component, events }) => (
  <ErrorView events={events}>
    {({ hasError, error }) =>
      hasError ? (
        <ErrorState error={error} />
      ) : (
        <FructoseComponent component={component} />
      )
    }
  </ErrorView>
);

FructoseApp.propTypes = {
  component: PropTypes.element,
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired
  }).isRequired
};

FructoseApp.defaultProps = {
  component: null
};

export default FructoseApp;
