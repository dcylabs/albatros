angular.module("app").filter('termStyle', function($sce) {
	return function(data) {
      var html = data.replace(/\x1B\[([^a-z]*)[a-z]/gi,'</span><span class="termStyle-$1">'); 
	    return $sce.trustAsHtml("<span>"+html+"</span>");
	};
});    