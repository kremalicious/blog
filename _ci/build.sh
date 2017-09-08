#!/usr/bin/env bash

npm test

if [ $TRAVIS_BRANCH == "master" ]; then
    gulp build --production
else
    gulp build
fi;

exit;
