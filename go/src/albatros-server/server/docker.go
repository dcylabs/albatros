package server

import (
	"io"
	"fmt"
	"net"
	"sync"
	"net/http"
	"net/http/httputil"
	"golang.org/x/net/websocket"
	"albatros-server/helpers" 
)

// DockerHandler 
type DockerHandler struct {
	dockerEndpoint string
}

func (h DockerHandler) GetWebSocket(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	client, err := net.Dial("unix", h.dockerEndpoint)		
	if(err != nil){
		helpers.ErrorLog("DOCKER", fmt.Sprintf("Following error occured when trying to make request to Docker endpoint %s : %s", h.dockerEndpoint, err.Error()) )
		return nil, err;
	}			
	config := &websocket.Config{}
	config.Version = websocket.ProtocolVersionHybi13
	config.Location = r.URL
	config.Origin = r.URL
	config.Header = r.Header
	return websocket.NewClient(config, client)
}

func (h DockerHandler) HandleHTTP(w http.ResponseWriter, r *http.Request){
	conn, err := net.Dial("unix", h.dockerEndpoint)		
	if(err != nil){
		helpers.ErrorLog("DOCKER", fmt.Sprintf("Following error occured when trying to connect Docker endpoint %s : %s", h.dockerEndpoint, err.Error()) )
		return;
	}	

	// Creating a socket client 
	clientConn := httputil.NewClientConn(conn, nil)

	// Forwarding request to client 
	resp, err := clientConn.Do(r)
	if(err != nil){
		helpers.ErrorLog("DOCKER", fmt.Sprintf("Following error occured when trying to make request to Docker endpoint %s : %s", h.dockerEndpoint, err.Error()) )
		return;
	}		

	for kA, vA := range resp.Header{
		for _, vB := range vA{
			w.Header().Add(kA,vB)
		}
	}

	io.Copy(w, resp.Body)

	resp.Body.Close()
	clientConn.Close()
	conn.Close()
}

func (h DockerHandler) HandleWebSocket(w http.ResponseWriter, r *http.Request){
	dockerConn, err := h.GetWebSocket(w,r)

	if(err != nil){
		helpers.ErrorLog("DOCKER", fmt.Sprintf("Following error occured when trying to access Docker websocket %s : %s", r.URL, err.Error()) )
		return;
	} else {	
		websocket.Handler(func(ws *websocket.Conn){

			var wg sync.WaitGroup
			wg.Add(2)

			// From docker to client 
			go func(){ 
				io.Copy(ws, dockerConn) 	
				dockerConn.Close()		
				ws.Close()
				wg.Done()
			}() 

			// From client to docker 
			go func(){ 
				io.Copy(dockerConn, ws) 
				dockerConn.Close()		
				ws.Close()
				wg.Done()
			}() 		

			wg.Wait()

		}).ServeHTTP(w,r)
	}
}

func (h DockerHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
	if(helpers.IsWebsocket(r)){
		h.HandleWebSocket(w,r)
	}else{
		h.HandleHTTP(w,r)	
	}
}