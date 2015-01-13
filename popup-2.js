var backgroundPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
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

    savePrefs();
    defaultPage();

    });


$("button[tag='prefs']").click(function() {
    prefPage();

    });


     
});


function defaultPage() {
  document.getElementById("prefs").style.display = 'none';  
  document.getElementById("signin").style.display = 'none';
  document.getElementById("defaultPage").style.display = 'block';
}

function savePrefs() {
    var prefs = [];
    $("#checkForm :checkbox").each(function(index, value) {
        prefs[index] = $(value).is(":checked");
    });
  localStorage["preferences"] = prefs;
}


function prefPage() {
document.getElementById("signin").style.display = 'none';
document.getElementById("prefs").style.display = 'block'; 
document.getElementById("defaultPage").style.display = 'none';
}


function initialize() {
    //if(null == localStorage["initialized"])
      // {
    chrome.storage.sync.set({"sumImpressions":0});
    chrome.storage.sync.set({"preferences":["technology"]}, function() {
    });
    initPics();
   // }
}

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};


function update() { 
    //NEED TO UPDATE TO THIS VERSION: NO MASTER OBJECT
    /*
    {
    master.filterImages();
   // master.filterPrefs();
   //for testing
    var object1={height:'53000',width:'1'};
    var object2={height:'60000',width:'1'};
    var object3={height:'45000',width:'1'};
    var array_of_images=[object1,object2,object3];
    master.filterImages(array_of_images);
    master.sortSmall();
    }
    */
    incrementImpressions(4);
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        document.getElementById("impressionCount").innerHTML += " "+ data.sumImpressions;
        
    });
    
    calculateEarnings();
    
     chrome.storage.sync.get(["sumEarnings"], function(data) {
        document.getElementById("totalEarnings").innerHTML += " "+"$"+     data.sumEarnings.toFixedDown(2);
        
    });
    
    
  /*
    chrome.storage.sync.get(["sumEarnings"], function(data) {  
        document.getElementById("totalEarnings").innerHTML += " " + "$" + data.sumEarnings;       
    });
    */
}



function generateButtons() {
    createRadioElement("fashion");
    createRadioElement("cosmetics");
    createRadioElement("music");
    
}


function createRadioElement(name) {
    var radioHtml = '<input type="radio" name="' + name + '"';
    radioHtml += '/> ' + name + '<br>';
    
    var radioFragment = document.createElement('div');
    radioFragment.setAttribute("name",name);
    radioFragment.setAttribute("checked","false");

    
    radioFragment.innerHTML = radioHtml;
    radioFragment.addEventListener("click", function() {
        var pref = radioFragment.getAttribute("name");
        saveAdPref(pref);
    });
    
    document.body.appendChild(radioFragment);
    //return radioFragment.firstChild;
    


   
    
}