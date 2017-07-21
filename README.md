# Fructose

Fructose is a library to enable functional testing of React Native components in a device or simulator. It allows you to create functional tests against React Native components in isolation. This is different to an end to end testing approach where you test a built application.

Fructose uses [detox] under the hood as the driver for ios devices.

Fructose can technically support both Android and iOS. At the moment it is limited by [detox] to iOS. Once [detox] has Android support, so will fructose.

---

## Overview

Fructose has 2 main parts to it. 
  - Fructose App
  - Fructose Test Utils

You need to use both to create and run a fructose test.

The App component is a React component that sits within an index.ios.js/index.android.js and forms the basis for your test application. It uses a websocket to listen for commands to load in a new component.

The Test Utils enable tests to load components inside the app, and they also enable interaction with the app through [detox].

## Getting Started

### Install

```
yarn add fructose --dev
yarn add react-native-storybook-loader --dev
```

### Set up the app

Create a folder `.fructose` in your project root directory.

Add an `index.ios.js` in this folder with the following content - register the component to the same name as the one your app binary expects. For example, if you are using the storybook app:

```
import { AppRegistry } from "react-native";
import Fructose from "fructose";
import { loadStories } from './components';

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));
```

### Set up the tests

Next add a setup file for your test runner in the same folder with the following content:

```
import setup from 'fructose/setup';
import config from '../package';
setup(config.fructose);
```

You will need to require this file at the beginning of your test run. For example, if you are using jest add this to your package.json:

```
	"jest": {
		"setupTestFrameworkScriptFile": "./.fructose/setup.js"
	}
```

You will also need to add a `fructose` config to your package.json with an attribute binaryPath that points to a React Native app, for example if you are using storybooks, you can set binaryPath to the location of the storybook binary:

```
	"fructose": {
		"binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/storybooksnative.app"
	}
```

Add a script to your package.json: 

```
  "run-fructose-tests": "npm run write-test-components && jest .fructose/components.test.js --forceExit --verbose"
```

### Create the pretest hooks

If you need further information you can refer to packages/e2eTests for an example project setup.

Add the following to your package.json:

```
"scripts": {
  "fructose-app": "react-native start --root .fructose --resetCache",
  "compile-components": "rnstl --searchDir ./ --pattern '**/*.fructose.js' --outputFile ./.fructose/components.js",
  "write-test-components": "npm run compile-components  && compile-tests"
}
```

## Writing tests

Your test files should be named to match this glob: `*.fructose.test.js`.

At this moment in time this is not configurable, though we can add the functionality if there is a demand for it.

Tests can be written as follows:
```
import React from 'react';
import { MyComponent } from './my-component';

withComponent(<MyComponent>The Philosopher's Stone</MyComponent>, 'description', () => {
  test('test description', async () => {
    await expect(element(by.text(`The Philosopher's Stone`))).toBeVisible();
  });
});
```

The first interesting thing to note here is the 'withComponent' function. This function has two purposes.

When run in the context of the application, it loads up the component (first argument) into the app.

When run in the context of the tests, it sends a message to the app to load up the component.

The second and third arguments are only used in the context of the tests. The second argument is simply a description that you might put into a 'describe' block, the third is a function that contains your tests. At the moment the tests need to be written in a test framework that supports the functions `beforeAll`,`afterAll`, `beforeEach`, `afterEach`, `describe`. We have only tested it with jest.

If you want to understand [expect][expect], [element][actions], and [by][matchers], take a look at the [Detox documentation][detox-docs].

## Future
  
  1. Remove as much of the configuration currently needed as possible 
  2. Make Fructose test runner agnostic.
  3. A Cli to help get started with fructose.

[detox]: https://github.com/wix/detox
[detox-docs]: https://github.com/wix/detox/blob/master/docs/README.md
[matchers]: https://github.com/wix/detox/blob/master/docs/APIRef.Matchers.md
[actions]: https://github.com/wix/detox/blob/master/docs/APIRef.ActionsOnElement.md
[expect]: https://github.com/wix/detox/blob/master/docs/APIRef.Expect.md
