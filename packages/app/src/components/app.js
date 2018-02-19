import React, { Component } from "react";
import PropTypes from "prop-types";

import FructoseApp from "./fructoseView";
import NavigationWrapper from "./navigation/menuComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { component: null };

    this.loadComponent = name => {
      const component = this.props.components[name];
      if (!component)
        throw new Error(`${name} does not exist in the componentStore`);
      this.setState({ component });
    };

    this.sendComponentList = () => {
      this.props.comms.socket.emit(
        "loaded-app-components",
        this.props.componentList
      );
    };
  }

  componentDidMount() {
    this.props.comms.events.on("load", this.loadComponent);
    this.props.comms.socket.on("load-on-device", name =>
      this.props.comms.events.emit("load", name)
    );
    this.props.comms.socket.on("get-app-components", this.sendComponentList);
    this.props.comms.socket.emit("fructose-app-ready");
  }

  componentDidUpdate() {
    this.props.comms.socket.emit("loadedOnDevice");
  }

  render() {
    return (
      <NavigationWrapper
        componentList={this.props.componentList}
        events={this.props.comms.events}
      >
        <FructoseApp
          component={this.state.component}
          events={this.props.comms.events}
        />
      </NavigationWrapper>
    );
  }
}

App.propTypes = {
  components: PropTypes.objectOf(PropTypes.object).isRequired,
  componentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  comms: PropTypes.shape({
    events: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};

export default App;
