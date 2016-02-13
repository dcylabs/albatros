angular.module("app").config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope){
		$rootScope.isLoading = 0;
		return{
			'request': function(config){
				$rootScope.isLoading++;
				return config;
			},
			'requestError': function(rejection){
				$rootScope.isLoading--;
				return rejection; 
			},				
			'response': function(response){
				$rootScope.isLoading--;
				return response; 
			},
			'responseError': function(rejection){
				$rootScope.isLoading--;
				return rejection; 
			}		
		};
	});
});
