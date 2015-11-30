angular.module("app").service('ImageRecommendedService', function($rootScope, $http) { 	
	var thys = this; 

	var jsonUrl		= '/kitematic/recommended.json'; 
	var imageUrl 	= '/kitematic/recommended/'; 

	var repoData 	= {'recommended':[], 'repos':[]}; 

	thys.updateRepo 	= function(){
		$http({
			method:'JSON',
			url: jsonUrl
		}).then(function(response){
			repoData = response.data; 
		}); 
	};

	thys.getRecommended	= function(repository){
		var recommended = { 
			'gradient_start': '#24B8EB',
			'gradient_end'	: '#218CF4', 
			'img'			: 'kitematic_html.png'
		};
		//console.log(repoData);
		//console.log("Looking for "+repository);
		if(_.contains(repoData.recommended, repository)){
			_.each(repoData.repos,function(repo){
				if(repo.repo === repository){
					//console.log("Found repo "+repository);
					recommended = repo; 
				}
			});
		}
		recommended.imgUrl = '/kitematic/recommended/'+recommended.img;

		return recommended;
	};

	thys.updateRepo(); 

});


