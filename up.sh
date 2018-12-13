#!/usr/bin/env bash
# Script to "fix" NODE_VERSION..." errors for the moment

# First remove cached versions

if [[ -n "$1" ]]; then
    echo "Removing cached files..."
    rm -rf node_modules
    rm -rf .cache
    rm -rf public
fi

# Run yarn (install) in main and build styled-media-query
echo "Running yarn & building styled-media-query..."
yarn
cd ./node_modules/styled-media-query/
yarn
yarn build

# Copy gatsby-source-drupal from gatsby repo.
# echo "Fetching gatsby-source-drupal from gatsby repo..."
# gatsby-dev -s --packages gatsby-source-drupal
