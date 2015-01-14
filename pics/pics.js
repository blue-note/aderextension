//initial files 


function imgObj(filename, width, length, preference) {
    this.src = chrome.extension.getURL("pics/"+preference+"/"+filename);
    this.width = width;
    this.height = length;
    this.name = filename;
    this.preference = preference;

    toImage = function(){
      var image = new Image().src = url;
      image.dataset.ader = true;
      image.dataset.name = this.filename;
      image.dataset.preference = this.preference; 
      return (image);}
    }

var f = "fashion";
var t = "tech";
var m = "music";
var c = "cosmetics";
var g = "gaming";

var imageArray = [new imgObj("Beyonce160x600.jpg", 160, 600, m),
                 new imgObj("blackmaillot336x280.jpg",336, 280,f),
                 new imgObj("Bootiful336x280.jpg",336 ,280, f),
                 new imgObj("candy.gif",300,250, c),
                  new imgObj("GDN336x280.jpg",336,280,f),
                  new imgObj("gilt_banner.jpg",620,250,f),
                  new imgObj("harlow.jpg",300,250,f),
                  new imgObj("LadyGaga728x90.jpg",728,90,m),
                  new imgObj("mbl_300x600.jpg",300,600,f),
                  new imgObj("plush.jpg",336,280,f),
                  new imgObj("Sephora728x90.jpg",728,90,f),
                  new imgObj("Sept160x600.jpg",160,600,f),
                  new imgObj("stila.gif",300,250,f),
                  new imgObj("Tootsies160x600.png",160,600,f),
                  new imgObj("alienware_160x600.png",160,600,t),
                  new imgObj("crunchy_160x600.jpg",160,600,t),
                  new imgObj("DS336x280.jpg",336,280,t),
                  new imgObj("iphone160x600.jpg",160,600,t),
                  new imgObj("javascript214x178.jpg",214,178,t),
                  new imgObj("kindle300x250.jpg",300,250,t),
                  //new imgObj("onslaught729x90.jpg",729,90,t),
                  new imgObj("ros336x280.png",336,280,t),
                  new imgObj("rumble336x280.jpg",336,280,t),
                  new imgObj("V3_336x280.jpg",336,280,t),
                  new imgObj("WOW160x600.png",160,600,t),
                  new imgObj("barack.jpg",300,250,"mis"),
                  new imgObj("diablo.jpg", 336, 280, g),
                  new imgObj("ds.jpg", 336, 280, g),
                  new imgObj("rumble.jpg", 336, 280, g),
                  new imgObj("ps3.jpg", 300, 250, g),
                  new imgObj("runescape.jpg", 766, 142, g),
                  new imgObj("halloween336x280.jpg", 336, 280, c),
                  new imgObj("stila300x250.gif", 300, 250, c),
                  new imgObj("fragrance300x250.jpg", 300,250, c),
                  new imgObj("sephora728x90.jpg", 728, 90, c),
                  new imgObj("katy686x160.jpg", 686, 160, c),
                  new imgObj("aderBanner.jpg", 728, 90, c),
                  new imgObj("aderBanner.jpg", 728, 90, t),
                  new imgObj("shave.jpg", 300, 250, "mis"),
new imgObj("tennis.jpg", 300, 600, "mis"),
new imgObj("staples.jpg", 600, 267, "mis"),
new imgObj("priceline.jpg", 595, 165, "mis"),
new imgObj("studyabroad.jpg", 710, 150, "mis"),
new imgObj("office.jpg", 800,229, "mis"),
                  new imgObj("note.png", 500, 500, m)];
                  

/*
var imageArray = [
        new Image().src = "https://www.shareasale.com/image/49325/halloween_v1_banners-336x280.jpg",
        new Image().src = "https://www.shareasale.com/image/49543/336-280-black-maillot.jpg",
        new Image().src = "https://1.bp.blogspot.com/-8yX1DlezwWk/UxiAjn0agfI/AAAAAAAARfI/khCPFa97syQ/s1600/GDN336x280_launch2.jpg",
        new Image().src = "https://content.flexlinks.com/SharedImages/Products/815220/886228.gif",
        new Image().src = "https://content.flexlinks.com/SharedImages/Products/252275/620228.gif", 
        new Image().src = "https://2hs1ga4co2vozkshf4prujwp.wpengine.netdna-cdn.com/wp-content/uploads/2014/03/pcln-SpringSale2014-300x250-banner-v1a.jpg",
        new Image().src = "https://www.sephora.com/contentimages/affiliates/freegift_728x90.jpg",
        new Image().src = "https://evoke.la/images/LadyGaga/PRG728x90.jpg",
        new Image().src = "https://blog.freepeople.com/wp-content/uploads/2014/09/Sept_160x600.jpg",
        new Image().src = "https://www.myredglasses.com/wp-content/uploads/2014/09/Tootsies-Digita-Ads-My-Red-Glasses-Blog-160x600-v1.png",
        new Image().src = "https://www.ihiphopmusic.com/wp-content/uploads/2010/04/Ads-160x600.jpg",
        new Image().src = "https://files.nyu.edu/pyl208/public/v9/images/design/gilt/gilt_banner1.jpg",
        new Image().src = "https://musicblvd.files.wordpress.com/2013/11/300x600mb1.jpg?w=748",
        new Image().src = "https://musicblvd.files.wordpress.com/2013/11/300x600mb1.jpg?w=748",
        new Image().src = "https://us.datafeeds.bluecherrygroup.com/tennisexpress/ir/Nike%20Lunar%20Ballistec%20300x600.jpg",
        new Image().src = "https://assets.macys.com/navapp/dyn_img/cat_splash/0819_Katy_Perry_KQ_banner_1101520.jpg"

];

*/

returnImages = function(callback){
  // returns array of imageobjects matching preferences saved in local storage
  // technology, music, gaming, fashion, cosmetics,
  const interests = ["tech","music","gaming","fashion","cosmetics"];
  //var optionsTest = {"tech": true, "music": false, "gaming": false, "fashion": true, "cosmetics": false};
  //var options = optionsTest;
  var storagePrefs;
  chrome.storage.sync.get(["preferences"], function(data) {
    storagePrefs = data["preferences"];  
    var options = storagePrefs;
    callback(each(options));
  });
  
/*
  if(!undefine(storagePrefs)) {
    options = storagePrefs;
}
*/
  // imageArray has all images that exist
  
};

function each(options) {
  var fuzeArray = [];
    $.each(options, function(index, value) {
    if (value) {
      for(j = 0; j < imageArray.length; j++){
        //console.log(imageArray[j].preference);
        if(imageArray[j].preference == index) {
          fuzeArray.push(imageArray[j]);

        }
      }
    } 
  });

    return fuzeArray; //imageArray
}

function initPics(){
    //if(null == localStorage["initialized"]){
        localStorage["initialized"] = 1;
        //localStorage["allImages"] = imageArray;
        chrome.storage.sync.set({"allImages":imageArray}, function() {  
            console.log("imageArray"+ imageArray);
        });
        
   // }
}

