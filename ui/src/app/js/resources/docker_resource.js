angular.module("app").service("DockerResource", function($q, $resource, $websocket, $location, $http, ImageRecommendedService) {
  	var thys = this; 

  	thys.relApiPath = '/dockerapi'; 
  	thys.absApiPath = $location.host()+':'+$location.port()+thys.relApiPath;

  	// Hub cache 
  	thys.hubData = {}; 
  	thys.getHubData = function(term){
  		if(thys.hubData[term]){
  			return thys.hubData[term]; 
  		}else{
  			thys.hubData[term] = thys.Images.hub({term: term}, function(data){
  				data.repositoryUrl = "http://hub.docker.com/";
  				if(data.is_official){
  					data.repositoryUrl += 'r/library/'+data.name;
  				}else{
  					data.repositoryUrl += 'r/'+data.name;
  				}
  			});
  			return thys.hubData[term];
  		}
  	};

  	// Transformers 
  	var containerTransformer = function(data, headers){
		var wrapped = angular.fromJson(data);
		angular.forEach(wrapped, function(item, index){
			var container = wrapped[index] = new ContainerModel(item);
			container.Recommended = ImageRecommendedService.getRecommended(wrapped[index].Image); 
		});
		return wrapped;
	};

  	var imageTransformer = function(data, headers){
		var wrapped = angular.fromJson(data);
		angular.forEach(wrapped, function(item, index){
			var image = wrapped[index] = new ImageModel(item);
			image.Recommended = ImageRecommendedService.getRecommended(image.shortName); 
			if(image.isFinalImage){
				image.Hub = thys.getHubData(item.RepoTags[0].replace(/:.*$/,''));
			}
		});
		return wrapped;
	};

	var hubTransformer = function(data, headers){
		var wrapped = angular.fromJson(data);	
		return wrapped[0] ? wrapped[0] : false ;
	}; 

	var searchTransformer = function(data, headers){
		var wrapped = angular.fromJson(data);
		angular.forEach(wrapped, function(item, index){
			var image = wrapped[index] = item;
			image.Recommended = ImageRecommendedService.getRecommended(image.name); 
			image.repositoryUrl = "http://hub.docker.com/";
			if(image.is_official){
				image.repositoryUrl += 'r/library/'+image.name;
			}else{
				image.repositoryUrl += 'r/'+image.name;
			}
		});
		return wrapped;		
	};

	var pullTransformer = function(data, headers){
		var datas = resourceDataToStr(data).trim().split("\n"); 
		return angular.fromJson(datas[datas.length - 1]); 
	};

  	var isLoggedIn = function(){
  		return (typeof($http.defaults.headers.common["Authorization"]) !== 'undefined');
  	};

	thys.getConsoleContainer = function(config){
		if(!isLoggedIn()){ return false; }
		var options = _.defaults(config || {}, {
			id 	  	: null,
			stream	: true, 
			stdin 	: true, 
			stdout	: true, 
			stderr	: true
		});

		var optionString = function(){
			var string = ''; 
			_.each(['stream','stdin','stdout','stderr'], function(prop){
				string += prop+'='+(options[prop]?1:0)+'&';
			});
			string += 'token='; 
			string += $http.defaults.headers.common["Authorization"].replace('Bearer ',''); 
			return string;
		};
		
		var protocol = (location.protocol === 'http:') ? 'ws://' : 'wss://' ;
		var url = protocol+thys.absApiPath+'/containers/'+options.id+'/attach/ws?'+optionString();
		return $websocket(url);
	};

  	thys.Containers = 
	$resource(thys.relApiPath+'/containers/:id/:action/:format',
		{ 
			// Forced get params 
			name: '@name',
			t: '@t',
			path: '@path'
		},
		{
			// Actions 
		'list'		: {method: 'GET'	, params: {format: 'json'}, isArray: true, transformResponse: containerTransformer},
		'get' 		: {method: 'GET'	, params: {id: '@id', format: 'json'}}, 
		'create'	: {method: 'POST'	, params: {action: 'create'}},

		'top' 		: {method: 'GET'	, params: {id: '@id', action: 'top', ps_args: 'aux'}}, 
		'logs' 		: {method: 'GET'	, params: {id: '@id', action: 'logs', tail: 20, stdout: 1, stderr:1, isArray: true}}, 
		'changes' 	: {method: 'GET'	, params: {id: '@id', action: 'changes'}, isArray: true},  
		'export' 	: {method: 'GET'	, params: {id: '@id', action: 'export'}},  
		'stats'		: {method: 'GET'	, params: {id: '@id', action: 'stats'}}, 

		'start'		: {method: 'POST'	, params: {id: '@id', action: 'start'}}, 
		'stop'		: {method: 'POST'	, params: {id: '@id', action: 'stop', t: 5}}, 
		'restart'	: {method: 'POST'	, params: {id: '@id', action: 'restart', t: 5}}, 
		'kill'		: {method: 'POST'	, params: {id: '@id', action: 'kill'}}, 
		'rename'	: {method: 'POST'	, params: {id: '@id', action: 'rename'}}, 
		'pause'		: {method: 'POST'	, params: {id: '@id', action: 'pause'}}, 
		'unpause'	: {method: 'POST'	, params: {id: '@id', action: 'unpause'}}, 

		'wait'		: {method: 'POST'	, params: {id: '@id', action: 'wait'}}, 
		'remove'	: {method: 'DELETE'	, params: {id: '@id', v: 1}}, 
		'copy'		: {method: 'POST'	, params: {id: '@id', action: 'copy'}}, 
		'exec'		: {method: 'POST'	, params: {id: '@id', action: 'exec'}}, 

		'attach'	: {method: 'GET'	, params: {id: '@id', action: 'attach', format: 'ws'}}		 		
	});

	thys.Images = $resource(thys.relApiPath+'/images/:id/:action/:format', {
		fromImage: '@fromImage',
		tag: '@tag',
	}, {
		//'list': {method: 'GET', params: {all: 0, action: 'json', digests: 1, filters: {dangling: ["false"], label:["key"]} }, isArray: true, transformResponse: imageTransformer}
		'list'		: {method: 'GET'	, params: {all: 0, action: 'json'}		,isArray: true, transformResponse: imageTransformer},
		'get' 		: {method: 'GET'	, params: {id: '@id', format: 'json'}},
		'hub'		: {method: 'GET'	, params: {action: 'search'}, transformResponse: hubTransformer},
		'search'	: {method: 'GET'	, params: {action: 'search'}, isArray: true, transformResponse: searchTransformer},
		'create'	: {method: 'POST'	, params: {action: 'create'}, transformResponse:pullTransformer},  
		'remove'	: {method: 'DELETE'	, params: {id: '@id', noprune: 1}, transformResponse: []},  
	});	

  	return thys; 
});
