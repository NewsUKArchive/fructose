#!/bin/bash
npx fructose-tunnel &
npm run write-android-components 
pushd android
./gradlew clean
./gradlew assembleRelease
popd
curl -u tnlweb:32571499-872a-4f5f-8b22-5dd1c2184049\
    -X POST \
    -H "Content-Type: application/octet-stream"\
    https://saucelabs.com/rest/v1/storage/tnlweb/fructose-e2e.apk?overwrite=true\
    --data-binary @${PWD}/android/app/build/outputs/apk/app-release.apk

jest .fructose/components.test.js --verbose --setupTestFrameworkScriptFile ./.fructose/setup.android.sauce.js --forceExit
