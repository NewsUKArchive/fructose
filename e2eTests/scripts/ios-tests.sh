#!/bin/bash
LOCAL=true npx fructose-tunnel
react-native run-ios --no-packager
npm run write-ios-components 
jest .fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./.fructose/setup.ios.js --forceExit
