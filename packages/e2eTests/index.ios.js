/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { getUI, addComponent, loadComponent } from 'reactase-app';

class Component2 extends Component {
  render () {
    return <Text>COMPONENT 2</Text>;
  }
}

class Component1 extends Component {
  render () {
    return <Text>COMPONENT 1</Text>;
  }
}

export default class e2eTests extends Component {
  constructor () {
    super();
    this.state = {harness: <Text>Harness</Text>}
  } 

  componentDidMount(){
    addComponent('Component1', Component1);
    addComponent('Component2', Component2);
    this.setState({harness:getUI()});
    setTimeout(() => loadComponent('Component1', {}), 250);
    setTimeout(() => loadComponent('Component2', {}), 500);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.harness}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('e2eTests', () => e2eTests);
