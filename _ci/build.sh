#!/usr/bin/env bash

if [ $CI_BRANCH == "master" ]; then
    gulp build --production
else
    gulp build
fi;

exit;
