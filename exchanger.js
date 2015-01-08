var debug = true;


begin = function(message, sender, response){
	// for now, just mess with the element
	if(message.command != "exchange")
		return; //not us
	var match = document.location.href.replace(/#.*$/, "") == message.parent.replace(/#.*$/, "");
	if(!match)
		return; // not this tab / frame 
	//log("match",match);
	exchange(message);
	
};









// pause unpause button will control .addListener and .removeListener 
chrome.runtime.onMessage.addListener(begin);

