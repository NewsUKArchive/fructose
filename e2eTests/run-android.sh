#!/bin/bash
# ngrok http 7811 > /dev/null &
# export SERVER_URL=`curl -sb -H "Accept: application/json" http://127.0.0.1:4040/api/tunnels | jq '.tunnels | .[0] | .public_url'`
node ../packages/test-helpers/src/saveServerUrl.js

/Users/kourosaliabadi/Library/Android/sdk/tools/emulator @NEXUS_5X_API_22 -no-boot-anim &
EMU_PID=$!
adb wait-for-device

# SERVER_URL=${SERVER_URL} react-native run-android --variant=release
# react-native run-android --variant=release

kill -9 $(lsof -ti :8081)

appium &
APPIUM_PID=$!

npm run write-android-components
ANDROID=true jest .fructose/components.test.js --verbose --forceExit

kill -9 $APPIUM_PID
kill -9 $EMU_PID
killall ngrok
