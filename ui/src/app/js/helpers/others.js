var resourceDataToStr = function(data){
	var string = ''; 
	_.each(data, function(c){
		if(c.length <= 2){
			string += c;
		}
	});
	return string; 
};