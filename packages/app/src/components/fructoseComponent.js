import React from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import PropTypes from "prop-types";
import { version } from "../../../../package.json";

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    height: "100%",
    width: "100%"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  }
});

const FructoseComponent = ({ component }) => (
  <View style={styles.container} testID="fructose">
    <StatusBar hidden />
    {component}
  </View>
);

FructoseComponent.propTypes = {
  component: PropTypes.element
};

FructoseComponent.defaultProps = {
  component: <Text style={styles.welcome}>FRUCTOSE @ {version}</Text>
};

export default FructoseComponent;
