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
		  	showLoader('Pulling image from Docker hub');  			
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
			showLoader('Searching image on Docker hub');
			$scope.images = DockerResource.Images.search({term: $scope.query}, function(){
				dismissLoader();
			});	
		}
	};

});
 