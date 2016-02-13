package helpers 

import "log"

func ErrorLog(location string, details string){
	log.Printf("\x1B[34;1m[%s]\x1B[0m - %s \n", location, details)
}