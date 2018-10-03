import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createDrawerNavigator
} from 'react-navigation';
// import RootStack from './rootStack'
import getNavigationScreens from './getNavigationScreens';
import MainDrawer from "./navigation/mainDrawer"

const rootStack = (components, comms) => createDrawerNavigator(getNavigationScreens(components, comms), {
    contentComponent: MainDrawer
  });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: () => <LoadingScreen />
    };
    
    this.loadComponent = name => {
      const lowercaseComponent = `${name}`.toLowerCase();
      let component = this.props.components[lowercaseComponent];

      if (!component) {
        component = LoadingScreen;
        this.props.comms.socket.emit('component-not-found', name);
        this.setState({ component });
      }

      this.setState({ component });
    };

    this.sendComponentList = () => {
      this.props.comms.socket.emit(
        'send-loaded-app-components',
        this.props.componentList
      );
    };
  }

  componentDidMount() {
    this.props.comms.events.on('load-component', component => {
      this.loadComponent(component);
    });
    this.props.comms.socket.on('load-component-in-app', this.loadComponent);
    this.props.comms.socket.on(
      'get-loaded-app-components',
      this.sendComponentList
    );
    this.props.comms.socket.emit('fructose-app-ready');
  }

  componentDidUpdate() {
    this.props.comms.socket.emit('component-loaded-in-app');
  }

  render() {
    const RootStack = rootStack(this.props.components, this.props.comms)
    return <RootStack />;
  }
}

App.propTypes = {
  components: PropTypes.objectOf(PropTypes.func).isRequired,
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
