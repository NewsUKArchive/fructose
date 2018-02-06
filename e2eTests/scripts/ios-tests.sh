#!/bin/bash
LOCAL=true npx fructose-tunnel
react-native start --root fructose --resetCache --config=rn-cli.config.js &
react-native run-ios --no-packager
yarn write-ios-components 
LOGLEVEL=verbose npx jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.ios.js --forceExit
