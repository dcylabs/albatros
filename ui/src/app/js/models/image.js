var ImageModel = function(data){
	var thys = this; 
	
	thys.Created = new Date(data.Created*1000); 
	thys.Id = data.Id; 
	thys.ParentId = data.ParentId; 
	thys.Labels = data.Labels; 
	thys.RepoDigests = data.RepoDigests; 
	thys.RepoTags = data.RepoTags; 
	thys.Size = data.Size; 
	thys.VirtualSize = data.VirtualSize;
	thys.isFinalImage = false;  

	// Extract name and tagname 
	thys.Tag = ""; 
	thys.shortName = thys.RepoTags[0];
	if(thys.shortName === "<none>:<none>"){
		thys.shortName = thys.Id.substr(0,12);
	}else{
		var tag = thys.shortName.match(/:(.*)$/);
		if(tag){
			thys.Tag = tag[1]; 
		}
		thys.isFinalImage = true; 
		thys.shortName = thys.shortName.replace(/:(.*)$/, '');		
	}


	thys.hasRepo = false;
	thys.Repository = '';
	thys.Name = thys.shortName;
	var matches = thys.shortName.match(/^(.*)\/(.*)$/);
	if(matches){
		thys.hasRepo = true;
		thys.Repository = matches[1]; 
		thys.Name = matches[2]; 
	}

	thys.Hub = [];
 
	return thys;
};

