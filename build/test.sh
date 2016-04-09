#!/bin/bash
cd ..
docker build -t test-albatros . 
docker run --rm --name test-albatros -v /var/run/docker.sock:/var/run/docker.sock:ro -p 80:80 test-albatros