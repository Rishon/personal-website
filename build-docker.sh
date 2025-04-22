#!/bin/bash

# Copy all contents from .gitignore to .dockerignore
cat .gitignore | grep -v '^#' | grep -v '^$' > .dockerignore

# Build the Docker image
docker build -t personal-website .
