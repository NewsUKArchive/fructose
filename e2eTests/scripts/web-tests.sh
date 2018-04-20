./node_modules/.bin/webpack --config e2eTests/fructose/vendor.webpack.config.js
./node_modules/.bin/rnstl --searchDir ./e2eTests --pattern 'example/web.fructose.js' --outputFile ./e2eTests/fructose/components.js
node "./packages/test-helpers/bin/writeComponentsTests.js" -d e2eTests/fructose
node "./packages/web/bin/start.js" --build-dir dist/public -d $(pwd)/e2eTests/fructose &
WEB_PID=$!
./node_modules/.bin/jest ./e2eTests/fructose/components.test.js  --setupTestFrameworkScriptFile ./e2eTests/fructose/setup.web.js --verbose --forceExit
TESTS_EXIT_CODE=$?
kill -9 $WEB_PID
exit $TESTS_EXIT_CODE