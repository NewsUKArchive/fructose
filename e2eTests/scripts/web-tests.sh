LOCAL=true npx fructose-tunnel
yarn web:build:vendor-dev
yarn write-web-components
yarn web &
WEB_PID=$!
jest fructose/components.test.js  --setupTestFrameworkScriptFile ./fructose/setup.web.js --verbose --forceExit
