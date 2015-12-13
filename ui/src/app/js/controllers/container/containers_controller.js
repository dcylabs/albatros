angular.module("app").controller('ContainersController', function($scope, DockerResource) {
  
	$scope.containers = [];
	$scope.query = "";

	$scope.predicate = false; 
	$scope.reverse = false;

	$scope.order = function(predicate){
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

	$scope.refreshContainers = function(){
	  	DockerResource.Containers.list({all:1}, function(data){
	  		$scope.containers = data;
	  	});
	};

  	$scope.refreshContainers(); 

});
