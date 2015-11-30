var ContainerPortModel = function(data){
	var thys = this; 
	thys.IP = data.IP;
	thys.Type = data.Type;
	thys.PrivatePort = data.PrivatePort;
	thys.PublicPort = data.PublicPort;
	thys.toString = function(){
		if(typeof thys.IP === "undefined"){
			return thys.PrivatePort+'/'+thys.Type; 
		}else{
			return thys.PrivatePort+'/'+thys.Type+' \u2192 '+thys.IP+':'+thys.PublicPort;
		}
	};
	return thys;
};

var ContainerModel = function(data){
	var thys = this; 
	thys.Command = data.Command; 
	thys.Created = new Date(data.Created*1000); 
	thys.Id = data.Id; 
	thys.Image = data.Image; 
	thys.Labels = data.Labels; 
	thys.Names = data.Names; 
	thys.Ports = data.Ports.map(function(port){ return new ContainerPortModel(port); }); 
	thys.Status = data.Status; 
	thys.HostConfig = data.HostConfig; 
	thys.shortName = thys.Names[0].replace(/^.*\/([^/]+)$/,'$1'); 
	thys.isUp = !!thys.Status.match(/^Up/); 

	return thys;
};

