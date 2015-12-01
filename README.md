# Usages 
## Deployment 
### Docker 
```
docker run -d \
 -v /var/run/docker.sock:/var/run/docker.sock:ro \
 -v ~/config.json:/var/albatros/config.json:ro \
 -v ~/key.pem:/var/albatros/key.pem:ro \
 -v ~/cert.pem:/var/albatros/cert.pem:ro \
 -p "80:80" -p "443:443" dcylabs/albatros
```
### docker-compose.yml 
```
albatros:
  image: dcylabs/albatros
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - ~/config.json:/var/albatros/config.json:ro
    - ~/key.pem:/var/albatros/key.pem:ro
    - ~/cert.pem:/var/albatros/cert.pem:ro
  ports:
    - "80:80"
    - "443:443"
```
## Configuration 
You can easily configure with the *config.json*
```
{
	"DockerEndpoint": "/var/run/docker.sock",
	"ListenHTTP"	: ":80",
	"ListenHTTPS"	: ":443",
	"SSLKeyPath"	: "/var/albatros/key.pem",
	"SSLCertPath"	: "/var/albatros/cert.pem",
	"AppPath"		: "/var/albatros/ui/build",
	"Secret"		: "thisisasecretreplaceit",
	"SessionTime"	: 600,
	"Accounts"		: [
		{
			"Username"	: "username",
			"Password"	: "password"
		}
	]
}

```
# Roadmap
## Referenced bugs
 - [All] Cleaning code
 - [Container/Details] Container top overflow on laptop screens

## Improving UI/UX
The UI/UX is not in its final state, all recommendations are welcome ! :) 

## Android 
When the image will be stable enough. We will develop an android app to manage your containers through your mobile 