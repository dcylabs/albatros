# Changelog 

## [0.5.1]
* Updated google play link 
* Added about page 
* Added donate button 

## [0.5.0]
* Moved to JSON config file to ENV vars configuration
* Improved security by using BCrypt instead of plain text passwords 
* Improved logs readability
* Added tool to quickly encrypt your passwords
* Added some waiting alerts for long processes like stopping a container 
* Added test.sh in build dir for quick tests
* Cleaned go code 

## [0.4.2]
* Fixed Log headers 
* Improved readability for laptops

## [0.4.1]
* Fixed tab usage and terminal bell in websocket console

## [0.4.0]
* Added error handling to remove logs 
* Fixed panics
* Fixed big error logs generation
* Fixed memory leaks
* Fixed console websocket handling
* Fixed loading animation loop 

## [0.3.0]
* Added link to Android app
* Added default config.json for demo/quick install
* Added sessionTime >= 60 seconds
* Fixed controller destroy
* Fixed full logs view
* Fixed build scripts
* Removed docker logs headers

## [0.2.2]
* Embedded ca-certificates.crt
* Fixed Firefox css issue
* Removed residual console.log

## [0.2.1]
* Improved live console to handle ctrl+key, tab, etc
* Fixed websocket detection for Firefox 
* Removed residual console.log

## [0.2.0]
* Cleaned code
* Solved top overflow on laptop screens
* Improved stability 
* Improved UI
* Improved logs readability 
* Minimized image size 
* Added container creation 
* Added image pull from hub

## [0.1.0]
First version 
* container list, search, view, start, stop, pause, remove 
* image list, search, view, remove, view on the hub
