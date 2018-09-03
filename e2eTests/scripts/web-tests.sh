# ./node_modules/.bin/webpack --config e2eTests/fructose/vendor.webpack.config.js
./node_modules/.bin/rnscl --searchDir ./e2eTests/ --pattern 'example/*.showcase.js' --outputFile e2eTests/fructose/components.js
node "./packages/web/bin/start" --build-dir dist/public -d $(pwd)/e2eTests/fructose &
WEB_PID=$!
./node_modules/.bin/jest ./e2eTests/example/web.test.js --verbose --forceExit
# TESTS_EXIT_CODE=$?
# kill -9 $WEB_PID
# exit $TESTS_EXIT_CODE