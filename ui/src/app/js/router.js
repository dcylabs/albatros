angular.module("app").config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/containers', {
    templateUrl: 'container/containers.html',
    controller: 'ContainersController'
  });

  $routeProvider.when('/containers/:id', {
    templateUrl: 'container/containerDetails.html',
    controller: 'ContainerController'
  });

  $routeProvider.when('/containerCreate', {
    templateUrl: 'container/containerCreate.html',
    controller: 'ContainerCreateController'
  });


  $routeProvider.when('/images', {
    templateUrl: 'image/images.html',
    controller: 'ImagesController'
  });

  $routeProvider.when('/images/:id', {
    templateUrl: 'image/imageDetails.html',
    controller: 'ImageController'
  }); 

  $routeProvider.when('/imagePull', {
    templateUrl: 'image/imagePull.html',
    controller: 'ImagePullController'
  }); 

  $routeProvider.otherwise({ redirectTo: '/containers' });

});
