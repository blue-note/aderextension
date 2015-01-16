var backgroundPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {

initialize();
$("form").each(function(index, value) {
    $(value).submit(function() {
    return false;
});
});

$("button[tag='account']").click(function() {

//this function should get input form data and console log it
/*
var form = document.getElementById("inputForm");
var email = form.email.value;
var password = form.password.value;
console.log("email: " + email + " password: " + password);
*/
//backgroundPage.openTab("website/signIn.html");
prefPage();

});

$("button[tag='save']").click(function() {
    console.log("SAVE");
     savePrefs();
    });

$("button[tag='prefs']").click(function() {
    prefPage();

    });
   
});


function defaultPage() {
 update();
  document.getElementById("prefs").style.display = 'none';  
  document.getElementById("signin").style.display = 'none';
  document.getElementById("defaultPage").style.display = 'block';
}

function savePrefs() {

    var prefs = {};
    var count = 0;
    $("#checkForm :checkbox").each(function(index, value) {
        var s = value.id;
        console.log(s);
        prefs[s] = $(value).is(":checked");
        if($(value).is(":checked")) count++;
        //console.log("prefs in popup: " + prefs);
        //console.log("prefs in popup: " + prefs[s]);
    });
    if (count == 0) prefs = {"tech": true, "music": false, "gaming": false, "fashion": false, "cosmetics": false};
    console.log("prefs after each: " + prefs);
    chrome.storage.sync.set({"preferences": prefs}, function() {
    //console.log("callbackFilter");
   //backgroundPage.masterImageList = new masterImageList();
    backgroundPage.masterImageList.filterImages();
    defaultPage();

  });


}


function prefPage() {
document.getElementById("signin").style.display = 'none';
document.getElementById("prefs").style.display = 'block'; 
document.getElementById("defaultPage").style.display = 'none';
}


function initialize() {
      // {

    chrome.storage.sync.get("sumImpressions", function(data) {
        if (undefine(data.sumImpressions)) {
        chrome.storage.sync.set({"sumImpressions":"0"});
        }
    });


   // }
}

function getImpressions() {
    chrome.storage.sync.get("sumImpressions", function(data) {
        console.log(data);    
    });
}

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};


function update() { 

    //incrementImpressions(4);
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        document.getElementById("impressionCount").innerHTML = data.sumImpressions;
        
    });
    
    calculateEarnings();
    
     chrome.storage.sync.get(["sumEarnings"], function(data) {
        document.getElementById("totalEarnings").innerHTML = "$" + data.sumEarnings.toFixedDown(2);
        
    });
    
    
  /*
    chrome.storage.sync.get(["sumEarnings"], function(data) {  
        document.getElementById("totalEarnings").innerHTML += " " + "$" + data.sumEarnings;       
    });
    */
}

