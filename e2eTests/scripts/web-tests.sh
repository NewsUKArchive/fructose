LOCAL=true npx fructose-tunnel
yarn web:build:vendor-dev
npm run write-web-components
npm run web &
WEB_PID=$!
jest .fructose/components.test.js  --setupTestFrameworkScriptFile ./.fructose/setup.web.js --verbose --forceExit
