import React from 'react';
import ErrorBoundary from './errorBoundaryComponent';
import FructoseComponentWrapper from './fructoseComponentWrapper';
import LoadingScreen from "./loadingScreen"

export default (componentsToLoad) => {
  const navigationList = {
      Home: {
        screen: LoadingScreen
      }
    };

    Object.keys(componentsToLoad).forEach(component => {
      navigationList[component] = {
          screen: () => (
            <ErrorBoundary>
              <FructoseComponentWrapper component={componentsToLoad[component]} />
            </ErrorBoundary>
          )
        }
      })
  
  return navigationList
}