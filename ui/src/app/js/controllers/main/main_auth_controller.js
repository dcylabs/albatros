angular.module("app").controller('MainAuthController', function(AuthenticationService, $templateCache, $location, $rootScope) {
  
  var template = $($templateCache.get('main/loginForm.html'));

  var login = function() {

  	swal({
  		title				: 'Login',
  		html 				: template,
  		allowOutsideClick	: false,
  		allowEscapeKey		: false,
  		closeOnConfirm		: false, 
  		closeOnCancel		: false, 
  		confirmButtonColor	: '#22B8EB',
  	},function(){
  		var credentials = $('#mainLoginForm').serializeObject();
		AuthenticationService.login(credentials).then(function(data){
			swal({
				type				: 'success',
				text				: 'Successfully logged in !',
				timer				: 2000,
				confirmButtonColor	: '#22B8EB',
			}); 
            $rootScope.$broadcast("loggedInEvent");
		}, function(error){
	    	swal({
	    		type				: 'error',
	    		text				: error,
		  		allowOutsideClick	: false,
		  		allowEscapeKey		: false,
		  		closeOnConfirm		: false, 
		  		confirmButtonColor	: '#22B8EB',
	    	}, login);
	    });		     
  	});
  };

 login();

});
