//This thing is just required to track the frames in each tab 
// It needs a matrix object 


function FrameTracker(){
	// may put some filter settings in here 
}

FrameTracker.prototype = {
	// tracks frames in a tabId x frameId matrix 
	track: function(details){
		var URI = parseUri(details.url);
		var tabId = details.tabId;
		var frameId = details.frameId;
		var parentFrameId = (details.type == "sub_frame")? details.parentFrameId : details.frameId;
		ft = this;
		if(tabId <= -1)
			return false;

		if(typeof this[tabId] == 'undefined'){
			this[tabId] = {}; // will have domain
		}

		if(details.type == 'main_frame'){
			this[tabId] = {};
			this[tabId].url = details.url;
			this[tabId].domain = URI.hostname;
		}
		
		if(ft.seen(details)) // already seen it 
			{/*log("seen","true");*/return true;}

		//if tabId parentId isn't there, make one


		if(undefine(ft[tabId][parentFrameId])){
			var d2 = {};
			d2.url = this[tabId].url;
			d2.frameId = parentFrameId;
			d2.tabId = tabId;
			d2.type = "sub_frame";
			this.record(d2);
		}


		if(!ft.record(details))
			return false;

		//if(undefined == ft[tabId])
		//	return false;

		

		

		var entry = ft[tabId][frameId];
		
		//console.log("tabId: "+tabId + "; frameId: "+frameId);

		if(!undefine(entry)){
			if(undefine(ft[tabId].domain))
				return false; // tab is older than us
			else
				return true;
				}
		
		console.log("could not record");
		return false;
		},
			
			//this.addSafeWords(entry.uri.hostname,this.chop(entry.uri.hostname));
	

	record: function(details) {
		//puts all frames in the frame matrix
		var URI = parseUri(details.url);
		var frameId = details.frameId;
		var tabId = details.tabId;
		

		if(typeof this[tabId] == 'undefined'){
			this[tabId] = {}; // will have domain
		}

		if(details.type == 'main_frame'){
			this[tabId] = {};
			this[tabId].url = details.url;
			this[tabId].domain = URI.hostname;
		}

		if(details.type != 'main_frame' && details.type != 'sub_frame'){
			log("type untracked",details.type);
			return false;}

	
		if(typeof this[tabId][frameId] == 'undefined'){
			this[tabId][frameId] = {};
			//this[tabId][frameId].locked = false;
		}

				this[tabId][frameId] = 
				{
				uri:URI,
				url:details.url,
				//parentFrameId:details.parentFrameId,
				//type:details.type,
				domain:URI.hostname,
				seen:false,
				blocked:false,
				//locked:this[tabId][frameId].locked 
				};
			return true;
		},


	seen: function(details){
		var tabId = details.tabId;
		var frameId = details.frameId; 
		var url = details.url;
		var hostname = parseUri(url).hostname;
		//console.log("hostname: "+hostname+"...");
		if(typeof this[tabId] == 'undefined')
			return false;
		if(typeof this[tabId][frameId] == 'undefined')
			return false;
		if(this[tabId][frameId].url == url)
			return true;
		if(this[tabId][frameId].uri.hostname == hostname)
			return true;
		var newparts = chop(hostname);
		var oldparts = chop(this[tabId][frameId].domain);
		var newdomain = hostname;
		var olddomain = this[tabId][frameId].domain;
		for(p in newparts)
			if(new RegExp(p).test(olddomain))return true;
		for(q in oldparts)
			if(new RegExp(q).test(newdomain))return true;
			 
		//console.log("old domain: "+this[tabId][frameId].uri.hostname+"; new domain: "+hostname);
		return false;
	},

	debug: function(tabId, frameId){
			if(tabId == -1){
				return;
			}
			if(typeof this[tabId][frameId] != 'undefined'){
				explainUri(this[tabId][frameId].uri);
			}
		}
	}

