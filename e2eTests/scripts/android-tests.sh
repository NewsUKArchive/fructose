#!/bin/bash
LOCAL=true node "./packages/test-helpers/bin/createTunnel.js" 
emulator @Nexus_5X_API_25 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
echo "writing android components"
./node_modules/.bin/rnstl --searchDir ./e2eTests/ --pattern 'example/android.fructose.js' --outputFile e2eTests/fructose/components.js
node "./packages/test-helpers/bin/writeComponentsTests.js" -d e2eTests/fructose
./node_modules/.bin/react-native start --resetCache &
BUNDLER_PID=$!
./node_modules/.bin/react-native run-android --no-packager
LOGLEVEL=verbose node_modules/.bin/jest ./e2eTests/fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./e2eTests/fructose/setup.native.js --forceExit
kill -9 $EMU_PID
kill -9 $BUNDLER_PID

