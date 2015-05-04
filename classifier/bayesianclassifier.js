$(document).ready(function() {

var adClassifier = new classifier();



});

var classifier = function() {

};

var train = false; 
var test = false;

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