import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  }
});

const knobs = {
  select: () => {},
  color: () => {},
  selectV2: () => {},
  e2eTestDontDelete: () => <Text>YAY I RENDERED</Text>
};

const actions = {
  action: () => {},
  decorateAction: () => () => {}
};

const FructoseView = ({ component }) => (
  <View style={styles.container} testID="fructose">
    <StatusBar hidden />
    {component(knobs, actions)}
  </View>
);

FructoseView.propTypes = {
  component: PropTypes.element
};

FructoseView.defaultProps = {
  component: null
};

export default FructoseView;
