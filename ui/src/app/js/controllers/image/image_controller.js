angular.module("app").controller('ImageController', function($scope, $routeParams, $filter, $location, DockerResource) { 
  
	$scope.id = $routeParams.id; 
	$scope.image = {
		basic: false,
		detailed: false
	};

 	$scope.remove = function(){
 		// To improve
		DockerResource.Images.remove({id:$routeParams.id}, function(data){
      var result = resourceDataToStr(data); 
      resultAct((result[0] == '['), 'Successfully removed !', data);    
  	}); 
  };

	$scope.refreshImage = function(){
		DockerResource.Images.list(function(data){
			$scope.image.basic = $filter('filter')(data,{Id:$routeParams.id})[0];
		}); 		  		
  		DockerResource.Images.get({id:$routeParams.id}, function(data){
      		$scope.image.detailed = data;      		
		});
	}; 

	$scope.refreshImage(); 

});
 