import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#B20000",
    height: "100%"
  },
  errorHeader: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    textAlign: "center"
  },
  stackTrace: {
    color: "white",
    fontSize: 16
  }
});

const ErrorState = (props) => (
      <View style={styles.errorContainer}>
        <StatusBar hidden />
        <Text style={styles.errorHeader}>Exception Found</Text>
        <Text style={styles.stackTrace}>{props.error.message}</Text>
      </View>
    );

ErrorState.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string
  })
};

ErrorState.defaultProps = {
  error: {}
};

export default ErrorState;