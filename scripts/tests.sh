#!/bin/bash

lerna bootstrap --npm-client=yarn --concurrency=1

if lerna run test; then
  echo "UNIT/INTEGRATION TESTS PASSED"
else
  echo "UNIT/INTEGRATION TESTS FAILED"
  cd ../..
  exit 1
fi

cd packages/e2eTests 
rm -rf node_modules
yarn
yarn start &
if  npm t ; then
  echo "E2E TESTS PASSED"
else
  echo "E2E TESTS FAILED"
  cd ../..
  exit 1
fi
