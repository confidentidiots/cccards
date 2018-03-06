#!/usr/bin/env bash
TS="$(date "+%Y-%m-%dT%H:%M:%S")"
perl -pi -e 's#<version>.*</version>#<version>'$TS'</version>#g' docs/index.html
