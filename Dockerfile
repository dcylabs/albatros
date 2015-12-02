FROM debian:jessie
MAINTAINER Dcylabs <dcylabs@gmail.com>

RUN apt-get update 
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y golang ruby curl nodejs-legacy npm git-core mercurial
RUN npm install -g bower grunt-cli
RUN gem install sass 
COPY ui /var/albatros/ui
COPY go /var/albatros/go

ENV GOPATH '/var/albatros/go'
RUN go get github.com/freehaha/token-auth/
RUN go get github.com/dgrijalva/jwt-go
RUN go get code.google.com/p/go.net/websocket

WORKDIR	/var/albatros/
RUN go build -tags netgo albatros-server 

WORKDIR /var/albatros/ui 
RUN npm install 
RUN bower install --allow-root
RUN grunt build 

WORKDIR /var/albatros
RUN chmod +x /var/albatros/albatros-server 

RUN rm -rf /var/albatros/ui/node_modules/
RUN rm -rf /var/albatros/ui/vendor/
RUN rm -rf /var/albatros/ui/src/
RUN rm -rf /var/albatros/go

CMD ["/var/albatros/albatros-server"]