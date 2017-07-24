#!/bin/bash

yarn --npm-client=yarn --concurrency=1

if  yarn test:test-helpers ; then
  echo "TEST HELPERS UNIT TESTS PASSED"
else
  echo "TEST HELPERS UNIT TESTS FAILED"
  cd ../..
  exit 1
fi

if  yarn test:jest ; then
  echo "UNIT TESTS PASSED"
else
  echo "UNIT TESTS FAILED"
  cd ../..
  exit 1
fi

cd e2eTests 
rm -rf node_modules
yarn
if  yarn test ; then
  echo "E2E TESTS PASSED"
else
  echo "E2E TESTS FAILED"
  cd ../..
  exit 1
fi