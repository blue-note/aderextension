var serverURL = "http://ader.klgilbert.com/";
var devServerURL = "http://localhost:9000/";
var aderMode = false;


VERBOSE_DEBUG = true;

parseUri = function(url) {
  var matches = /^(([^:]+(?::|$))(?:(?:\w+:)?\/\/)?(?:[^:@\/]*(?::[^:@\/]*)?@)?(([^:\/?#]*)(?::(\d*))?))((?:[^?#\/]*\/)*[^?#]*)(\?[^#]*)?(\#.*)?/.exec(url);
  // The key values are identical to the JS location object values for that key
  var keys = ["href", "origin", "protocol", "host", "hostname", "port",
              "pathname", "search", "hash"];
  var uri = {};
  for (var i=0; (matches && i<keys.length); i++)
    uri[keys[i]] = matches[i] || "";
  return uri;
};

// Parses the search part of a URL into an key: value object.
// e.g., ?hello=world&ext=adblock would become {hello:"world", ext:"adblock"}
// Inputs: search: the search query of a URL. Must have &-separated values.
parseUri.parseSearch = function(search) {
  // Fails if a key exists twice (e.g., ?a=foo&a=bar would return {a:"bar"}
  var queryKeys = {};
  search.replace(/(?:^\?|&)([^&=]*)=?([^&]*)/g, function () {
    if (arguments[1]) queryKeys[arguments[1]] = unescape(arguments[2]);
  });
  return queryKeys;
};

getParentDomain = function(domain) {
  return domain.replace(/^.+?(?:\.|$)/, '');
};
// Strip third+ level domain names from the domain and return the result.
// Inputs: domain: the domain that should be parsed
//         keepDot: true if trailing dots should be preserved in the domain
// Returns: the parsed domain

parseUri.secondLevelDomainOnly = function(domain, keepDot) {
  var match = domain.match(/([^\.]+\.(?:co\.)?[^\.]+)\.?$/) || [domain, domain];
  return match[keepDot ? 0 : 1].toLowerCase();
};

/* DATABASE VERSION
function retrieveAds(adsToShow) {
    //output should be: url1,url2,url3,url1
    var ads = [];
    var newCount;
    //get counter
    chrome.storage.sync.set({"adCounter":"0"});//take this out later
    chrome.storage.sync.set({"filteredAds":{"ad1":"url1", "ad2":"url2","ad3":"url3"}});
   
    chrome.storage.sync.get(["adCounter"], function(counter) 
    { 
        //count is how many ads in this list we have incremented through previously
        var count = counter.adCounter;
        //console.log("adCounter: "+count);
        //copy new counter that will get incremented and re-stored
        newCount = count;
        
        //get filtered ads   
    chrome.storage.sync.get(["filteredAds"], function(adList) {
        var adsArray = $.map(adList.filteredAds, function(el) { return el; });
        //console.log("adsArray: "+adsArray);
        //var arr = $.map(adList, function(el) { return el; });
        //var adsArray = $.map(arr[0], function(el) { return el; });   
        var length = adsArray.length;
        //console.log("adsArray length:" + length);
        
        //i: number of ads i've incremented through in this loop
        //count: index of ads I should start incrementing at
        //newCount = count: new counter for how many ads I've incremented through total
        
        /* I have adsArray. I need to start at index count and increment #adsToShow number of times. whenever I get to the length of the array, I need to reset newCount to 0
        i will be how many times i've incremented, from 0 to adsToShow
        newCount will be the index I'm pulling the value from.
        
        */ /*
        
        var i = 0;
        while (i < adsToShow) {
         if (newCount >= length) {
          newCount = 0;   
         }
        ads.push(adsArray[newCount]);
        newCount++;
        i++;
        console.log("ads to display:" + ads);
        }
       
        console.log("newCount before callback: " + newCount);
        if (i >= adsToShow) {
              //to make sure that this is called after the loop is finished
    console.log("newCount before setting is:" + newCount);
    chrome.storage.sync.set({"adCounter":newCount});
    chrome.storage.sync.get(["adCounter"], function(count) {
    console.log("newCount in storage is:" +  count.adCounter);
        });
        }    
          
       });
                
    });
  
    return ads;    
    }
    
*/
function createAccount(email, password) {

 var data = {"email": email, "password": password};
    
 $.getJSON(devServerURL+"register", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
  //downloadAds();
    //initializing local storage attributes
  chrome.storage.sync.set({"adCounter":"0"}); 
  chrome.storage.sync.set({"isPaused":"false"});
  //chrome.storage.sync.set({"sumImpressions":"0"});
  chrome.storage.sync.set({"sumEarnings":"0"});
}

function loginAccount(email, password) {
    
    var data = {"username": username, "password": password};
    $.getJSON(devServerURL+"login", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
    
}

function isPaused() {
 chrome.storage.sync.get(["isPaused"], function(data) {
   pause = data.isPaused;
   return pause;
   
         
 });
    
}
    
function flipPause() {
   chrome.storage.sync.get(["isPaused"], function(data) {
   pause = data.isPaused;
       console.log("pause before:"+pause);
   if (pause == "false") {
   chrome.storage.sync.set({"isPaused":"true"});    
   }
   else {
     chrome.storage.sync.set({"isPaused":"false"});   
   }
   
         
 }); 
       
}
    
function saveAdPref(pref) {
    
//ads to array of prefs in local storage
   localStorage["preferences"] = pref;
    

}

                            
/* DATABASE VERSION
function filterAds(prefs) {
  //uses preferences from web token and creates new (or overwrites) filtered ad object in local storage 
    data = prefs;
   $.getJSON(devServerURL, data, function(data) { 
        //data will be a key-value object of indexes to ad urls that are filtered based on prefs
          data = {"ad1":"url1","ad2":"url2"};
          chrome.storage.sync.set({"filteredAds":data});
          }); 
    
}

*/
  
function downloadAds() {
 //download ads from database and put in local storage
    
    var ads = {}; 
    data = {"query": "downloadAds"};
    $.getJSON(devServerURL, data, function(data) { 
        //data will be a key-value object of indexes to ad urls
          data = {"ad1":"url1","ad2":"url2"};
          chrome.storage.sync.set({"allAds":data}, function() { 
            testStorage();
          });
    });
    
}
 

function incrementImpressions(num) {  
    /*

    var newImpressions;
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        console.log("get");
        var currImpressions = data.sumImpressions;
        newImpressions = parseInt(currImpressions) + num;
    chrome.storage.sync.set({"sumImpressions":newImpressions}, function() { 
    console.log('set');
    console.log("newImpressions: " + newImpressions);
    calculateEarnings();        
    });
    });

    */

    var newImpressions;
    var currImpressions;
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        console.log("get");
        currImpressions = data.sumImpressions;
        console.log("current: " + currImpressions);
        newImpressions = parseInt(currImpressions) + num;
    });

    chrome.storage.sync.set({"sumImpressions":newImpressions}, function() { 
    console.log('set');
    console.log("newImpressions: " + newImpressions);
    calculateEarnings();        
    });
  
    
}

function getImpressions() {
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        console.log("in get: " + data.sumImpressions);
       return data.sumImpressions;
    });

}



function setImpressions(num) {
chrome.storage.sync.set({"sumImpressions":num}, function() { 
    console.log("in set: " + num);
    calculateEarnings();        
    });

}





function calculateEarnings() {
    chrome.storage.sync.get(["sumImpressions"], function(data) {
       var impressions = data.sumImpressions; 
       var earnings = (impressions/1000)*3;
       chrome.storage.sync.set({"sumEarnings":earnings}); 
        
    });
    
}


function createPrefLists() {    
  var fashion = ["http://www.myredglasses.com/wp-content/uploads/2014/09/Tootsies-Digita-Ads-My-Red-Glasses-Blog-160x600-v1.png", "http://blog.freepeople.com/wp-content/uploads/2014/09/Sept_160x600.jpg", "http://www.myredglasses.com/wp-content/uploads/2014/09/Tootsies-Digita-Ads-My-Red-Glasses-Blog-160x600-v1.png"];
  var cosmetics = ["http://www.shareasale.com/image/49325/halloween_v1_banners-336x280.jpg", "http://www.sephora.com/contentimages/affiliates/freegift_728x90.jpg" ];
  var music = ["http://evoke.la/images/LadyGaga/PRG728x90.jpg", "http://www.ihiphopmusic.com/wp-content/uploads/2010/04/Ads-160x600.jpg"];
  var prefObj = {"fashion": fashion, "cosmetics":cosmetics, "music":music};
  return prefObj;  
    
}


function retrieveAds() {
    //an object which contains the three preference lists and a function getNext which pops out one url successively
   var adsGen = {};
   adsGen.prefObj = createPrefLists();
   adsGen.next = "fashion";
   adsGen.i = 0;
   adsGen.j = 0;
   adsGen.k = 0;
   adsGen.getNext = function() {
       if (adsGen.next == "fashion") {
        adsGen.next = "cosmetics";
        return adsGen.prefObj.cosmetics[adsGen.i];
           adsGen.i++;
           if (i >= adsGen.prefObj.fashion.length)
               adsGen.i = 0;
       }
        else if (adsGen.next == "cosmetics") {
            adsGen.next = "music";
            return adsGen.prefObj.cosmetics[adsGen.j];  
            adsGen.j++;
              if (j >= adsGen.prefObj.cosmetics.length)
               adsGen.j = 0;
        }
       
       else {
           adsGen.next = "fashion";
           return adsGen.prefObj.music[adsGen.k];
           adsGen.k++; 
             if (k >= adsGen.prefObj.music.length)
               adsGen.k = 0;
       }
       
       //need to post these to popup
       //incrementImpressions(1);
       calculateEarnings();
   }
    
   return adsGen; 
}


function testAds() {
    var ads = retrieveAds();
    var i = 0;
    while (i < 10) {
    console.log("nextad "+ ads.next + " " + ads.getNext()); 
    i++;
    }
       
}


    
function testStorage() {
   chrome.storage.sync.set({"allAds": {"ad1":"url1","ad2":"url2", "ad3":"url3"}});
   chrome.storage.sync.get(["allAds"], function(value) {
     console.log(value);
     console.log(Object.keys(value).length);
   });
    
}


MasterImageList = function()
{
this.smallArray = [];
//not in big or huge
this.bigArray = [];
//bigger than 40,000px area, less than 1,000,000
this.wideArray = [];
//width/height >= 2
this.tallArray = [];
//height/width >= 2
this.hugeArray = [];
//area > 1,000,000
};


MasterImageList.prototype = 
{
  filterImages: function() { 
    var that = this;
    this.smallArray = [];
  //not in big or huge
  this.bigArray = [];
  //bigger than 40,000px area, less than 1,000,000
  this.wideArray = [];
  //width/height >= 2
  this.tallArray = [];
  //height/width >= 2
  this.hugeArray = [];
  //area > 1,000,000
      /*array_of_images=*/returnImages(function(array_of_images) {
            for (index = 0; index < array_of_images.length; index++) {  
          var current_object=array_of_images[index];  
          var ratio=current_object.width/current_object.height;
          var invertedRatio=current_object.height/current_object.width;
          //log("obj url",current_object.url);
          //log("obj width",current_object.width);
          //log("obj height", current_object.height);
          if (invertedRatio>=2) that.tallArray.push(current_object);
          else if(ratio >=2) that.wideArray.push(current_object);
          else if(current_object.width*current_object.height>=1000000)
          that.hugeArray.push(current_object); 
          else if(current_object.width*current_object.height>=40000 && current_object.width*current_object.height<1000000) {
          that.bigArray.push(current_object);
                      }
          else {that.smallArray.push(current_object);}
          
      } 

      });


  },

  sortSmall: function() {
      var arr = this.smallArray;
      for (i=0; i < arr.length; i++) {
          for (j=i; j < arr.length-1; j++) { 
              var curr = (parseInt(arr[j].width) * parseInt(arr[j].height));
              var next = (parseInt(arr[j+1].width) * parseInt(arr[j].height));
              if (curr > next) {
                  var swap = curr;
                  curr = next;
                  next = swap;
              }
                  
          }
          
      }
  },

  sortBig: function() {
      var arr = this.bigArray;
      for (i=0; i < arr.length; i++) {
          for (j=i; j < arr.length-1; j++) { 
              var curr = (parseInt(arr[j].width) * parseInt(arr[j].height));
              var next = (parseInt(arr[j+1].width) * parseInt(arr[j].height));
              if (curr > next) {
                  var swap = curr;
                  curr = next;
                  next = swap;
              }
                  
          }
          
      }
    },

    sortWide: function() {
      //console.log("bigArray:"+master.bigArray);
      var arr = this.wideArray;
      for (i=0; i < arr.length; i++) {
          for (j=i; j < arr.length-1; j++) { 
              var curr = (parseInt(arr[j].width) * parseInt(arr[j].height));
              var next = (parseInt(arr[j+1].width) * parseInt(arr[j].height));
              if (curr > next) {
                  var swap = curr;
                  curr = next;
                  next = swap;
              }
                  
          }
          
        }
      },

      sortTall: function() {
      var arr = this.tallArray;
      for (i=0; i < arr.length; i++) {
          for (j=i; j < arr.length-1; j++) { 
              var curr = (parseInt(arr[j].width) * parseInt(arr[j].height));
              var next = (parseInt(arr[j+1].width) * parseInt(arr[j].height));
              if (curr > next) {
                  var swap = curr;
                  curr = next;
                  next = swap;
              }
                  
          }
          
      }
    },

    sortHuge: function() {
      var arr = this.hugeArray;
      for (i=0; i < arr.length; i++) {
          for (j=i; j < arr.length-1; j++) { 
              var curr = (parseInt(arr[j].width) * parseInt(arr[j].height));
              var next = (parseInt(arr[j+1].width) * parseInt(arr[j].height));
              if (curr > next) {
                  var swap = curr;
                  curr = next;
                  next = swap;
              }
                  
          }
          
      }
    },

    findBest: function(width, height) {
    if(!width && height)
      width = height / 2;
    if(!height && width)
      height = width / 2;
    if(!height && !width)
      {log("master.findBest","no size no best");}
    if(width == "auto"){
      width = 200;
      height = 200;
    }
   var pixels = width * height;
   var pixelRatio = width/height;
   var huge = pixels > 1000000;
   var big = pixels >= 40000;
   var small = !big;
   var wide = (width / height) >= 2;
   var tall = (height / width) >= 2;

   // huge  wide  tall  big  small 
   
   if(huge){
       return (this.findClosest(this.hugeArray,pixelRatio));}
      
   if(wide){
       return (this.findClosest(this.wideArray,pixelRatio));}
   
  if(tall){
       return (this.findClosest(this.tallArray,pixelRatio));}
      
   if(big){
       return (this.findClosest(this.bigArray,pixelRatio));}
   else{
       return (this.findClosest(this.smallArray,pixelRatio));}
  },

   findClosest: function (imageArray, pixelRatio) { // finds group within a range. //returns random 1; 0 - length
      const rangeOne = 0.5;
      const rangeTwo = 2;
      var min = 0;
      var max = imageArray.length;
      var length = max - min;
      var objectsInRange = [];
      var closestObj = {};
      var closestDist = Infinity;
      var aderModeList = [];
      log("image length",imageArray.length);

      for (var i = 0; i < imageArray.length; i++) {
          var obj = imageArray[i];
          var areaRatio = (obj.width/obj.height)/pixelRatio;
          var ratioDist = Math.abs(obj.width/obj.height - pixelRatio);

          if(areaRatio >= rangeOne && areaRatio <= rangeTwo && (obj.ader == aderMode)) {
            //console.log(obj.ader);
            objectsInRange.push(obj);
            
            if(ratioDist < closestDist) {
              //aderModeList.push(obj);
              log("obj",obj);
              closestObj = obj;
              closestDist = ratioDist;
              
            }

           
          }
          
      }

     for (var i = 0; i < imageArray.length; i++) {
        var obj = imageArray[i];
        var ratioDist = Math.abs(obj.width/obj.height - pixelRatio);
        if (ratioDist == closestDist && (obj.ader == true)) {
              aderModeList.push(obj);
            } 
            

     }


      var pick = Math.max(0,Math.floor(objectsInRange.length * Math.random() - .1));
      var aderPick = Math.max(0,Math.floor(aderModeList.length * Math.random() - .1));

      
      //var x = document.createElement("img");
      //x.src = closestObj.src;
      //console.log(x);
      if (aderMode) return aderModeList[aderPick];
      else return objectsInRange[pick]; 
  },

  filterPrefs: function() {
      initPics();
      chrome.storage.sync.get(["allImages"], function(data) {     
       for(var property in data) {
      alert(property + "=" + data[property]);
      }     
      chrome.storage.sync.get(["preferences"], function(data) {
       var prefs = data.preferences;
       var images = returnImages();
       var prefImages = [];
         
       for (var obj in images) {
          for (var pref in prefs) {
              if (obj.interest == pref) 
                  prefImages.push(obj);   
          }     
       }
       
     console.log("prefImages:" + prefImages);

       });
       });
    }
}

var classifier = function() {

};


classifier.prototype = {

  numAds: 55,
  //number of ads that were each of these things
  numbadWord: 15,
  numthirdpartyUrl: 35,
  numallow3rd: 15,
  numobfuscatedUrl: 20,
  numelTypes: {
  "script": 2, 
  "image": 25,
  "background": 5,
"stylesheet": 1,
"object": 17,
"sub_frame": 3,
"object_subrequest": 1,
"media": 22, 
"other": 20, 
"xmlhttprequest": 0,
"document": 0,
"popup": 0
},

  train: function() {
  //should receive a training set and set the prototype vars accordingly

  },


classify: function(details) {

/* details should be an object that includes: 

1. “ad” in url: true/false
2. 3rd party url: true/false
3. el type: img, iframe, flash, etc.
4. img size: width x height
5. do non-ads use 3rd party urls on this site: true/false
6. obfuscated url: true/false
*/
/* Edit 2
  At some point we'll calculate probabilities based on sample data, but for now
  we'll hardcode the probabilities. 
  Initial Weighting:
    BadWord = 0
    3rd Party = 0.5
    3rd Party & allows3rd = 1 (for sites that have 3rd party non ad elements)

    adSize = 0.25  (for wide, tall, and huge elements)
    regularSize = 0.5 (for big elements)
    escapeSize = 1 (for small elements)
    adSize & allowImage = 0.5
    regularSize & allowImage = 0.75
    escapeSize & allowImage = 1
*/
var isAd;
var prob = 1;

var badWord = (details.badWord ? 0 : 1);
var third = (details.thirdParty ? 0.5 : 1);
var thirdParty = (details.allow3rd ? 1 : third);




//calculate true/false vars

/*if (details.badWord) prob *= this.numbadWord/this.numAds;

if (details.thirdParty) prob *= (this.numthirdpartyUrl)/(this.numAds);
else prob *= (this.numAds - this.numthirdpartyUrl)/(this.numAds);

if (details.allow3rd) prob *= (this.numallow3rd)/(this.numAds);
else prob *= (this.numAds - this.numallow3rd)/(this.numAds);

//check elType and imgSize
prob *= (this.numelTypes[details.elType]/this.numAds);
*/

if (details.elType == "image" || details.elType == "object" || details.elType == "sub_frame" || details.elType == "other") {
  var sizep = this.calculateSizeProb(details.imgSize);
  prob = 1 * badWord * thirdParty * sizep;

} 
else
  prob = 1 * badWord * thirdParty;

console.log("probability: "+prob);

if (prob < 0.5) return {"isAd": true, "pAd": prob};
else return {"isAd": false, "pAd": prob};



},

calculateSizeProb: function(size){
  var width = size["width"];
  var height = size["height"];
  var pixels = width * height; 
  var huge = pixels > 1000000;
  var big = pixels >= 40000;
  var small = !big;
  var wide = (width / height) >= 2;
  var tall = (height / width) >= 2;

  
  var answer = (wide || tall) ? 0.25 : 0.5;
  answer = (small) ? 1: answer;

  return answer;
}


}
    
//console.log("bigArray after Sort "+master.bigArray);
    

//this beast takes in a master list of image objects (each with name, width, height, and preference) and places it into five lists of different size categories
//I need to sort each one in order of area 
//write a function to take in an object and find the closest img

/* 1. create a master object whose properties will be the different size array types
    2. call the function sortImages on this object
    3. write another function which sorts an array in the object by increasing area
    4. call this on each array in the object
    5. write a find function that takes in an object w height and width properties and returns the closest img

//do I need container?




*/

/*
var unknown_object={height:'10',width:'17'};


var object1={height:'23',width:'11'};
var object2={height:'7',width:'56'};
var object3={height:'13',width:'6'};
var array_of_images=[object1,object2,object3];

/*ic = Krees’ function ( t ); 
    (function takes in an object with a height and width value.
It then goes through a list of img elements,  and returns the one with the closest width and height values. )*/

//initialize master object







/*
var master = {};
master.filterImages =  
 
function(array_of_images) { 
    master.smallArray={};
    
    
    
    
    
    
    master.bigArray={};
    master.wideArray={};
    master.tallArray={};
    master.hugeArray={};
    master.container={};
    
    for(index = 0; index < array_of_images.length; index++) {
        var current_object=array_of_images[index];
        var ratio=current_object.width/current_object.height;
        var invertedRatio=current_object.height/current_object.width;
        //if the ratio of y/x is 2 or more then it's tall 
        if(invertedRatio>=2){tallArray[index]=invertedRatio; container[index]=tallArray[index]; console.log(invertedRatio+" invertedRatio");}
        //if x/y is 2 or more wide
        else if(ratio>=2){wideArray[index]=ratio; container[index]=wideArray[index]; console.log(ratio);}
        //if x * y is >170*240px big 
        else if(current_object.width*current_object.height>=40000 && current_object.width*current_object.height<1000000){
            bigArray[index]=ratio; container[index]=bigArray[index]; console.log(ratio);}
        //a minimum value if either width or height < 15px
        else if(current_object.width<15||current_object.height<15){
            smallArray[index]=ratio; container[index]=smallArray[index]; console.log(ratio);}
        else if(current_object.width*current_object.height>=1000000){
            hugeArray[index]=ratio; container[index]=hugeArray[index]; console.log(ratio);
        }
    }
    return container;
}

    
*/
    
    



  /**/
