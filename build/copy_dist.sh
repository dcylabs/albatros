#!/bin/bash
mkdir -p /var/albatros/dist/ui
cp /var/albatros/albatros-server /var/albatros/dist/albatros-server
cp -r /var/albatros/ui/build /var/albatros/dist/ui/build
cp /etc/ssl/certs/ca-certificates.crt /var/albatros/dist/ca-certificates.crt