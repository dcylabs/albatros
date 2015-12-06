angular.module("app").service('AuthenticationService', function($rootScope, $http, $q, $timeout) { 	
  	var thys = this; 
    thys.timeout = false;
    $rootScope.isLoggedIn = false; 
    thys.login = function(credentials) {
    	var deferred = $q.defer(); 
      	var request = $http({
      		method: 'POST',
      		url: '/login',
      		data: credentials,
	    });
      	request.success(function(data){
  	    	if(typeof data.Error !== "undefined"){
      			deferred.reject(data.Error);
      		}else{
      			if(thys.timeout !== false){
              $timeout.cancel(thys.timeout); 
            }
            thys.timeout = $timeout(function(){
              thys.login(credentials); 
            }, (data.Expire-10)*1000);
            $rootScope.isLoggedIn = true; 
      			$http.defaults.headers.common.Authorization = "Bearer "+data.Token;
  	    		deferred.resolve(data.Token);
      		}      	
      	});
      	return deferred.promise; 
    };
});


