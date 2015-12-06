package server

import (
	"fmt"
	"net/http"
	"github.com/freehaha/token-auth/jwt"
	"albatros-server/config"
	"albatros-server/model"
	"encoding/json"
)

// AuthHandler
type AuthHandler struct {
	jwtStorage jwtstore.JwtStore
	settings config.Settings
}
func (h AuthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
	if(r.Method == "POST"){
		
		decoder := json.NewDecoder(r.Body)
		var reqData  struct{
			Username string 
			Password string 
		}
		decoder.Decode(&reqData)

		valid, user := h.validate(reqData.Username, reqData.Password)
		if(valid){

			token := h.jwtStorage.NewToken("")
			token.SetClaim("id", user.Username)

			var data struct{
				Token string
				Expire int
			}
			data.Token = fmt.Sprintf("%s", token)
			data.Expire = h.settings.SessionTime

			response, _ := json.Marshal(data)
			fmt.Fprintf(w, "%s", response)	

		}else{
			var data struct{Error string}
			data.Error = fmt.Sprintf("%s", "Please provide a valid username and password")
			response, _ := json.Marshal(data)
			fmt.Fprintf(w, "%s", response)	
		}
	}else{
		var data struct{Error string}
		data.Error = fmt.Sprintf("%s", "Unauthorized method")
		response, _ := json.Marshal(data)
		fmt.Fprintf(w, "%s", response)	
	}
	
	
}
func (h AuthHandler) validate(username string, password string) (bool, *model.User ) {
	if(username != "" && password != ""){
		for _, user := range h.settings.Accounts{
			if(username == user.Username && password == user.Password){
				return true, &user
			}
		}
	}
	return false, nil
}




