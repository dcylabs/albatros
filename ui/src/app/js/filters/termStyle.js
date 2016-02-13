angular.module("app").filter('termStyle', function($sce) {
	return function(data, streamSize) {
    
      /*
        TODO HANDLE REWRITE FROM TOP "\e[H"
      */

      // Dont know why streamSize is 3 ( 4 in the doc )
      streamSize = streamSize || 3;

      var html = data; 
      var regex = {
        'stdall'  : new RegExp("(\u0000|\u0001|\u0002)\u0000{3}.{"+streamSize+"}","g"),
        'stdin'   : new RegExp("\u0000\u0000{3}.{"+streamSize+"}","g"),
        'stdout'  : new RegExp("\u0001\u0000{3}.{"+streamSize+"}","g"),
        'stderr'  : new RegExp("\u0002\u0000{3}.{"+streamSize+"}","g"),        
        'style'   : new RegExp("\x1B.([0-9]+)?;?([0-9]+)?[^0-9;]","g"),
        'nul'     : new RegExp("\x00","g"),
        'back'    : new RegExp("[^\x08](<\/span><span[^>]*>)*\x08","g") // experimental
      };

      // stdin contain \x00 char, so we change it before removing null
      html = html.replace(regex.stdin   ,''); // we dont really care about stdin as it is written in stdout
      html = html.replace(regex.nul   ,''); 

      html = html.replace(regex.stdout  ,'</span><span class="termStyle-stdout">'); 
      html = html.replace(regex.stderr  ,'</span><span class="termStyle-stderr">');           
      html = html.replace(regex.style   ,'</span><span class="termStyle-$1 termStyle-$2">'); 
            
      while(html.match(regex.back)){
        html = html.replace(regex.back,'');
      }

	    return $sce.trustAsHtml("<span>"+html+"</span>");
      
	};
});    