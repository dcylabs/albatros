var extractKey = function($event){

    var character = false;    
    
    var keyCode = $event.keyCode || $event.which; 
    var ctrlKey = $event.ctrlKey;

    if(typeof $event.key != "undefined"){
      // FIREFOX BEHAVIOR
      if($event.type == 'keydown'){
        if(ctrlKey && keyCode >= 65 && keyCode <= 95){
          // handling ctrl + ... 
          character = String.fromCharCode(keyCode - 64);
        }else if(keyCode >= 16 && keyCode <= 20){
          // do nothing on system key 
        }else if(keyCode >= 37 && keyCode <= 40){
          if(keyCode == 38){ // UP
            character = String.fromCharCode(16);
          }else if(keyCode == 40){ // DOWN
          	character = String.fromCharCode(14);
          }
        }else if($event.key.length == 1){
          character = $event.key;
        }else{
          character = String.fromCharCode(keyCode);
        }
      }

    }else{
      // CHROME BEHAVIOR
      if($event.type == 'keydown'){
        if(ctrlKey && keyCode >= 65 && keyCode <= 95){
          // handling ctrl + ... 
          character = String.fromCharCode(keyCode - 64);
        }else if(keyCode >= 16 && keyCode <= 20){
          // do nothing on system keys
        }else if(keyCode >= 37 && keyCode <= 40){
          if(keyCode == 38){ // UP
            character = String.fromCharCode(16);
          }else if(keyCode == 40){ // DOWN
          	character = String.fromCharCode(14);
          }
        }else if(keyCode < 31){
          character = String.fromCharCode(keyCode);
        }
      }else{
        character = String.fromCharCode(keyCode);
      }
    }

    if(character !== false){
		$event.stopPropagation(); 
		$event.preventDefault();    	
    }

    return character; 

};