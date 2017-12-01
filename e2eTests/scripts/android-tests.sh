#!/bin/bash
npx appium &
APPIUM_PID=$!
LOCAL=true npx fructose-tunnel
emulator @fructose-device -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723
react-native start --root fructose --resetCache --config=../../../../rn-cli.config.js &
react-native run-android --no-packager
npm run write-android-components 
jest fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./fructose/setup.android.js --forceExit
kill -9 $EMU_PID
kill -9 $APPIUM_PID