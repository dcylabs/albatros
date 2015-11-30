var app = angular.module("app", ["ngResource", "ngRoute", "ngAnimate","ngWebSocket"]).run(function($rootScope) {
  // adds some basic utilities to the $rootScope for debugging purposes
  

  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
});


 