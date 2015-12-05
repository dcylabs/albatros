angular.module("app").controller('ImageController', function($scope, $routeParams, $filter, $location, DockerResource) {
   
  
  	$scope.id = $routeParams.id; 
  	$scope.image = {
  		basic: false,
  		detailed: false
  	};


 	$scope.remove = function(){
 		// To improve
		DockerResource.Images.remove({id:$routeParams.id}, function(data){
			resultAct(!data[0], 'Successfully removed !', data);      
      	}).$promise.then(function(){

      	}, function(){
        	resultAct(true, 'Successfully removed !', null);    
			$location.path('/images');  
        	$scope.$root.$broadcast('refreshImages');      
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
 