package server

import (
 	"net/http"
 	"io"
	"fmt"
)

// AuthHandler
type KitematicHandler struct {}

func (h KitematicHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
 	url := fmt.Sprintf("%s", r.URL)
	res, _ := http.Get("http://kitematic.com"+url)
 	io.Copy(w, res.Body)
}

