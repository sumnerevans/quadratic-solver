#!/bin/sh

set -e

./build.sh

echo ""
echo "========== Deploying to the-evans.family/sumner =========="
ssh tef "mkdir -p /home/evansfamilywebsite/the-evans.family/sumner/quadratic-solver"
scp -r builds/* tef:/home/evansfamilywebsite/the-evans.family/sumner/quadratic-solver
echo ""
echo "Deploy Successful!"

