var showLoader = function(text){
	var $template = $('<div>');
	var $div = $('<div>').addClass('loader main-loader loading');
	for(var i = 1; i <= 5; i++){
		$('<div>').addClass('rect rect'+i).appendTo($div);
	}
	var $h2 = $('<h2>').html(text);
	$template.append($h2).append($div);
  	swal({
  		html 				: $template,
  		showConfirmButton	: false,
  		allowOutsideClick	: false,
  		allowEscapeKey		: false,
  		closeOnConfirm		: false, 
  		closeOnCancel		: false, 
  	});
};

var dismissLoader = function(){
	window.swal.closeModal();
};