angular.module("app").controller('ImagePullController', function($scope, $location, DockerResource) {
   
	$scope.query = '';
	$scope.images = [];

   	$scope.pull = function(image){
   		swal({
   			title	: 'Pull image from docker hub',
   			html 	: '<p>'+
   						'Please enter the tag you want to pull <br/>'+
   						'<a target="_blank" href="'+image.repositoryUrl+'/tags"> Find the tag you want here </a>'+
   						'</p><br/><p>'+
   						'<input type="text" id="imageTag" class="form-control"/>'+
   						'</p>',
			closeOnConfirm    : false,       
			showCancelButton    : true, 
			cancelButtonColor   : '#EB3E46', 
			confirmButtonColor  : '#22B8EB',   					
   		}, function(){		
   			var tag = $('#imageTag').val();
		  	swal({
		  		title				: 'Working',
		  		html 				: '<p>Pulling image from docker hub</p>',
		  		allowOutsideClick	: false,
		  		allowEscapeKey		: false,
		  		closeOnConfirm		: false, 
		  		closeOnCancel		: false,
		  		confirmButtonColor  : '#22B8EB', 
		  	}, function(){ return false; });    			
			DockerResource.Images.create({
				fromImage: image.name,
				tag: tag || 'latest'
			},function(data){
				if(!data.error){
					$location.path('/images');  
					$scope.$root.$broadcast('refreshImages');
			    	swal({ 
				      	type        : 'success',
				        text        : data.status,
				      	timer       : 2000,
				        confirmButtonColor  : '#22B8EB',
			    	}); 
			    }else{
			    	swal({
				      	type        : 'error',
				        width       : 600,
				      	text        : data.error,
				      	confirmButtonColor  : '#22B8EB',
				  	}); 
				}
			});   	  					
   		});
	};

	$scope.search = function(){
		if($scope.query.length){
			$scope.images = DockerResource.Images.search({term: $scope.query});	
		}
	};

});
 