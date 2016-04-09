# About
* [Functionalities](https://github.com/dcylabs/albatros/tree/master/doc/functionalities.md)
* [Changelog](https://github.com/dcylabs/albatros/tree/master/doc/changelog.md)
* [Contribute](https://github.com/dcylabs/albatros/tree/master/doc/contribute.md)

# Android app
Kind of an "android extension" of that WebUI which allow you to keep an eye on your servers wherever you are. 

[![Get it on Google Play](https://raw.githubusercontent.com/dcylabs/albatros/master/doc/images/en-play-badge-border.png)](https://play.google.com/store/apps/details?id=com.dcylabs.albatros)

# Quick run
Default username is `username` and default password is `password`
```
docker run -d \
 -v /var/run/docker.sock:/var/run/docker.sock:ro \
 -p "80:80" dcylabs/albatros
```

# Usages 
## Deployment 
### Docker 
```
docker run -d \
 -v /var/run/docker.sock:/var/run/docker.sock:ro \
 -v ~/key.pem:/var/albatros/key.pem:ro \
 -v ~/cert.pem:/var/albatros/cert.pem:ro \
 -e "USE_SSL=1" \
 -e "ACCOUNTS=username1:$2a$10$PYzPqiPVrB8GIouPtSXA2eNYBxdkpc5NfOjMU6NoZdswMItdEJ6G6;username2:$2a$10$PYzPqiPVrB8GIouPtSXA2eNYBxdkpc5NfOjMU6NoZdswMItdEJ6G6" \
 -p "80:80" -p "443:443" dcylabs/albatros
```
### docker-compose.yml 
```
albatros:
  image: dcylabs/albatros
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - ~/key.pem:/var/albatros/key.pem:ro
    - ~/cert.pem:/var/albatros/cert.pem:ro
  environment:
    - USE_SSL=1
    - ACCOUNTS=username1:$$2a$$10$$PYzPqiPVrB8GIouPtSXA2eNYBxdkpc5NfOjMU6NoZdswMItdEJ6G6;username2:$$2a$$10$$PYzPqiPVrB8GIouPtSXA2eNYBxdkpc5NfOjMU6NoZdswMItdEJ6G6
  ports:
    - "80:80"
    - "443:443"
```
Note: When using docker-compose, you will need to escape '$' character in environment variables as described in the [documentation](https://docs.docker.com/compose/compose-file/#variable-substitution)
## Configuration 
Since 0.5.0 configuration is done by setting environment variables

| Variable name 	| Default value																|
| ----------------- | ------------------------------------------------------------------------- |
| DOCKER_ENDPOINT	| '/var/run/docker.sock' 													| 
| APP_PATH			| '/var/albatros/ui/build' 													|
| SSL_KEY_PATH		| '/var/albatros/key.pem' 													|
| SSL_CERT_PATH		| '/var/albatros/cert.pem' 													|
| LISTEN_HTTP		| ':80' 																	|
| LISTEN_HTTPS		| ':443' 																	|
| USE_SSL			| '0' 																		|
| SESSION_TIME		| '600' 																	|
| SECRET			| 'thisisasecretreplaceit' 													|
| ACCOUNTS*			| 'username:$2a$10$PYzPqiPVrB8GIouPtSXA2eNYBxdkpc5NfOjMU6NoZdswMItdEJ6G6' 	|

```
ACCOUNTS: need to follow the pattern user_a:encrypted_pass;user_b:encrypted_pass
```
To encrypt your password you will need to use the following command line 
```
docker run --rm dcylabs/albatros encrypt passwordToEncrypt
```
Note: If you use it behind a http proxy like HAProxy you have to add the following option to your backend configuration 
```
option http-pretend-keepalive
```
