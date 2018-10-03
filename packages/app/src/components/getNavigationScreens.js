import React from 'react';
import ErrorBoundary from './errorBoundaryComponent';
import FructoseComponentWrapper from './fructoseComponentWrapper';
import LoadingScreen from "./loadingScreen"

export default (componentsToLoad, messaging) => {
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
  
  return navigationList
}