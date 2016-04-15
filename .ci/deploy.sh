#!/usr/bin/env bash

set -e;

echo "$(tput setaf 136)"
echo "         Starting S3 deployment "
echo "============================================="
echo "$(tput sgr0)" # reset

gulp deploy

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "         ✓ done rsync deployment "
echo "$(tput sgr0)" # reset
