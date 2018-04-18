import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar } from "react-native";

import ErrorView from "./errorViewComponent";
import ErrorState from "./errorStateComponent";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  }
});

const FructoseApp = ({ component, events }) => (
  <ErrorView events={events}>
    {({ hasError, error }) =>
      hasError ? (
        <ErrorState error={error} />
      ) : (
        <View style={styles.container} testID="fructose">
          <StatusBar hidden />
          {component}
        </View>
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
