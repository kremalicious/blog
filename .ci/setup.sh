#!/usr/bin/env bash

set -e;

echo "$(tput setaf 136)"
echo "         Installing dependencies "
echo "============================================="
echo "$(tput sgr0)" # reset

npm install gulp bower -g
npm install
bower install
bundle install

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "      ✓ done installing dependencies"
echo "$(tput sgr0)" # reset
