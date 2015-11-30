angular.module("app").controller('ImagesController', function($scope, DockerResource) {
   
 	$scope.images = []; 
	$scope.predicate = false; 
	$scope.reverse = false;

	$scope.order = function(predicate){
		console.log('order');
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

  	$scope.refreshImages = function(){
    	$scope.images = DockerResource.Images.list();
  	};
 
  	$scope.refreshImages();
  
});
