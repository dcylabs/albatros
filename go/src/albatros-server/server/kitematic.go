package server

import (
 	"io"
	"fmt"
 	"net/http"
	"albatros-server/helpers" 
)

// AuthHandler
type KitematicHandler struct {}

func (h KitematicHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
 	url := fmt.Sprintf("%s", r.URL)
	res, err := http.Get("http://kitematic.com"+url)
	if(err != nil){
		helpers.ErrorLog("KITEMATIC", fmt.Sprintf("Following error occured when trying to access %s : %s", url, err.Error()) )
		return;
	}
 	io.Copy(w, res.Body)
}