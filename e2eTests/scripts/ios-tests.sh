#!/bin/bash
LOCAL=true npx fructose-tunnel
react-native start --root fructose --resetCache &
react-native run-ios --no-packager
yarn write-ios-components 
LOGLEVEL=verbose npx jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.native.js --forceExit
