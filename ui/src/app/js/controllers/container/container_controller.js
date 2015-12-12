angular.module("app").controller('ContainerController', function($scope, $routeParams, $location, $templateCache, $timeout, $filter, DockerResource) { 
  
  $scope.id = $routeParams.id; 
  $scope.container = false;
  $scope.logs = "";
  $scope.console = "";

  var topTimer = false;
  var dataStream = false; 

  $scope.rename = function(){
    var template = $($templateCache.get('container/renameForm.html'));
    template.find('input').val($scope.container.Name.replace('/',''));
    swal({
      title       : 'Rename',
      html        : template,
      closeOnConfirm    : false,       
      showCancelButton    : true, 
      cancelButtonColor   : '#EB3E46', 
      confirmButtonColor  : '#22B8EB',
    },function(){
      var form = $('#containerRenameForm').serializeObject();
      DockerResource.Containers.rename($.extend({id:$routeParams.id},form),function(data){
        $scope.refreshContainer(); 
        $scope.$root.$broadcast('refreshContainers');        
        resultAct(data.id, 'Successfully renamed !', data);
      });
    });
  };
   
  $scope.start = function(){
    DockerResource.Containers.start({id:$routeParams.id}, function(data){
      $scope.refreshContainer(); 
      $scope.$root.$broadcast('refreshContainers');
      resultAct(data.id, 'Successfully started !', data);      
    });
  }; 

  $scope.stop = function(){
    warnAct('Stopping container may broke some dependencies',function(){    
      DockerResource.Containers.stop({id:$routeParams.id}, function(data){
        $scope.refreshContainer(); 
        $scope.$root.$broadcast('refreshContainers');
        resultAct(data.id, 'Successfully stopped !', data);      
      });
    });
  };

  $scope.restart = function(){
    warnAct('Restarting container may broke some dependencies',function(){        
      DockerResource.Containers.restart({id:$routeParams.id}, function(data){
        $scope.refreshContainer(); 
        $scope.$root.$broadcast('refreshContainers');
        resultAct(data.id, 'Successfully restarted !', data);       
      });
    });
  }; 

  $scope.refreshTop = function(){
    DockerResource.Containers.top({id:$routeParams.id}, function(data){
      $scope.top = data; 
      if($scope.container.State && $scope.container.State.Running){
        topTimer = $timeout($scope.refreshTop, 1000);
      }else{
        topTimer = $timeout($scope.refreshTop, 10000);
      }
    });
  };

  $scope.refreshLogs = function(){
    DockerResource.Containers.logs({id:$routeParams.id},function(data){
      $scope.logs = resourceDataToStr(data);
    });
  };

  $scope.downloadLogs = function(){ 
    DockerResource.Containers.logs({id:$routeParams.id, tail:false},function(data){
      var logs = $filter('termStyle')(data);
      var template = $templateCache.get('container/containerLogs.html');
      var html = template.replace('{{data}}',logs).replace('{{host}}',window.location.host);
      window.open('data:text/html;charset=utf-8,'+encodeURIComponent(html), '_blank');
    });
  };

  $scope.pause = function(){
      DockerResource.Containers.pause({id:$routeParams.id}, function(data){
        $scope.refreshContainer(); 
        $scope.$root.$broadcast('refreshContainers');
        resultAct(data.id, 'Successfully paused !', data);      
      });
  };

  $scope.unpause = function(){
      DockerResource.Containers.unpause({id:$routeParams.id}, function(data){
        $scope.refreshContainer(); 
        $scope.$root.$broadcast('refreshContainers');
        resultAct(data.id, 'Successfully unpaused !', data);      
      });
  };

  $scope.remove = function(){
    warnAct('Removing container may broke some dependencies',function(){        
      DockerResource.Containers.remove({id:$routeParams.id}, function(data){
        $scope.$root.$broadcast('refreshContainers');
        resultAct(!data[0], 'Successfully removed !', data);    
        if(!data[0]){
          $location.path('/containers');  
        }        
      });
    });
  }; 

  $scope.send = function(){
    $scope.command = ""; 
  };
 
  $scope.initConsole = function(){
    if(dataStream){
      dataStream.close();
    }
    dataStream = DockerResource.getConsoleContainer({id:$routeParams.id});
    if(dataStream){
      dataStream.onMessage(function(message){
        console.log(message.data);
        message.data.split('').every(function(character){
          var charCode = character.charCodeAt(0); 
          if(charCode !== 0){
            if(charCode == 8){
              //backspace
              $scope.console = $scope.console.replace(/.(\x1B\[[^a-z]*[a-z])?$/gi,'');

              // \x1B\[([^a-z]+)[a-z]/gi
            }else{
              //add
              $scope.console += character;
            }
          }
          return charCode !== 0; 
        });
        $('.console .output .content').stop().animate({scrollTop: $('.console .output .content')[0].scrollHeight},100);
      });
    }     
  };

  $scope.handleConsoleKeyboard = function($event){
    var character;    
    if($event.ctrlKey && $event.keyCode >= 65 && $event.keyCode <= 95){
      character = String.fromCharCode($event.keyCode - 64);
    }else if($event.key.length == 1){
      character = $event.key;
    }else if($event.keyCode >= 37 && $event.keyCode <= 40){
      if($event.keyCode == 38){
        character = String.fromCharCode($event.keyCode - 22);
      }
    }else if($event.key == 'Shift'){
      // unhandled arrow keys in html
    }else{
      character = String.fromCharCode($event.keyCode);
    }
    if(dataStream){
      dataStream.send(character);   
    }
  };

	$scope.refreshContainer = function(){
  	DockerResource.Containers.get({id:$routeParams.id}, function(data){
      $scope.container = data; 
    });
    $scope.refreshTop(); 
    $scope.refreshLogs(); 
    $scope.initConsole();
	}; 

  $scope.$on('$destroy',function(){
    if(topTimer !== false){
      $timeout.cancel(topTimer);  
    }
  });

  $scope.refreshContainer(); 

});



 