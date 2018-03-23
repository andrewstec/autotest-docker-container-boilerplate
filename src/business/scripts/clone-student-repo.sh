#!/usr/bin/env bash

# OVERVIEW: Clones and Grades a Student Repository

set -o errexit  # exit on command failure
set -o pipefail # exit if any command in pipeline fails
set -o nounset  # exit if undeclared variable is used

studentRepo=${1}
studentRepoDir=${2}

printf '#1. DELETING STUDENT REPO IF ALREADY EXISTS'
printf `rm -rf "${studentRepoDir}"`
rm -rf "${studentRepoDir}"

printf '#2. CLONING STUDENT REPO'
printf `git clone "${studentRepo}" ${studentRepoDir}`
git clone "${studentRepo}" "${studentRepoDir}"
