angular.module("app").filter('termStyle', function($sce) {
	return function(data) {
    html = ""; 
    var registerFormat = false;
    var formatCode = '';
  	_.each(data, function(value){
        if(value.length){
          if(value.charCodeAt(0) === 0x1B){
            registerFormat = true; 
          }
          if(registerFormat){
          	if(value === 'm'){
	            html += '</span><span class="termStyle-'+formatCode+'">';
            	registerFormat = false; 
            	formatCode = '';
        	}else if(value <= 9 && value >= 0){
	            formatCode += value; 
          	}       
          } else if(!registerFormat){
            html += _.escape(value); 
          }
        }
	});
	return $sce.trustAsHtml("<span>"+html+"</span>");
	};
});    