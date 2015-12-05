var app = angular.module("app", ["ngResource", "ngRoute", "ngAnimate","ngWebSocket"]).run(function($rootScope) {

  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };
  
});


 