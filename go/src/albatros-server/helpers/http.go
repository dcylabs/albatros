package helpers

import (
	"strings"
	"net/http"
)

func IsWebsocket(req *http.Request) bool {
	conn_hdrs := req.Header["Connection"]
	upgrade_connection := false;
	if (len(conn_hdrs) > 0) {
		for _, conn_hdr := range strings.Split(conn_hdrs[0], ","){
			if (strings.ToLower(strings.Trim(conn_hdr, " ")) == "upgrade"){
				upgrade_connection = true
				break
			}
		}
	}

	upgrade_websocket := false
	if (upgrade_connection) {
		upgrade_hdrs := req.Header["Upgrade"]
		if len(upgrade_hdrs) > 0 {
			upgrade_websocket = (strings.ToLower(upgrade_hdrs[0]) == "websocket")
		}
	}

	return upgrade_websocket
}

 