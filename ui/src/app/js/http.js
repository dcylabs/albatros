angular.module("app").config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope){
		$rootScope.isLoading = 0;
		return{
			'request': function(config){
				$rootScope.isLoading++;
				return config;
			},
			'response': function(response){
				$rootScope.isLoading--;
				return response; 
			}
		};
	});
});
