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
	var authDockerHandler http.Handler
	var kitematicHandler http.Handler
	var loginHandler http.Handler
	var appHandler http.Handler

	dockerHandler := DockerHandler{settings.DockerEndpoint}
	jwtStorage := jwtstore.New(settings.Secret, time.Second*time.Duration(settings.SessionTime))

	authDockerHandler 	= tauth.NewTokenAuth(dockerHandler, helpers.UnauthorizedHandler, jwtStorage, &helpers.AlbatrosAuthGetter{Parameter:"token"} )
	kitematicHandler	= KitematicHandler{}
	loginHandler 		= AuthHandler{*jwtStorage, settings}
	appHandler 			= http.FileServer(http.Dir(settings.AppPath))

	
	mux.Handle(		"/dockerapi/", 	http.StripPrefix("/dockerapi", authDockerHandler))
	mux.Handle(		"/kitematic/", 	http.StripPrefix("/kitematic", kitematicHandler))
	mux.Handle(		"/login", 		http.StripPrefix("/login", loginHandler))
	mux.Handle(		"/", 			appHandler)

	return mux
}
