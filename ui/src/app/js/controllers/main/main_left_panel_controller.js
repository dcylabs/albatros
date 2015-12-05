angular.module("app").controller('MainLeftPanelController', function($scope, $location, $resource, AuthenticationService, DockerResource) {
  
  $scope.containers = []; 
  $scope.images = [];
  $scope.composes = []; 
  $scope.query = ""; 

  $scope.update = function(){
		$scope.refreshContainers();
		$scope.refreshImages();
  };

  $scope.refreshContainers = function(){
    DockerResource.Containers.list({all:1},function(data){
      $scope.containers = data;
    });
  };
  
  $scope.refreshImages = function(){
    DockerResource.Images.list({}, function(data){
      $scope.images = data;
    });
  };

  $scope.$root.$on('refreshContainers',function(event, args){
    $scope.refreshContainers(); 
  });

  $scope.$root.$on('refreshImages',function(event, args){
    $scope.refreshImages(); 
  });


  $scope.$root.$on('loggedInEvent', function(event, args){
  	$scope.update();
  });

});
