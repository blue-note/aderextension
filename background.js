var debug = false;
var frameList = {};
var impressionCount = 0;
//impressionCount = getImpressions();


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
	else return{cancel: false};

	log("trackable",trackable);
	if(!trackable){
		//return{cancel: false};  //We still want it to block even if there is no entry
	}
	var blocked = master.shouldBlock(details); // will turn this into callback
	//var locked = master.frameTracker[tabId][frameId].locked;
	
	// trap is true if we let frame escape blocking 
	log("url",url);
	log("block",blocked.block);

	if((tabId > 0) & ((t == "image") || (t == "object") || (t == "sub_frame") || (t == "other"))) { //if entry doesn't exist, blocked should be false
		//var locked = master.frameTracker[tabId][frameId].locked;
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
		frameList[frameId] = !(undefine(frameList[frameId]));
		var message = {command:"aim",url:details.url,parent:parentUrl,type:details.type, 
						getParent:needParent, tabId: tabId, frameId: frameId, frameExist:frameList[frameId],
						badWord:blocked.badWord,thirdParty:blocked.thirdParty,allow3rd:blocked.allow3rd,
						obfuscated:blocked.obfuscated};
		log("tabId",tabId);
		log("frameId",frameId);

		chrome.tabs.sendMessage(tabId,message);
		return{cancel: false};
	}
	/* else if(blocked.block){
		return{cancel: blocked};
	}*/

	return{cancel: false};

};

elementHandler = function(message, sender, response) {
	if(message.command != "image")
		return; // not us
	//message from aim
	//put image url in response 
	var size = message.imgSize;
	var width = size["width"];
	var height = size["height"];
	log("from aim","success");
	var imgObj = masterImageList.findBest(width,height);
	if(undefine(imgObj))return;
	log("img width",imgObj.width);
	var locked = master.frameTracker[message.tabId][message.frameId].locked;
	/*if (!locked) {
		incrementImpressions(1);
		console.log("impression: " + imgObj.name);
		master.frameTracker[message.tabId][message.frameId].locked = true;
	}
	*/

	var result = bayes.classify(message);
	console.log("result: " + result.isAd);
	console.log("prob: " + result.pAd);
	if (result.isAd){
		//console.log("isAd: " + result.isAd);
		response(imgObj);
	}

	else
		response(); 


	//response(imgObj);


};



function impressions(message, sender, response) {
if (message.command != "impressions") return;
//incrementImpressions(1);
console.log("impressionCount: " + impressionCount);
setImpressions(++impressionCount);
/*
console.log("impressionCount: " + impressionCount);
var first = (impressionCount == 1);
console.log("impressions called");
response(first, impressionCount);
*/

}

var bayes = new classifier();
var master = new MasterFilter();
var masterImageList = new MasterImageList();
masterImageList.filterImages();
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ["http://*/*", "https://*/*"]}, ["blocking"]);
chrome.runtime.onMessage.addListener(elementHandler);
chrome.runtime.onMessage.addListener(impressions);




