LOCAL=true npx fructose-tunnel
./node_modules/.bin/webpack --config fructose/vendor.webpack.config.js
./node_modules/.bin/rnstl --searchDir ./ --pattern 'example/web.fructose.js' --outputFile ./fructose/components.js
./node_modules/.bin/compile-tests -d fructose
./node_modules/.bin/fructose-web --build-dir dist/public -d fructose &
WEB_PID=$!
./node_modules/.bin/jest fructose/components.test.js  --setupTestFrameworkScriptFile ./fructose/setup.web.js --verbose --forceExit
kill -9 $WEB_PID