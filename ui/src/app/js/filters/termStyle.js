angular.module("app").filter('termStyle', function($sce) {
	return function(data) {
      /*
        TODO HANDLE REWRITE FROM TOP "\e[H"
      */

      var html = data; 
      var regex = {
        'nul'   : /\x00/gi,
        'back'  : /[^\x08](\x1B.[0-9;]*[^0-9;])*\x08/gi,
        'style' : /\x1B.([0-9]+)?;?([0-9]+)?[^0-9;]/gi
      };


      html = html.replace(regex.nul,'');

      while(html.match(regex.back)){
        html = html.replace(regex.back,'');
      }
      
      html = html.replace(regex.style,'</span><span class="termStyle-$1 termStyle-$2">'); 
	    return $sce.trustAsHtml("<span>"+html+"</span>");
	};
});    