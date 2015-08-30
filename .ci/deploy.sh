#!/usr/bin/env bash

set -e;

gulp s3:assets

gulp cdn

rsync --recursive --delete --delete-excluded --checksum --verbose -e "ssh" $TRAVIS_BUILD_DIR/_site/ kremalicious.com@ftp.kremalicious.com:/nfs/c08/h04/mnt/126308/domains/kremalicious.com/html/
