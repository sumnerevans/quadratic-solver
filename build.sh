#!/bin/sh

set -e

echo ""
echo "========== Starting Build of Quadratic Solver =========="

echo ""
echo "===== Creating Builds Folder ====="
rm -rf builds
mkdir builds

echo ""
echo "===== Copying files to Builds Folder"
cp index.html script.js styles.css builds/

echo ""
echo "Build Complete!"
