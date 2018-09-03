./node_modules/.bin/rnscl --searchDir ./e2eTests/ --pattern 'example/*.showcase.js' --outputFile e2eTests/fructose/components.js
node "./packages/web/bin/start" --build-dir $(pwd)/e2eTests/fructose &
WEB_PID=$!
./node_modules/.bin/jest ./e2eTests/example/web.test.js --verbose --forceExit
TESTS_EXIT_CODE=$?
kill -9 $WEB_PID
exit $TESTS_EXIT_CODE