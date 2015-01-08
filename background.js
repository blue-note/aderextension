
var debug = true;

onBeforeRequest = function(details){
	log("details tabId",details.tabId);
	log("details frameId", details.frameId);
	log("details parent",details.parentFrameId);
	log("details type", details.type);
	var url = details.url;
	var tabId = details.tabId;
	var frameId = details.frameId;
	var trackable = false;
	var t = details.type;
	if(typeof master.frameTracker != 'undefined')
		trackable = master.track(details);

	log("trackable",trackable);
	//if(!trackable){
	//	return{cancel: false};
	//}
	var blocked = master.shouldBlock(details);
	//var locked = master.frameTracker[tabId][frameId].locked;
	
	// trap is true if we let frame escape blocking 
	log("url",url);
	log("block",blocked);

	if(blocked && ((t == "image") || (t == "object") || (t == "sub_frame") || (t == "other"))) { //if entry doesn't exist, blocked should be false

		
		log("blocking",t);
		//if(t == "script" || t == "stylesheet" || t == "other"){
			
			//return{cancel: blocked};
		//}

		var frameId = details.frameId; 
		log("frameId",frameId);
		var entry = master.frameTracker[tabId][frameId];
		var requestingId = (t == "sub_frame")? details.parentFrameId : details.frameId;
		log("requesting",requestingId);
		//if(typeof master.frameTracker[tabId][parentId] == 'undefined')
		//	return{cancel:false}; 

		var parentUrl = master.frameTracker[tabId][requestingId].url; // should probably be parentURL
		var parentDomain = parseUri(parentUrl).hostname;
		var needParent = false;
		if(requestingId == 0){
			if(parentDomain != master.frameTracker[tabId].domain)
				needParent = true;
		}
		
		
		log("parentUrl",parentUrl);
		var message = {command:"aim",url:details.url,parent:parentUrl,type:details.type, 
						getParent:needParent, tabId: tabId, frameId: frameId};
		log("tabId",tabId);
		log("frameId",frameId);

		chrome.tabs.sendMessage(tabId,message);
		return{cancel: false};
	}
	//master.debug(tabId, details.frameId);
	return{cancel: false};
// when something should be blocked, 
};

elementHandler = function(message, sender, response){
	if(message.command != "image")
		return; // not us
	//message from aim
	//put image url in response 
	var size = message.size;
	var width = size["width"];
	var height = size["height"];
	log("from aim","success");
	var imgObj = masterImageList.findBest(width,height);
	log("img width",imgObj.width);
	response(imgObj);


};







var master = new MasterFilter();
var masterImageList = new MasterImageList();
masterImageList.filterImages();
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ["http://*/*", "https://*/*"]}, ["blocking"]);
chrome.runtime.onMessage.addListener(elementHandler);




