
[![Build Status](https://www.bitrise.io/app/3038aa161f140118/status.svg?token=xtX-Hi2JSI7S3zQIGHI0EQ&branch=master)](https://www.bitrise.io/app/3038aa161f140118)
# Fructose

Fructose is a library that enables automated functional testing of react-native (and react-native-web) components. 

It is inspired by the storybook approach which lets you load in components for manual testing.

## Overview

Fructose has 2 main parts to it.
  - The app
  - The test api

You need to use both parts to create and run a fructose test.

The app contains all the components under test and a mechanism to load them from a client.

The test api enables you to easily load components into the app from a test.

To interact with the component under test you must use a tool such as [detox], [chromeless] or [appium].

## Getting Started

### Install

```
yarn add fructose --dev
yarn add react-native-storybook-loader --dev
```

### Set up the app

Create a folder `.fructose` in your project root directory.

Create a `index.*.js` in this folder for your platform of choice: `ios`, `android`, or `web`.

These files will load the components to be tested into the Fructose app.

Register the component to the name that your app binary expects.

```
import { AppRegistry } from "react-native";
import Fructose from "fructose";
import { loadStories } from './components';

AppRegistry.registerComponent("e2eTests", () => Fructose(loadStories));
```

We recommend looking at the examples for [web](./e2eTests/.fructose/index.web.js) and [native](./e2eTests/.fructose/index.ios.js) as there are slight differences.

### Set up the tests

Add a setup file in `.fructose`. This is a file that should run once before any of your tests run.

In the below examples we will provide example config for jest. If you use a different test runner then you can do the equivalent for that runner.

In this file you will need to run test hooks.

As a minimum you will need to do the following for mobile:

```
import fructose from "@times-components/fructose/setup";

beforeAll( async () => {
  await fructose.hooks.mobile.setup();
});

afterAll( async () => {
  await fructose.hooks.mobile.cleanup();
});
```
And for web:
```
import fructose from "@times-components/fructose/setup";

beforeAll( async () => {
  await fructose.hooks.web.setup();
});

afterAll( async () => {
  await fructose.hooks.mobile.cleanup();
});
```

You will need to run this setup file at the beginning of your test run. For example, if you are using jest add this to your package.json:
```
"jest": {
  "setupTestFrameworkScriptFile": "./.fructose/setup.js"
}
```

The exact structure will depend on the test runner you are using and the platform you are targetting.

Check out the [example setup file](./e2eTests/.fructose/jest-setup.js) if you require more detail.


### Create the pretest hooks

Add the following to your package.json:

```
"scripts": {
  "fructose-app": "react-native start --root .fructose --resetCache",
  "fructose-web": "start-web --build-dir your/build-dir"
  "compile-components": "rnstl --searchDir ./ --pattern '**/*.fructose.js' --outputFile ./.fructose/components.js",
  "write-test-components": "yarn compile-components  && compile-tests"
}
```

## Writing tests

Your test files should include the platform and be named to match the following glob:

  - `*.fructose.@(web|ios|android).js`.

There are examples [here](packages/e2eTests/example).

The `fructose.hooks.web.setup()` function exposes a global `withComponent` function. It enables the test api to load up a component in the fructose app.

```
withComponent(
  <Text fructoseID="hobbit">The Hobbit</Text>, // --#1--
  "renders basic text", // --#2--
  fructose => { // --#3--
    beforeEach(async () => {
      await fructose.loadComponent();
    });

    test("simple test", async () => {
        await expect(element(by.text(`The Hobbit`))).toBeVisible();
    });
  }
);

```
The first argument to the function is a React Component. This component must have a unique fructoseID prop so that it can be loaded into the fructose app from the tests.

The second argument is a description.

The third argument is a callback that contains tests for the component. In our example we are using [jest] test methods, and [detox] as the driver.

For visual regression testing you have the ability to call `fructose.snapshotTest(platform, componentID);` inside your tests (only tested with iOS so far, though the ability for android exists).

## Notes 

We currently have Fructose running in a CI environment with...
- [jest] as the test runner.
- [detox] is being used as the driver for IOS.
    If you want to understand [expect][expect], [element][actions], and [by][matchers], take a look at the [Detox documentation][detox-docs].
- [chromeless] is being used as the driver for the web component tests



## Future
  
  1. Fructose cli to initialise and run tests
  1. More mature VRT service
  
[jest]: https://facebook.github.io/jest
[chromeless]: https://github.com/graphcool/chromeless
[detox]: https://github.com/wix/detox
[detox-docs]: https://github.com/wix/detox/blob/master/docs/README.md
[matchers]: https://github.com/wix/detox/blob/master/docs/APIRef.Matchers.md
[actions]: https://github.com/wix/detox/blob/master/docs/APIRef.ActionsOnElement.md
[expect]: https://github.com/wix/detox/blob/master/docs/APIRef.Expect.md
[appium]: http://appium.io/