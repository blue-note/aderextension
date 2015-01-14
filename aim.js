// saves all elements it encounters 
debug = false;
extensionID = chrome.runtime.id;


takeAim = function(message,sender){
	if(message.command != "aim")
		return; // not us
	var match = document.location.href.replace(/#.*$/, "") == message.parent.replace(/#.*$/, "");
	if(!match){
		//log("url",message.url);
		//log("parent", message.parent);
		//log("here",document.location.href);
		//console.log(" ");
		return;
	}

	//log(document.location.href.replace(/#.*$/,""), message.parent.replace(/#.*$/,""));
	aim(message);
	

};

aim = function(details){
	if(details.done){
		var ele = document.getElementsByClassName("aderized");
		for(var j = 0; j<ele.length;j++){
			log("aderized",ele[j]);
		}
		log("done",details.done);
		return;
	}
	var el = getElement(details);

	if(typeof el == 'undefined')
		return;

	var message = {}
	var size = getSize(el);
	message.size = size;
	message.command = "image";
	//var result = {size:s, element:el}
	shrink(el);
	if(undefined != size){
		log("aim","attempting insert");
		chrome.runtime.sendMessage(extensionID,message,function(imgObj){
			if(imgObj)
			{
				//console.log("yup");
				//console.log("response: ");
				console.log(imgObj.name); //ps3 here but can't get in
				console.log(document.location.href);
				log("response came back",imgObj.width + " "+ imgObj.height);
				insert(el,size,imgObj);
			}
	});
}
	// give it back to background to save 

	if(details.done){
		
		
	}
};

shrink = function(el){

	if(typeof el == 'undefined')
		return;
	
	if(typeof el.dataset != 'undefined'){
		if(typeof el.dataset.aderized != 'undefined')
		log("aderized",el.dataset.aderized);
	}

	if(el.nodeName == "FRAME")
	{
		log("parentShrink",el);
		shrinkByParent(el);
		return;
	}
	if(el.nodeName == "script"){
		log("script no shrink",details.type);
	}
	if(typeof el.style == 'undefined')
		return;

	var display = el.getAttribute("display") || window.getComputedStyle(el)["display"];
	var visibility = el.getAttribute("visibility") || window.getComputedStyle(el)["visibility"];
	var opacity = el.getAttribute("opacity") || window.getComputedStyle(el)["opacity"];
	el.style.setProperty("display", "none", "important");
    el.style.setProperty("visibility", "hidden", "important");
    el.style.setProperty("opacity", "0", "important");
    var w = (el.width === undefined ? -1 : el.width);
    var h = (el.height === undefined ? -1 : el.height);
    el.style.setProperty("background-position", w + "px " + h + "px");
    el.setAttribute("width", 0);
    el.setAttribute("height", 0);
    el.setAttribute("data-display", display);
    el.setAttribute("data-visibility", visibility);
    el.setAttribute("data-opacity", opacity);
    //el.setAttribute("data-aderized",1);
    log("shrink","successful");

    //if(!details.done)
    	//shrink(details);
	//create possible selectors for it
	//try document.querySelectorAll on all possible selectors 
	//return element 

};

shrinkByParent = function (el){
	var parent = el.parentNode;
	if(typeof parent == 'undefined'){
		log("parent undefined",details.url);
		return;
	}

	log("parent found",parent);
	var cols = (parent.getAttribute("cols") || "").indexOf(",") > 0;
	var attr = cols? "cols":"rows";
	log("attr",parent.getAttribute(attr));
	if(parent.getAttribute(attr) == null){
		log("parent rows/cols",attr);
		return;
	}
	var elies = parent.getAttribute(attr).split(",");
	for(var i = 0; i < elies.length; i++)
		log(i,elies[i]);

};

insert = function(el,size,imgObj){
	var pic = document.createElement("img");
	pic.src = imgObj.src;
	pic.classList = "ader";
	var w = (size.width == "auto")? size.width: size.width + "px";
	var h = (size.height == "auto")? size.height: size.height + "px";
	var css = {
      width: w,
      height: h,
      background: "url(" + imgObj.url + ") no-repeat",
      //backgroundPosition: "-" + placement.left + "px -" + placement.top + "px",
      //backgroundSize: placement.x + "px " + placement.y + "px",
      backgroundSize: imgObj.width + "px"+ imgObj.height + "px",
      //margin: placement.offsettop + "px " + placement.offsetleft + "px",
      // nytimes.com float:right ad at top is on the left without this
      "float": (window.getComputedStyle(el)["float"] || undefined)
    };

    for (var i in css) {
      pic.style[i] = css[i];
    }

    for (var k in {position:1,left:1,top:1,bottom:1,right:1}) {
      pic.style[k] = window.getComputedStyle(el)[k];
      log(k,pic.style[k])
    }
    pic.style["display"] = el.dataset.display;
    pic.style["visibility"] = el.dataset.visibility;
    pic.style["opacity"] = el.dataset.opacity;

    el.parentNode.insertBefore(pic, el);
    log("insert","end");

}

getSize = function(el){

	var width = window.getComputedStyle(el)["width"];
	var height = window.getComputedStyle(el)["height"];


	var w = (el.getAttribute('width') || 
		window.getComputedStyle('width')||"").match(/^([1-9][0-9]+)(.*)(px)?$/);
	var h = (el.getAttribute('height') || 
		window.getComputedStyle('height')||"").match(/^([1-9][0-9]+)(.*)(px)?$/);
	
	
    if (w){
    	log("w",w[1]);
        width = parseInt(w[1]);}
    if (h){
    	log("h",h[1]);
    	height = parseInt(h[1]);}

    if(!height && !width){
    	log(width,height);
    	log("no size",typeof el);
    	return;
    }

    if(!w & h){
    	width = height/8;
    }
    if(!h & w){
    	height = width/8;
    }
    log("get width",width);
    log("get height",height);

    var size = {};
    var pixels = width * height;
    size["width"] = width;
    size["height"] = height;
	size["huge"] = pixels > 1000000;
	size["big"] = pixels >= 40000;
	size["small"] = !size["big"];
	size["wide"] = (width / height) >= 2;
	size["tall"] = (height / width) >= 2;

    return size;
};

getElement = function(details){
	var type = details.type;
	if(!(type == "image" || type == "sub_frame" || type == "object"))
	{
		log("not image",type);
		log("url",details.url);
		return;
	}
	//log("got a match",type);
	var types = {
	  NONE: 0,
      script: 1,
	  image: 2,
	  background: 3,
	  stylesheet: 4,
	  'object': 5,
	  sub_frame: 6,
	  object_subrequest: 7,
	  media: 8,
	  other: 9,
	  xmlhttprequest: 10,
	  'document': 11,
	  elemhide: 12,
	  popup: 13,
	};

	tags = {}
	tags[types['image']] = {IMG:1};
	tags[types['sub_frame']] = {IFRAME:1, FRAME:1};
	tags[types['object']] = {"OBJECT":1, EMBED:1}

	srcdata = selectors(details.url);
	for (var i=0; i < srcdata.length; i++) {
      for (var tag in tags[types[type]]) {
      	//log("tag",tag);
        var src = srcdata[i];
        var attr = (tag === "OBJECT" ? "data" : "src");
        var selector = tag + '[' + attr + src.op + '"' + src.text + '"]';
        //log("selector",selector);

        var results = document.querySelectorAll(selector);
        //log("[DEBUG]", "  ", results.length, "results for selector:", selector);
        if (results.length) {
        	log("result for",selector);
        	log("height",window.getComputedStyle(results[0])["height"]);
        	log("width",window.getComputedStyle(results[0])["width"]);
        	if(typeof results[0].dataset != 'undefined')
        	if(typeof results[0].dataset.aderized != 'undefined'){
        		
        		if(!details.done){
        			details.done = true;
        			setTimeout(function(){shrink(details)}, 2000);
        		}
        		return results[0];
        	}
        	results[0].setAttribute("data-aderized","1");
        	results[0].classList.add("aderized");
        	//chrome.runtime.sendMessage(extensionID,details);
        	return results[0];
        	
        }
        else
        	log("no results for",selector)
      }
	}
	details.done = true;

}

selectors = function(url){

	var url_parts = parseUri(url), page_parts = document.location;
    var results = [];
    // Case 1: absolute (of the form "abc://de.f/ghi" or "//de.f/ghi")
    results.push({ op:"$=", text: url.match(/\:(\/\/.*)$/)[1] });
    if (url_parts.hostname === page_parts.hostname) {
      var url_search_and_hash = url_parts.search + url_parts.hash;
      // Case 2: The kind that starts with '/'
      results.push({ op:"=", text: url_parts.pathname + url_search_and_hash });
      // Case 3: Relative URL (of the form "ab.cd", "./ab.cd", "../ab.cd" and
      // "./../ab.cd")
      var page_dirs = page_parts.pathname.split('/');
      var url_dirs = url_parts.pathname.split('/');
      var i = 0;
      while (page_dirs[i] === url_dirs[i] 
             && i < page_dirs.length - 1 
             && i < url_dirs.length - 1) {
        i++; // i is set to first differing position
      }
      var dir = new Array(page_dirs.length - i).join("../");
      var path = url_dirs.slice(i).join("/") + url_search_and_hash;
      if (dir) {
        results.push({ op:"$=", text: dir + path });
      } else {
        results.push({ op:"=", text: path });
        results.push({ op:"=", text: "./" + path });
      }
    }

    return results;

}


chrome.runtime.onMessage.addListener(takeAim);



