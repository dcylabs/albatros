angular.module("app").filter('dockerBytes', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)){ return '-'; }
		if (typeof precision === 'undefined'){ precision = 1; }
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
			number = Math.floor(Math.log(bytes) / Math.log(1000));
		return (bytes / Math.pow(1000, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	};
});  
 