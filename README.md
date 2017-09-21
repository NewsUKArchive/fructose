
[![Build Status](https://www.bitrise.io/app/3038aa161f140118/status.svg?token=xtX-Hi2JSI7S3zQIGHI0EQ&branch=master)](https://www.bitrise.io/app/3038aa161f140118)
# Fructose

Fructose is a library to enable functional testing of both React and React Native components on a device, simulator or web. It allows you to create functional tests against components in isolation.
This is different to an end to end testing approach where you test a built application.


## Overview

Fructose has 2 main parts to it.
  - Fructose App
  - Fructose Test Utils

You need to use both to create and run a fructose test.

The App component is a React component that sits within an index.ios.js/index.android.js and forms the basis for your test application. It uses a websocket to listen for commands to load in a new component.

The Test Utils enable your tests to load components inside the fructose app.
Once loaded, your functional tests will run and be able to interrogate and assert on the component.

## Getting Started

### Install

```
yarn add fructose --dev
yarn add react-native-storybook-loader --dev
```

### Set up the app

Create a folder `.fructose` in your project root directory.

Add an `index.*.js` in this folder for `ios`, `android`, or `web`.
These files will load the components to be tested into the Fructose app.
Register the component to the same name as the one your app binary expects.

```
import { AppRegistry } from "react-native";
import Fructose from "fructose";
import { loadStories } from './components';

AppRegistry.registerComponent("e2eTests", () => Fructose(loadStories));
```


We recommend looking at the examples in
`"./e2eTests/.fructose"` for your chosen platform as there are slight differences between web / native.

### Set up the tests

Next add a setup file for your test runner in the same folder and `import Fructose`

In this file you will be able to create test hooks to run before or after your test runs.
To initialize Fructose for web you will want to use.
` await fructose.hooks.web.setup();`

and for mobile
`await fructose.hooks.mobile.setup();`

Look at `./e2eTests/.fructose/jest-setup.js' for reference.


You will need to require this setup file at the beginning of your test run. For example, if you are using jest add this to your package.json:

```
    "jest": {
        "setupTestFrameworkScriptFile": "./.fructose/setup.js"
    }
```

Alternatively depending if you already are using Jest for other tests in your project you are able to pass the config at runtime using `--setupTestFrameworkScriptFile`

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

You wil need to tailor each of these scripts to match your expected platform.
### Create the pretest hooks

If you need further information you can refer to `packages/e2eTests` for an example project setup.

Add the following to your package.json:

```
"scripts": {
  "fructose-app": "react-native start --root .fructose --resetCache",
  "compile-components": "rnstl --searchDir ./ --pattern '**/*.fructose.js' --outputFile ./.fructose/components.js",
  "write-test-components": "npm run compile-components  && compile-tests"
}
```

## Writing tests

Your test files should include the platform and be named to match this glob: `*.fructose.test.js`.

For further information you can refer to `packages/e2eTests/example`.

The first interesting thing to note here is the 'withComponent' function. This function has two purposes.

When run in the context of the application, it loads up the component (first argument) into the app.

When run in the context of the tests, it sends a message to the app to load up the component.

The second and third arguments are only used in the context of the tests. The second argument is simply a description that you might put into a 'describe' block, the third is a function that contains your tests. At the moment the tests need to be written in a test framework that supports the functions `beforeAll`,`afterAll`, `beforeEach`, `afterEach`, `describe`.

## Notes 

We have currently tried the above using Jest as the test runner.
[Detox] is being used as the driver for IOS
Chromeless is being used as the web driver


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
