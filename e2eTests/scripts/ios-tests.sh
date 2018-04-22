#!/bin/bash
xcrun simctl boot 'iPhone 7'
./node_modules/.bin/rnstl --searchDir ./e2eTests/ --pattern 'example/ios.fructose.js' --outputFile e2eTests/fructose/components.js
node "./packages/test-helpers/bin/writeComponentsTests.js" -d e2eTests/fructose
./node_modules/.bin/react-native start --resetCache &
./node_modules/.bin/react-native run-ios --no-packager
LOGLEVEL=verbose node_modules/.bin/jest ./e2eTests/fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./e2eTests/fructose/setup.native.js --forceExit
