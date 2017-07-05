import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import io from "socket.io-client";

export default class FunctionalRCTUI extends Component {
  constructor(props) {
    super(props);
    this.props.events.on("load", this.loadComponent);
    this.state = { component: <Text>Fructose</Text> };
  }

  loadComponent = (name) => {
    const component = this.props.components[name];
    if (!component){
      console.error(name, 'is undefined', this.props.components);
    }
    this.setState({ component: component });
  };

  componentWillUnmount() {
    this.props.events.removeListener("component", this.componentLoader);
  }

  componentWillUpdate() {
    this.props.events.emit("loaded");
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.component}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
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

FunctionalRCTUI.propTypes = {
  events: PropTypes.shape({
    on: PropTypes.func.isRequired,
    removeListener: PropTypes.func.isRequired
  }).isRequired
};
