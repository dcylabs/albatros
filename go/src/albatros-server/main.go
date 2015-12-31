package main 

import(
	"flag"
	"net/http"
	"os"
	"encoding/json"
	"albatros-server/server"
	"albatros-server/config"
	//"code.google.com/p/go.net/websocket"
)





func main(){
	var settings config.Settings
	var configFilePath string

	flag.StringVar(&configFilePath, "c", "./config.json", "JSON Config File")
	flag.Parse()

	configFile, _ := os.Open(configFilePath)
	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(&settings)

	// Force session to be at least a minute
	if(settings.SessionTime < 60){
		settings.SessionTime = 60
	}

	handler := server.CreateHandlers(settings)
	
	// Encapsulated in subroutine to listen both HTTP and HTTPs
	go func(){ http.ListenAndServeTLS(settings.ListenHTTPS, settings.SSLCertPath, settings.SSLKeyPath, handler) }()
	http.ListenAndServe(settings.ListenHTTP, handler)
	
}