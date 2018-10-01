import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import ErrorBoundary from './errorBoundaryComponent';
import FructoseComponentWrapper from './fructoseComponentWrapper';
import { version } from '../../../../package.json';
import { DrawerItems, SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  version: {
    padding: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'left'
  },
  text: {
    paddingTop: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  view: {
    backgroundColor: 'lightpink',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
  }
});

const LoadingScreen = () => (
  <View style={styles.view}>
    <Text style={styles.text}>
      Brought to you by {'\n'} The Times Tooling Team
    </Text>
    <View>
      <Text style={styles.header}>🛠 FRUCTOSE 🛠</Text>
    </View>
    <Text style={styles.version}>Version: {version}</Text>
  </View>
);

const CustomDrawerContentComponent = props => {
  console.warn(props.navigation.router.childRouters);

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: () => <LoadingScreen />
    };
    this.RootStack = this.initialiseNavigation(props.components);

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

  initialiseNavigation(componentsToLoad) {
    const navigationList = {
      Home_: {
        screen: LoadingScreen
      }
    };

    for (const component in componentsToLoad) {
      navigationList[component] = {
        screen: () => (
          <ErrorBoundary
            socket={this.props.comms.socket}
            events={this.props.comms.events}
          >
            <FructoseComponentWrapper component={componentsToLoad[component]} />
          </ErrorBoundary>
        )
      };
    }

    return createDrawerNavigator(navigationList, {
      contentComponent: CustomDrawerContentComponent
    });
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
    const RootStack = this.RootStack;
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
