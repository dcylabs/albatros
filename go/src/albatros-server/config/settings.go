package config 

import(
	"albatros-server/model"
)

type Settings struct{
	DockerEndpoint string
	ListenHTTP string
	ListenHTTPS string
	SSLKeyPath string
	SSLCertPath string
	SessionTime int
	Secret string
	AppPath string
	Accounts []model.User
}
