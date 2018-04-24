
[![Build Status](https://www.bitrise.io/app/3038aa161f140118/status.svg?token=xtX-Hi2JSI7S3zQIGHI0EQ&branch=master)](https://www.bitrise.io/app/3038aa161f140118)
# Fructose
## Brought to you by The Times Tooling team  🛠

Fructose is a library that enables the loading of react native and react native web components in an app.

We have used this to 

 - Enable automated functional black and grey box testing of components. 
 - Enable automated visual regression of components with [Dextrose]

# Overview

## The App

The Fructose app allows for the loading of arbitrary components at runtime. Once the app is started you are able to load the components in either manual or automated fashion.

<img src="https://imgur.com/VJR5Tbz.gif">

Swipe right to manually load a component (shown above)


## Getting Started

We are actively working on this to become easier. 


## Running and understanding the examples

The best way to understand how fructose works is to run the end to end tests.


### Running
From the root of the project run `yarn` and then either...

`yarn e2e:test:web`

`yarn e2e:test:ios`

`yarn e2e:test:android`


You will need a (simulator | emulator | chrome) to run these examples.
### Understanding

In the `e2e Test` folder you will find examples of how to consume fructose.
We suggest first looking at the `scripts` folder to understand the steps required for running tests with Fructose.

Then look at the `examples` folder. 

The `.showcase` file is a description of how a component should be rendered.
`showcase` files came around because originally fructose consumed `storybook` files. This eventaully resulted in numerous issues so we created an abstraction layer which decouples components from storybook.
You can see a working example of how showcase to storybook works here.

[Times-Components-storybook]

Showcase files are then loaded into the app index via react-native-showcase-loader function.


The test file is an example of how to load a component ready for grey or black box testing.


Finally the fructose folder is where all of the different platform indexes live.


Below are examples of Ios and Web e2eTests running.


### React Native Web
[![web fructose](https://imgur.com/Kp75645.gif)](https://imgur.com/Kp75645)

### React Native IOS
[![ios fructose](https://imgur.com/66zjgr8.gif)](https://imgur.com/66zjgr8)

(The red screen is expected as we're catching a component that errors)

(Yes the tests are asserting that quick as they are testing that events are emitted)

# Consuming Fructose


From your project

```
yarn add @times-components/fructose --dev
yarn add react-native-showcase-loader --dev
```


Create a folder `fructose` in your project root directory.

Create an `index.*.js` in this folder for your platform of choice: `ios`, `android`, or `web`.

Register the component to the name that your app binary expects. 

Use react native showcase loader function to require in your showcase files.

See the examples below.

[Ios Index Example](e2eTests/fructose/index.ios.js)

[Run Ios Tests.sh Example](e2eTests/scripts/ios-tests.sh)

## Writing tests


In a before hook import setup from fructose and run.

```
fructose.hooks.mobile.setup();
fructose.hooks.web.setup();
```

[Ios setup Example](e2eTests/fructose/setup.native.js)


Once the setup promise resolves you will have access to a global `fructoseClient`. Use this client to tell your app to load components defined in your showcase files.

```
global.fructoseClient.loadComponent('your component name')
```

Your component is now ready for interrogation by the testing library of your choice.
We have used both [appium] and [detox] 


## Notes 

We currently have Fructose running in a CI environment with...
- [jest] as the test runner.
- [detox] is being used as the driver for IOS.
    If you want to understand [expect][expect], [element][actions], and [by][matchers], take a look at the [Detox documentation][detox-docs].
- [chromeless] is being used as the driver for the web component tests



## Future
  
  1. Fructose cli to initialise and run tests
  
[jest]: https://facebook.github.io/jest
[chromeless]: https://github.com/graphcool/chromeless
[detox]: https://github.com/wix/detox
[detox-docs]: https://github.com/wix/detox/blob/master/docs/README.md
[matchers]: https://github.com/wix/detox/blob/master/docs/APIRef.Matchers.md
[actions]: https://github.com/wix/detox/blob/master/docs/APIRef.ActionsOnElement.md
[expect]: https://github.com/wix/detox/blob/master/docs/APIRef.Expect.md
[appium]: http://appium.io/
[times-components-storybook]: https://github.com/newsuk/times-components/tree/master/packages/storybook
[Dextrose]: https://github.com/newsuk/dextrose
