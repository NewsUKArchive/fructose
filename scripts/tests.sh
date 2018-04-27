#!/bin/bash

yarn --npm-client=yarn --concurrency=1

if  yarn test:unit ; then
  echo "UNIT TESTS PASSED"
else
  echo "UNIT TESTS FAILED"
  exit 1
fi

if  yarn e2e:test:web ; then
  echo "WEB TESTS PASSED"
else
  echo "WEB TESTS FAILED"
  exit 1
fi

if  yarn e2e:test:ios ; then
  echo "IOS TESTS PASSED"
else
  echo "IOS TESTS FAILED"
  exit 1
fi
