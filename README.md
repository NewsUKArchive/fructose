# Fructose

Fructose is a library to enable functional testing of React Native components in a device or simulator. It allows you to create functional tests against React Native components in isolation, on a device or a simulator. This is different to an end to end testing approach where you test a built application.

Fructose supports both Android and iOS.

---

## Overview

Fructose has 3 parts to it. 
  - App Component
  - Server
  - Client

You need to use all 3 in order to use Fructose correctly. 

The App component is a React component that sits within an index.ios.js/index.android.js that forms the basis for your test application. It uses a websocket to listen for commands to load in a new component.

The Client allows a test to issue a command to the App Component to load a specific component.

The server orchestrates communication between the client and the App Component.

## Getting Started

### Set up the app
### Start the server
### Start the client

## How it works
## Testing Fructose
## Future
The first feature we need to have a higher level of control within the tests is the ability to declare the component you want to load within your test exactly as you would declare it when building an application, and then being able to load that exact component inside the test application.

So this will change the way the tests are written from:
``` 
fructose.loadComponent(componentName, props);
// rest of test goes here
```
to something like this:
``` 
fructose.loadComponent(
  <View>
    <Component prop1='prop1' prop2={fancyStuff} />
  </View>);
// rest of test goes here
```
This would provide more clarity and flexibility to the tests, especially for cases where you need to pass in complex props.

The second feature I would like to introduce is a cli that will help users of fructose get up and running with a test with as little friction as possible.