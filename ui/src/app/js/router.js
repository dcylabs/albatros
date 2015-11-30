angular.module("app").config(function($routeProvider, $locationProvider) {

  //$locationProvider.html5Mode({enabled:true});


  $routeProvider.when('/containers', {
    templateUrl: 'container/containers.html',
    controller: 'ContainersController'
  });

  $routeProvider.when('/containers/:id', {
    templateUrl: 'container/containerDetails.html',
    controller: 'ContainerController'
  });

  $routeProvider.when('/images', {
    templateUrl: 'image/images.html',
    controller: 'ImagesController'
  });

  $routeProvider.when('/images/:id', {
    templateUrl: 'image/imageDetails.html',
    controller: 'ImageController'
  }); 

  $routeProvider.when('/$http/list-of-books', {
    templateUrl: 'books_http.html',
    controller: 'BooksHttpController',
    resolve: {
      books: function(BookService) {
        return BookService.getBooks();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/containers' });

});
