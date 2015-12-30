angular.module("app").filter('termStyle', function($sce) {
	return function(data, streamSize) {
    
      /*
        TODO HANDLE REWRITE FROM TOP "\e[H"
      */

      // Dont know why in attach as websocket streamSize is 3 ( 4 in the)
      streamSize = streamSize || 4;

      var html = data; 
      var regex = {
        'stdall'  : new RegExp("(\u0000|\u0001|\u0002)\u0000{3}.{"+streamSize+"}","g"),
        'stdin'   : new RegExp("\u0000\u0000{3}.{"+streamSize+"}","g"),
        'stdout'  : new RegExp("\u0001\u0000{3}.{"+streamSize+"}","g"),
        'stderr'  : new RegExp("\u0002\u0000{3}.{"+streamSize+"}","g"),        
        'style'   : new RegExp("\x1B.([0-9]+)?;?([0-9]+)?[^0-9;]","g"),
        'nul'     : new RegExp("\x00","g"),
        'back'    : new RegExp("[^\x08](\x1B.[0-9;]*[^0-9;])*\x08") // experimental
        //'back'    : new RegExp("/[^\x08](\x1B.[0-9;]*[^0-9;])*\x08","g")
      };


      html = html.replace(regex.stdall   ,''); 
      html = html.replace(regex.nul   ,''); 

      while(html.match(regex.back)){
        html = html.replace(regex.back,'');
      }
   
      html = html.replace(regex.style   ,'</span><span class="termStyle-$1 termStyle-$2">'); 

	    return $sce.trustAsHtml("<span>"+html+"</span>");
	};
});    