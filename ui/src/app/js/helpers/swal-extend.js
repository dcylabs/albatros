var warnAct = function(message, callback){
    swal({
      type        : 'warning',
      text        : message,
      closeOnConfirm    : false, 
      showCancelButton    : true, 
      cancelButtonColor   : '#EB3E46', 
      confirmButtonColor  : '#22B8EB',
    },callback);
};

var resultAct = function(condition, successMsg, errorMsg){
    if(condition){
      	swal({ 
        	type        : 'success',
	        text        : successMsg,
        	timer       : 2000,
	        confirmButtonColor  : '#22B8EB',
      	}); 
    }else{
      	swal({
        	type        : 'error',
          width       : 600,
        	html        : resourceDataToStr(errorMsg),
        	confirmButtonColor  : '#22B8EB',
		}); 
  	}	
};
 