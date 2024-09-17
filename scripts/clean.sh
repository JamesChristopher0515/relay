#!/bin/bash

rm -fr node_modules "${TMPDIR}/metro-cache" && yarn cache clean && watchman watch-del-all