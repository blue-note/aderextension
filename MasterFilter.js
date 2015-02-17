//accepted domains, 
	//cache safewords, cache blocked domains, 
// perm blocked words, perm blocked domains (probably from file)

//should tell me whether or not I should block a url, and save the answer (frameId)

function MasterFilter(){
	this.frameTracker = new FrameTracker();
	//frameTracker[tabId].domain (main domain)
	this.domains = {};
	//domains[tracker[tabId].domain].safewords (main domain has safewords); 
	this.tainted = {};
		// Questionable URL words get saved 
	this.badwords = ["ad","ads","doubleclick","smartsheet","openx","googlesyndication"];
	this.checks = ["load"];
		// words that make a URL questionable 
	//this.domains["foo.bar"].safewords should give me all the safe words foo.bar 

};


MasterFilter.prototype = {

	track: function(details){
		var tabId = details.tabId;
		var tracker = this.frameTracker;
		var entry = tracker.track(details);
		if(entry){
			var domain = entry.domain;
			log("main domain",tracker[tabId].domain);
		}
		return entry;

		
		
	},

	shouldBlock: function(details){
		// checks to see if any word from badwords is in the url 
		// if third party, does it appear often (meaning it's a server they use)
		var tracker = this.frameTracker;

		var message = {};
		message.block = false; // set to false for more pruning  
		message.badWord = false;
		message.thirdParty = false;
		message.elType = details.type;
		message.size = {};
		message.size["height"] = 0;
		message.size["width"] = 0;
		message.allow3rd = false;  // Will make an allow3rd method later 
		message.obfuscated = false; 


		if(details.tabId == -1){
			log("oldtab", "cannot block") // old tab 
			return message;
		}

		
		var domain = parseUri(details.url).hostname;
		var mainDomain = tracker[details.tabId].domain;
		if(!inside(mainDomain,details.url))//(domain == this.frameTracker[details.tabId].domain)
			{ 
		if(this.domains[mainDomain]){
			if(!undefine(domains[mainDomain].thirdParty)) {
				message.thirdParty = true;
				message.block = true; //unnecessary 
			}
			else
				this.domains[mainDomain].thirdParty = false;
		}
			}


		badwords = this.badwords;
		for (i in badwords){
			if(inside(badwords[i],details.url))
			{
				if(inside("load",details.url))
				{
					log("safe word","load")
					if(badwords[i],"load")
						continue;
				}
					
				log("url",details.url)
				log("badword", badwords[i]);
				//log("tabid",details.tabId)
				message.badWord = true;
				message.block = true;
			}
		}

	return message; // if nothing was found
	},

	allow3rd: function(domain){
		domains[domain].allow3rd = true; 
	},

	allowImage: function(domain){
		domains[domain].allowImage = true;
	},

	addTainted: function(domain){
		if(typeof this.tainted[domain] == 'undefined')
			this.tainted[domain] = 1;
	},
	parentBlocked: function(tabId,frameId){},

	exists: function(tabId,frameId){
		if(typeof this.frameTracker[tabId][frameId] == 'undefined')
			return false;
		else
			return true; 
	},

	checkSafeWords: function(tabId,frameId){},

	thirdParty: function(tabId,frameId){
		if(typeof tabId != 'undefined' && typeof frameId != 'undefined'){
		var domain = this.frameTracker[tabId].domain;
		var other = this.frameTracker[tabId][frameId].uri;
		var otherurl = this.frameTracker[tabId][frameId].url;
		return (domain != other && (new RegExp(domain).test(otherurl))); 
		}
		else
			return true;
	},
	
	addSafeWords: function(domain,list){
		if(typeof this.domains[domain] == 'undefined')
			this.domains[domain] = 1;
		console.log(list);
		if(typeof this.domains[domain].safewords == 'undefined')
			this.domains[domain].safewords = [];
		//var safewords = this.domains[domain].safewords;
		for(word in list){
			if(this.domains[domain].safewords.indexOf(word) == -1)
				this.domains[domain].safewords.push(word);
		}
	},

	locked: function(tabId,frameId){
		var result = this.frameTracker[tabId][frameId].locked;
		this.frameTracker[tabId][frameId].locked = true;
		return result;

	},

	debug: function(tabId,frameId){
		this.frameTracker.debug(tabId,frameId);
	}

};
