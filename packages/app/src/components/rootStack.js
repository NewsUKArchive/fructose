import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ErrorBoundary from './errorBoundaryComponent';
import FructoseComponentWrapper from './fructoseComponentWrapper';
import {
  createDrawerNavigator
} from 'react-navigation';
import { version } from '../../../../package.json';
import MainDrawer from './navigation/mainDrawer';

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
  

const root = (componentsToLoad, messaging) => {
    const navigationList = {
        Home: {
          screen: LoadingScreen
        }
      };

      Object.keys(componentsToLoad).forEach(component => {
        navigationList[component] = {
            screen: () => (
              <ErrorBoundary
                socket={messaging.socket}
                events={messaging.events}
              >
                <FructoseComponentWrapper component={componentsToLoad[component]} />
              </ErrorBoundary>
            )
          }
        })
    
      return createDrawerNavigator(navigationList, {
        contentComponent: MainDrawer
      });
  
}

export default class RootStack extends Component { 
    constructor({componentsToLoad, messaging}) {
        super()
        this.componentsToLoad = componentsToLoad;
        this.messaging = messaging
    }

    render() {
        const Root = root(this.componentsToLoad, this.messaging)
        return <Root />;
    }

}