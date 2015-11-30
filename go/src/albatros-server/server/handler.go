package server

import (
	"net/http"
	"github.com/freehaha/token-auth"
	"github.com/freehaha/token-auth/jwt"
	"time"
	"albatros-server/config"
	"albatros-server/helpers" 
)




func CreateHandlers(settings config.Settings) http.Handler {
	mux	:= http.NewServeMux()
	var dockerHandler http.Handler
	var kitematicHandler http.Handler
	var authHandler http.Handler
	var appHandler http.Handler

	jwtStorage := jwtstore.New(settings.Secret, time.Second*time.Duration(settings.SessionTime))
	tokenAuth := tauth.NewTokenAuth(nil, helpers.UnauthorizedHandler, jwtStorage, &helpers.AlbatrosAuthGetter{Parameter:"token"} )

	dockerHandler 		= DockerHandler{settings.DockerEndpoint}
	kitematicHandler	= KitematicHandler{}
	authHandler 		= AuthHandler{*jwtStorage, settings}
	appHandler 			= http.FileServer(http.Dir(settings.AppPath))

	
	mux.HandleFunc(	"/dockerapi/", 	tokenAuth.HandleFunc(http.StripPrefix("/dockerapi", dockerHandler).ServeHTTP))
	mux.Handle(		"/kitematic/", 	http.StripPrefix("/kitematic", kitematicHandler))
	mux.Handle(		"/login", 		http.StripPrefix("/login", authHandler))
	mux.Handle(		"/", 			appHandler)

	return mux
}



	


	/*
	conn, err := net.Dial("unix", "/var/run/docker.sock")
	fmt.Fprintf(conn, "GET /containers/json HTTP/1.0\r\n\r\n")
	end, err := bufio.NewReader(conn).ReadString(']')
	if(err == err){}
	fmt.Printf("%s \n", end)
	*/