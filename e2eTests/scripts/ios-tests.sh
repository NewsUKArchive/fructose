#!/bin/bash
xcrun simctl boot 'iPhone 7'
./node_modules/.bin/rnstl --searchDir ./ --pattern 'example/ios.fructose.js' --outputFile ./fructose/components.js
./node_modules/.bin/compile-tests -d fructose
./node_modules/.bin/react-native start --root fructose --resetCache &
./node_modules/.bin/react-native run-ios --no-packager
LOGLEVEL=verbose ./node_modules/.bin/jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.native.js --forceExit
