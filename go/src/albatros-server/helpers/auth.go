package helpers

import (
	"fmt"
	"strings"
	"net/http"
	"encoding/json"
)
 
type AlbatrosAuthGetter struct{
	Parameter string 
}

func (a *AlbatrosAuthGetter) GetTokenFromRequest(req *http.Request) string {
	if(IsWebsocket(req)){
		authStr := req.URL.Query().Get(a.Parameter)		
		if !strings.HasPrefix(authStr, "Bearer "){
			return authStr
		}		
		return authStr[7:]
	}else{
		authStr := req.Header.Get("Authorization")
		if !strings.HasPrefix(authStr, "Bearer "){
			return "" 
		}
		return authStr[7:]
	}
}

func UnauthorizedHandler(w http.ResponseWriter, r *http.Request) {
	var data struct{Error string}
	data.Error = fmt.Sprintf("%s", "Unauthorized")
	response, _ := json.Marshal(data)
	fmt.Fprintf(w, "%s", response)		
}