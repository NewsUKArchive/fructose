#!/bin/bash

lerna bootstrap --npm-client=yarn --concurrency=1

cd packages

if cd client && npm t ; then
  echo "CLIENT TESTS PASSED"
else
  echo "CLIENT TESTS FAILED"
  cd ../..
  exit 1
fi

if cd ../server && npm t ; then
  echo "SERVER TESTS PASSED"
else
  echo "SERVER TESTS FAILED"
  cd ../..
  exit 1
fi

if cd ../app && npm t ; then
  echo "APP TESTS PASSED"
else
  echo "APP TESTS FAILED"
  cd ../..
  exit 1
fi

cd ../e2eTests 
rm -rf node_modules
yarn
npm start &
if  npm t ; then
  echo "E2E TESTS PASSED"
else
  echo "E2E TESTS FAILED"
  cd ../..
  exit 1
fi
