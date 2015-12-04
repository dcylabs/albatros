FROM scratch
MAINTAINER Dcylabs <dcylabs@gmail.com>
COPY ./dist/albatros-server /var/albatros/albatros-server 
COPY ./dist/ui /var/albatros/ui  
WORKDIR /var/albatros 
ENTRYPOINT ["/var/albatros/albatros-server"]