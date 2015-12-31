#!/bin/bash
cd .. 
rm -rf dist
mkdir dist 
cp build/config.json dist/config.json
docker build -f build/Dockerfile.build -t albatros-build .
docker run --privileged --rm -v $(pwd)/dist:/var/albatros/dist/ albatros-build
docker rmi albatros-build