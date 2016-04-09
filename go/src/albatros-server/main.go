package main 

import(
	"os"
	"fmt"
	"log"
	"net/http"
	"golang.org/x/crypto/bcrypt"
	"albatros-server/server"
	"albatros-server/configuration"
	"albatros-server/helpers" 
)

func main(){
	args := os.Args
	if(len(args) > 1){
		switch(args[1]){
			case "encrypt":
				if(len(args) < 3){
					helpers.ErrorLog("ENCRYPT", "You need to provide at least 2 arguments" )
				}else{
					password := []byte(args[2])
					hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
					if(err != nil){
						helpers.ErrorLog("ENCRYPT", fmt.Sprintf("Following error occured when trying to encrypt password : %s", err.Error()) )
					}
					fmt.Println(string(hashedPassword))
				}
			default:
				break;
		}
		return;
	}

	var config configuration.Configuration

	config.Load()
	config.Log()

	handler := server.CreateHandlers(config)

	if(config.UseSSL){
		// Encapsulated in subroutine to listen both HTTP and HTTPs
		go func(){ log.Println(http.ListenAndServeTLS(config.ListenHTTPS, config.SSLCertPath, config.SSLKeyPath, handler)) }()
	}
	log.Println(http.ListenAndServe(config.ListenHTTP, handler))

}