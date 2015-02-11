//binary search on master image organizer 
// looking for best picture to replace space with 
    


function undefine(obj){
    return (typeof obj == 'undefined');
}

explainUri = function(uri){
  console.log("Hostname: "+uri.hostname);
  console.log("href: "+uri.href);
  console.log("origin: "+uri.origin);
  console.log("protocol: "+uri.protocol);
  console.log("host: "+uri.host);
  console.log("port: "+uri.port);
  console.log("pathname: "+uri.pathname);
  console.log("search: "+uri.search);
  console.log("hash: "+uri.hash);
 }

chop = function(word)
  {
    var splitter = /[\/.\:_-]/;
    var s = word.split(splitter);
    var x = [];
    //console.log(s.length);
    for(i = 0; i < s.length-2; i++){
      if(s[i] != "www" && s[i].length >= 3)
        x.push(s[i]); 
    }
    return x;
  }

log = function(word, message){
    //var debug = true;
    return;
    if(!debug) return;
    console.log(word + ": "+message);
}

inside = function(word1, word2){
    var r = new RegExp(word1);
    return r.test(word2); // is word 1 inside word 2

}
    // hugeArray >= Images with 1000,000 pixels
    // bigArray >= 40,000 pixels
    // wideArray : width / height >= 2
    // tallArray : height / width >= 2
    // smallArray : !big
     
    
