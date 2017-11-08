#!/bin/bash
npx fructose-tunnel &
npm run write-android-components 
pushd android
./gradlew clean
./gradlew assembleRelease
popd
curl -u $SAUCE_USERNAME:$SAUCE_KEY\
    -X POST \
    -H "Content-Type: application/octet-stream"\
    https://saucelabs.com/rest/v1/storage/tnlweb/fructose-e2e.apk?overwrite=true\
    --data-binary @${PWD}/android/app/build/outputs/apk/app-release.apk

jest .fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./.fructose/setup.android.sauce.js --forceExit
