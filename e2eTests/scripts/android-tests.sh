#!/bin/bash
LOCAL=true npx fructose-tunnel
emulator @fructose_device -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
echo "writing android components"
./node_modules/.bin/rnstl --searchDir ./ --pattern 'example/android.fructose.js' --outputFile ./fructose/components.js
./node_modules/.bin/compile-tests -d fructose
./node_modules/.bin/react-native start --root fructose --resetCache &
BUNDLER_PID=$!
./node_modules/.bin/react-native run-android --no-packager
./node_modules/.bin/jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.native.js --forceExit
kill -9 $EMU_PID
kill -9 $BUNDLER_PID
