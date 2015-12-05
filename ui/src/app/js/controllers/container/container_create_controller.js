angular.module("app").controller('ContainerCreateController', function($scope, $location, DockerResource) {
  
  	$scope.containers = DockerResource.Containers.list({all:1});
  	$scope.images = DockerResource.Images.list();



  	var transformContainer = function(input){
  		var container = _.extend({}, input); 
  		if(container.Cmd == ''){
  			container.Cmd = [];
  		}else{
  			container.Cmd = container.CmdString.split(' ');
  		}
  		container.HostConfig.PortBindings = {};
  		_.each(container.HostConfig.Ports, function(value, index){
  			var matches = value.match(new RegExp('^((.*):)?([0-9]+):([0-9]+)(/(.*))?$',''));

  			var protocol = matches[6] || 'tcp';
  			var key = matches[4]+'/'+protocol;
  			var hostIp = matches[2] || '0.0.0.0';
  			var hostPort = matches[3];

  			container.ExposedPorts[key] = {};
  			container.HostConfig.PortBindings[key] = [{
  				HostIp: hostIp,
  				HostPort: hostPort  			
  			}];
  		});
  		_.each(container, function(value, index){
  			if(value.length == 0){
  				delete container[index];
  			}
  		});
  		_.each(container.HostConfig, function(value, index){
  			if(value.length == 0){
  				delete container.HostConfig[index];
  			}
  		});  		
  		return container;
  	};

  	$scope.create = function(){
  		DockerResource.Containers.create(transformContainer($scope.container), function(data){
	        $scope.$root.$broadcast('refreshContainers');
	        resultAct(data.Id, 'Successfully created !', data);    
	        if(data.Id){
	          $location.path('/containers/'+data.Id);  
	        }      			
  		})
  	};

	$scope.container = {
		Image: "", 
		name: "",
		Cmd: [],
		CmdString: "",
		Hostname: "",
		WorkingDir: "",
		ExposedPorts: {},
		Tty: false,
		OpenStdin: false,
		Env: [],
		HostConfig:{
			Binds:[], 
			Links:[],
			Ports:[],
			PortBindings:{}
		}
	}


});
