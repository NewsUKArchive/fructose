import React, {Component} from "react";

import FructoseApp from "./fructoseApp";
import Messaging from "./messaging";
import NavigationWrapper from "./components/navigation";
import componentLoader from "./componentLoader";

class App extends Component {
  constructor(props) {
    super(props);
    this.components = componentLoader(this.props.loadComponents);
    this.componentList = Object.keys(this.components).map(key => key);
    this.state = {component: null}
  }

  loadComponent = (name) => {
    const component = this.components[name];
    if (!component) throw new Error(`${name} does not exist in the componentStore`);
    this.setState({component});
  }

  sendComponentList() {
    this.props.comms.socket.emit("loaded-app-components", this.componentList);
  }

  componentDidMount() {
    this.props.comms.events.on("load", this.loadComponent);
    this.props.comms.socket.on("load-on-device", (name) => this.props.comms.events.emit("load", name));
    this.props.comms.socket.on("get-app-components", this.sendComponentList);
    this.props.comms.socket.emit("fructose-app-ready");
  }

  componentDidUpdate() {
    this.props.comms.socket.emit("loadedOnDevice");
  }
  render() {
    return (
      <NavigationWrapper
        componentList={this.componentList}
        events={this.props.comms.events}
      >
        <FructoseApp component={this.state.component} comms={this.props.comms}/>
      </NavigationWrapper>

    );
  }
}

export default app = (loadComponents) => () => <App loadComponents={loadComponents} comms={Messaging()}/>;
