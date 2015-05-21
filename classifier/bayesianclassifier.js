$(document).ready(function() {

var adClassifier = new classifier();

var input = {};

$("#queryForm").submit(function() {

  input["badWord"] = $('input[name=badWord]:checked', '#queryForm').val();
  input["thirdParty"] = $('input[name=thirdParty]:checked', '#queryForm').val();
  input["allow3rd"] = $('input[name=allow3rd]:checked', '#queryForm').val();
  input["embeddedUrl"] = $('input[name=embeddedUrl]:checked', '#queryForm').val();
  input["elType"] = $('input[name=elType]', '#queryForm').val();
  input["width"] = $('input[name=width]', '#queryForm').val();
  input["height"] = $('input[name=height]', '#queryForm').val();

  var mode = $('input[name=train]:checked', '#queryForm').val();
  if (mode == "on") adClassifier.trainInput(input);
  else adClassifier.testInput(input);

});

});

var classifier = function() {

};

var train = false; 
var test = false;

classifier.prototype = {

  numAds: 0,

  //the following numbers indicate the number of ads that had each of these features
  badWord: 0,
  thirdParty: 0,
  allow3rd: 0,
  embeddedUrl: 0,
  elType: {
  "script": 0, 
  "image": 0,
  "background": 0,
  "stylesheet": 0,
  "object": 0,
  "sub_frame": 0,
  "object_subrequest": 0,
  "media": 0, 
  "other": 0, 
  "xmlhttprequest": 0,
  "document": 0,
  "popup": 0
},

trainInput: function(input) {
  //adds features of this input ad to classifier training set

var that = this;
that.numAds++;

$.each(input, function(index, value) {
  if (value != undefined && value.length >= 2) {
  if (value.length == 2) this.index++;
  else that.elType[value]++;
}

});


  },

testInput: function(input) {

var result = this.classify(input);
console.log(result);

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

var prob_badWord = this.badWord/this.numAds;
var prob_thirdParty = this.thirdpartyUrl/this.numAds;
var prob_allow3rd = this.allow3rd/this.numAds;
var prob_embeddedUrl = this.embeddedUrl/this.numAds;

var isAd;
var prob = 1;
var badWord = (details.badWord == "on" ? prob_badWord : 1);
var third = (details.thirdParty == "on" ? prob_thirdParty : 1);
var thirdParty = (details.allow3rd == "on" ? prob_allow3rd : third);
var embeddedUrl = (details.embeddedUrl == "on" ? prob_embeddedUrl : 1);

if (details.elType == "image" || details.elType == "object" || details.elType == "sub_frame" || details.elType == "other") {
  var sizep = this.calculateSizeProb(details);
  prob = 1 * badWord * thirdParty * embeddedUrl * sizep;

} 

else
  prob = 1 * badWord * thirdParty * embeddedUrl;

if (prob < 0.5) return {"isAd": true, "pAd": prob};
else return {"isAd": false, "pAd": prob};

},

calculateSizeProb: function(details){
  var width = details.width;
  var height = details.height;
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