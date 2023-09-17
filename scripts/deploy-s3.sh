#!/usr/bin/env bash
#
# required environment variables:
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
AWS_S3_BUCKET="kremalicious.com"
SITEMAP_URL="https%3A%2F%2Fkremalicious.com%2Fsitemap-index.xml"

#
set -e;

function s3sync {
  aws s3 sync ./dist s3://"$1" \
    --include "*" \
    --exclude "*.html" \
    --exclude "*.zip" \
    --exclude "sw.js" \
    --exclude "*.json" \
    --exclude "*.txt" \
    --cache-control public,max-age=31536000,immutable \
    --delete \
    --acl public-read

  aws s3 sync ./dist s3://"$1" \
    --exclude "*" \
    --include "*.html" \
    --include "*.zip" \
    --include "sw.js" \
    --include "*.xml" \
    --include "*.json" \
    --include "*.txt" \
    --cache-control public,max-age=0,must-revalidate \
    --delete \
    --acl public-read
}

s3sync $AWS_S3_BUCKET

# ping search engines
# returns: HTTP_STATUSCODE URL
curl -sL -w "%{http_code} %{url_effective}\\n" \
  "http://www.google.com/webmasters/tools/ping?sitemap=$SITEMAP_URL" -o /dev/null \
  "http://www.bing.com/webmaster/ping.aspx?siteMap=$SITEMAP_URL" -o /dev/null