#!/bin/bash
LOCAL=true npx fructose-tunnel
react-native start --root fructose --resetCache --config=rn-cli.config.js &
react-native run-ios --no-packager
npm run write-ios-components 
LOGLEVEL=verbose jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.ios.js --forceExit
