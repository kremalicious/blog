#!/usr/bin/env bash

if [ $TRAVIS_BRANCH == "master" ]; then
    gulp build --production
else
    gulp build
fi;

exit;
