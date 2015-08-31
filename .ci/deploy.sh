#!/usr/bin/env bash

set -e;

echo "$(tput setaf 136)"
echo "           Starting assets CDN "
echo "============================================="
echo "$(tput sgr0)" # reset

gulp s3:assets
gulp cdn

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "           ✓ done assets CDN"
echo "$(tput sgr0)" # reset


echo "$(tput setaf 136)"
echo "         Starting rsync deployment "
echo "============================================="
echo "$(tput sgr0)" # reset

# prevent interactive prompt
ssh-keyscan -H $DEPLOY_HOST >> ~/.ssh/known_hosts

rsync --recursive --delete --delete-excluded --checksum --verbose -e "ssh" $TRAVIS_BUILD_DIR/_site/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "         ✓ done rsync deployment "
echo "$(tput sgr0)" # reset
