FROM debian:jessie
MAINTAINER Dcylabs <dcylabs@gmail.com>

# Installing all build tools 
RUN apt-get update 
RUN apt-get install -y golang ruby curl nodejs-legacy npm git-core mercurial
RUN npm install -g bower grunt-cli
RUN gem install sass 

# Copying source files 
COPY ui /var/albatros/ui
COPY go /var/albatros/go

# Compiling UI
WORKDIR /var/albatros/ui 
RUN npm install 
RUN bower install --allow-root
RUN grunt build 

# Compiling Server
ENV GOPATH '/var/albatros/go'
RUN go get github.com/freehaha/token-auth/
RUN go get github.com/dgrijalva/jwt-go
RUN go get code.google.com/p/go.net/websocket
WORKDIR	/var/albatros/
# Compiling as a fully standalone executable (used for dist)
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -tags netgo albatros-server 

# Removing sources to save some space 
RUN rm -rf /var/albatros/ui/node_modules/
RUN rm -rf /var/albatros/ui/vendor/
RUN rm -rf /var/albatros/ui/src/
RUN rm -rf /var/albatros/go

RUN chmod +x /var/albatros/albatros-server 

WORKDIR /var/albatros 
ENTRYPOINT ["/var/albatros/albatros-server"]
