var devServerURL = "http://localhost:9000/"; 

document.getElementById("accountButton").onclick = function() {
  var email = $("[type='email']").val();
  console.log(email);

}


window.onload = function() {
console.log("onload function called");
var email = "janita";
var password = "janita";
var data = {"email": email, "password": password};
$.getJSON(devServerURL+"register", data, function(data) {console.log(data);});

}