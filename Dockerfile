FROM scratch
MAINTAINER Dcylabs <dcylabs@gmail.com>
COPY ./dist/albatros-server /var/albatros/albatros-server 
COPY ./dist/config.json /var/albatros/config.json 
COPY ./dist/ui /var/albatros/ui  
COPY ./dist/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
WORKDIR /var/albatros 
ENTRYPOINT ["/var/albatros/albatros-server"]
