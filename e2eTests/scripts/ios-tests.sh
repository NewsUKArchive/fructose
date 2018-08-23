#!/bin/bash
xcrun simctl boot 'iPhone 7'
export IPHONE=$!
./node_modules/.bin/rnscl --searchDir ./e2eTests/ --pattern 'example/component.showcase.js' --outputFile e2eTests/fructose/components.js
./node_modules/.bin/react-native start --resetCache &
export PACKAGER=$!
./node_modules/.bin/react-native run-ios --no-packager
LOGLEVEL=verbose node_modules/.bin/jest ./e2eTests/example/ios.test.js --verbose --forceExit

kill $IPHONE
kill $PACKAGER