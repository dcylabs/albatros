package configuration 

import(
	"fmt"
	"log"
	"strings"
	"github.com/caarlos0/env"
	"albatros-server/model"
)

type Configuration struct{
	DockerEndpoint string 	`env:"DOCKER_ENDPOINT"`
	AppPath string			`env:"APP_PATH"`
	SSLKeyPath string		`env:"SSL_KEY_PATH"`
	SSLCertPath string		`env:"SSL_CERT_PATH"`
	ListenHTTP string		`env:"LISTEN_HTTP"`
	ListenHTTPS string		`env:"LISTEN_HTTPS"`
	UseSSL bool 			`env:"USE_SSL"`
	SessionTime int			`env:"SESSION_TIME"`
	Secret string			`env:"SECRET"`
	AccountsString string 	`env:"ACCOUNTS"`
	Accounts []model.User
}

func (c *Configuration) Load(){
	env.Parse(c)
	accounts := strings.Split(c.AccountsString, ";")
	for _, account := range accounts{
		userData := strings.Split(account, ":")
		c.Accounts = append(c.Accounts, model.User{userData[0], userData[1]})
	}
	// Force session to be at least a minute
	if(c.SessionTime < 60){
		c.SessionTime = 60
	}	
}

func (c *Configuration) Log(){
	log.Printf(" ========== [\x1B[34;1m%s\x1B[0m] ========== \n", "CONFIGURATION")
	prettyPrint(0, "Docker endpoint", c.DockerEndpoint)
	prettyPrint(0, "Path to application", c.AppPath)	
	prettyPrint(0, "Path to SSL key", c.SSLKeyPath)
	prettyPrint(0, "Path to SSL certificate", c.SSLCertPath)	
	prettyPrint(0, "Http listening on", c.ListenHTTP)
	prettyPrint(0, "Https listening on", c.ListenHTTPS)
	prettyPrint(0, "Use SSL", fmt.Sprintf("%t",c.UseSSL))
	prettyPrint(0, "Session time", fmt.Sprintf("%d seconds",c.SessionTime))
	prettyPrint(0, "Secret", "-")
	prettyPrint(0, "Accounts", "")
	for _, account := range c.Accounts{
		prettyPrint(5,account.Username, "-")
	}
}

func prettyPrint(tabsize int, item string, value string){
	tab := fmt.Sprintf("%"+fmt.Sprintf("%ds",tabsize), "")
	log.Printf("\x1B[34;1m%-25s:\x1B[0m %s \n", tab+item, value)
}