#!/usr/bin/env bash

set -e;

echo "$(tput setaf 136)"
echo "         Installing dependencies "
echo "============================================="
echo "$(tput sgr0)" # reset

npm install gulpjs/gulp.git#4.0 -g
npm install

# Travis does that automatically after selecting ruby
#bundle install

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "      ✓ done installing dependencies"
echo "$(tput sgr0)" # reset
