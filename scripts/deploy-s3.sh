#!/usr/bin/env bash
#
# required environment variables:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
AWS_S3_BUCKET="kremalicious.com"

#
set -e;

function s3sync {
  aws s3 sync ./dist s3://"$1" \
    --include "*" \
    --exclude "*.html" \
    --exclude "*.zip" \
    --exclude "sw.js" \
    --exclude "*.xml" \
    --exclude "*.json" \
    --exclude "*.txt" \
    --exclude "favicon.ico" \
    --cache-control public,max-age=31536000,immutable \
    --delete \
    --acl public-read \
    --only-show-errors \
    --size-only &

  aws s3 sync ./dist s3://"$1" \
    --exclude "*" \
    --include "*.html" \
    --include "*.zip" \
    --include "sw.js" \
    --include "*.xml" \
    --include "*.json" \
    --include "*.txt" \
    --include "favicon.ico" \
    --cache-control public,max-age=0,must-revalidate \
    --delete \
    --acl public-read \
    --only-show-errors &
  wait
}

s3sync $AWS_S3_BUCKET
