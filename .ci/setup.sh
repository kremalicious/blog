#!/usr/bin/env bash

set -e;

npm install gulp bower -g
npm install
bower install
bundle install
