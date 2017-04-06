#!/usr/bin/env bash

set -e;

echo "$(tput setaf 136)"
echo "         Starting S3 deployment "
echo "============================================="
echo "$(tput sgr0)" # reset

gulp deploy

gulp seo

echo "$(tput setaf 64)" # green
echo "---------------------------------------------"
echo "         ✓ done S3 deployment "
echo "$(tput sgr0)" # reset
