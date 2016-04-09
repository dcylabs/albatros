# Contribute 

## Develop 
* Pull the repository 
* Execute (0.1.0 is not a misspelling, we use it because it is the only tag that is not minimized)

```
docker run -ti --rm \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v $(pwd)/go/src/albatros-server:/var/albatros/go/src/albatros-server:ro \
    -v $(pwd)/ui/src:/var/albatros/ui/src:ro \
    -v $(pwd)/ui/Gruntfile.js:/var/albatros/ui/Gruntfile.js:ro \
    -v $(pwd)/ui/bower.json:/var/albatros/ui/bower.json \
    -v $(pwd)/ui/package.json:/var/albatros/ui/package.json \
    -p "80:80" dcylabs/albatros:0.1.0 /bin/bash
```

* Start the server in background 

```
go get golang.org/x/net/websocket
go get github.com/caarlos0/env
go get golang.org/x/crypto/bcrypt
go build albatros-server
./albatros-server &2> /dev/null
```

* Go to the `ui` directory and run 

```
npm install 
bower install --allow-root
grunt watch 
```

## Build a minified image 
* go to the `build` path
* run `sh build.sh`
* go back to the root directory and run `docker build -t albatros-min .`
