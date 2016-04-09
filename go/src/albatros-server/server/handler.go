package server

import (
	"time"
	"net/http"
	"github.com/freehaha/token-auth"
	"github.com/freehaha/token-auth/jwt"
	"albatros-server/configuration"
	"albatros-server/helpers" 
)

func CreateHandlers(config configuration.Configuration) http.Handler {
	mux	:= http.NewServeMux()
	var authDockerHandler http.Handler
	var kitematicHandler http.Handler
	var loginHandler http.Handler
	var appHandler http.Handler

	dockerHandler := DockerHandler{config.DockerEndpoint}
	jwtStorage := jwtstore.New(config.Secret, time.Second*time.Duration(config.SessionTime))

	authDockerHandler 	= tauth.NewTokenAuth(dockerHandler, helpers.UnauthorizedHandler, jwtStorage, &helpers.AlbatrosAuthGetter{Parameter:"token"} )
	kitematicHandler	= KitematicHandler{}
	loginHandler 		= AuthHandler{*jwtStorage, config}
	appHandler 			= http.FileServer(http.Dir(config.AppPath))

	
	mux.Handle(		"/dockerapi/", 	http.StripPrefix("/dockerapi", authDockerHandler))
	mux.Handle(		"/kitematic/", 	http.StripPrefix("/kitematic", kitematicHandler))
	mux.Handle(		"/login", 		http.StripPrefix("/login", loginHandler))
	mux.Handle(		"/", 			appHandler)

	return mux
}