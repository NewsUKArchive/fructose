import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default class FructoseComponent extends Component {
  constructor(props) {
    super(props);

    this.loadComponent = name => {
      const component = this.props.components[name];
      if (!component) {
        throw new Error(`${name} does not exist in the componentStore`);
      }
      this.setState({ component });
    };

    this.props.events.on("load", this.loadComponent);
    this.state = { component: <Text>Fructose</Text> };
  }

  componentWillUpdate() {
    this.props.events.emit("loaded");
  }

  componentWillUnmount() {
    this.props.events.removeListener("load", this.loadComponent);
  }

  render() {
    return (
      <View style={styles.container} testID="fructose">
        <StatusBar hidden />
        {this.state.component}
      </View>
    );
  }
}

FructoseComponent.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired
  }).isRequired,
  components: PropTypes.shape.isRequired
};
