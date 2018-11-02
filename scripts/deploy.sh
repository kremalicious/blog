#!/usr/bin/env bash
#
# required environment variables:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
AWS_S3_BUCKET="kremalicious.com"
AWS_S3_BUCKET_BETA="beta.kremalicious.com"
#
set -e;

function s3sync {
  aws s3 sync ./public s3://"$1" --exclude "*.html" --exclude "*.xml" --cache-control max-age=31536000,public,immutable --delete --acl public-read

  aws s3 sync ./public s3://"$1" --exclude "*" --include "*.html" --include "*.xml" --cache-control max-age=0,no-cache,no-store,must-revalidate --delete --acl public-read
}

##
## check for pull request against master
##
if [ "$TRAVIS_PULL_REQUEST" != "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  s3sync $AWS_S3_BUCKET_BETA

##
## check for master push which is no pull request
##
elif [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] || [ "$TRAVIS" != true ]; then

  s3sync $AWS_S3_BUCKET

  echo "---------------------------------------------"
  echo "         ✓ done deployment "
  echo "---------------------------------------------"

  exit;

else

  echo "---------------------------------------------"
  echo "          nothing to deploy "
  echo "---------------------------------------------"

fi
