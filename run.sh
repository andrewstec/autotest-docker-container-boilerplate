#!/bin/sh

printf 'run.sh::STARTING GRADING PROCESS... '
printf `NODE_TLS_REJECT_UNAUTHORIZED='0' node build/controllers/GradingController`
NODE_TLS_REJECT_UNAUTHORIZED='0' node ./build/controllers/GradingController > /output/stdio.txt 2>&1
