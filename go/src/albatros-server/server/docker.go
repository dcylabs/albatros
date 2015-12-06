package server

import (
	"net"
	"net/http"
	"net/http/httputil"
	"io"
	"code.google.com/p/go.net/websocket"
	"albatros-server/helpers" 
)

// DockerHandler 
type DockerHandler struct {
	dockerEndpoint string
}

func (h DockerHandler) GetWebSocket(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	client, _ := net.Dial("unix", h.dockerEndpoint)		
	config := &websocket.Config{}
	config.Version = websocket.ProtocolVersionHybi13
	config.Location = r.URL
	config.Origin = r.URL
	config.Header = r.Header
	return websocket.NewClient(config, client)
}

func (h DockerHandler) HandleHTTP(w http.ResponseWriter, r *http.Request){
	conn, _ := net.Dial("unix", h.dockerEndpoint)		

	// Creating a socket client 
	clientConn := httputil.NewClientConn(conn, nil)
	defer clientConn.Close()

	// Forwarding request to client 
	res, _ := clientConn.Do(r)
	defer res.Body.Close()

	for kA, vA := range res.Header{
		for _, vB := range vA{
			w.Header().Add(kA,vB)
		}
	}

	io.Copy(w, res.Body)
}

func (h DockerHandler) HandleWebSocket(w http.ResponseWriter, r *http.Request){
	dockerConn, err := h.GetWebSocket(w,r)
	defer dockerConn.Close()

	if (err == nil) {	
		websocket.Handler(func(ws *websocket.Conn){
			defer ws.Close()

			closeFunc := func(){
				dockerConn.Close()
				ws.Close()
			}

			go func(){
				for{
					message := make([]byte, 1024)
					_, err := dockerConn.Read(message)			
					if(err != nil){closeFunc();break;}
					_, err = ws.Write(message)
					if(err != nil){closeFunc();break;}
				}
			}()
			for{
				message := make([]byte, 1024)
				_, err := ws.Read(message)	
				if(err != nil){closeFunc();break;}
				_, err = dockerConn.Write(message)
				if(err != nil){closeFunc();break;}
			}
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

 