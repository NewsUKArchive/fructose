import React, {Component} from "react";
import { EventEmitter } from "events";

import FructoseApp from "./fructoseApp";
import automatedEvents from "./automated";
import NavigationWrapper from "./components/navigation";
import componentLoader from "./componentLoader";

class ManualApp extends Component {
  constructor(props) {
    super(props);
    this.components = componentLoader(this.props.loadComponents);
    this.componentList = Object.keys(this.components).map(key => key);
    this.socket = new EventEmitter();
    this.events = new EventEmitter();
    this.state = {component: null}
  }

  componentDidMount() {
    this.events.on("load", componentName => {
      this.setState({component: this.components[componentName]});
    });  
  }
  render() {
    return (
      <NavigationWrapper
        componentList={this.componentList}
        events={this.events}
      >
        <FructoseApp component={this.state.component} events={this.events}/>
      </NavigationWrapper>

    );
  }
}
export const manual = (loadComponents) => () => <ManualApp loadComponents={loadComponents}/>;
export const automated = fructoseApp(automatedEvents);
