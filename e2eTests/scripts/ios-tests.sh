#!/bin/bash
# xcrun simctl boot 'iPhone 7'
# LOCAL=true npx fructose-tunnel
yarn write-ios-components 
# react-native start --root fructose --resetCache &
# react-native run-ios --no-packager
LOGLEVEL=verbose npx jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.native.js --forceExit
