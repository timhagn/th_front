#!/usr/bin/env bash
# Script to "fix" NODE_VERSION..." errors for the moment

# First remove cached versions
echo "Removing cached files..."
rm -rf node_modules
rm -rf .cache
rm -rf public
# Now copy backuped dependency lists and lock file
echo "Copying old conf & lock files..."
cp ./fix/package.json .
cp ./fix/yarn.lock .
# Run yarn (install) in main and build styled-media-query
echo "Running yarn & building styled-media-query..."
yarn
cd ./node_modules/styled-media-query/
yarn
yarn build
# Copy gatsby-source-drupal from gatsby repo.
echo "Fetching gatsby-source-drupal from gatsby repo..."
gatsby-dev -s --packages gatsby-source-drupal
# Now restore sharp.node
echo "Finally restoring sharp.node..."
cd ../..
cp ./fix/sharp.node ./node_modules/sharp/build/Release/sharp.node