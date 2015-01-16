//initial files 


function imgObj(filename, width, length, preference, ader) {
    this.src = chrome.extension.getURL("pics/"+preference+"/"+filename);
    this.width = width;
    this.height = length;
    this.name = filename;
    this.preference = preference;
    this.ader = ader || false;

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
                  new imgObj("bally.jpg",480,340,f),
                  new imgObj("harlow.jpg",300,250,f),
                  new imgObj("sephora728x90.jpg", 728, 90, f),
                  new imgObj("LadyGaga728x90.jpg",728,90,m),
                  new imgObj("plush.jpg",336,280,f),
                  new imgObj("Sept160x600.jpg",160,600,f),
                  new imgObj("Tootsies160x600.png",160,600,f),
                  new imgObj("lanvin.jpg",990,417,f),
                  new imgObj("alienware_160x600.png",160,600,t),
                  new imgObj("crunchy_160x600.jpg",160,600,t),
                  new imgObj("iphone160x600.jpg",160,600,t),
                  new imgObj("javascript214x178.jpg",214,178,t),
                  new imgObj("kindle300x250.jpg",300,250,t),
                  new imgObj("onslaught729x90.jpg",729,90,g),
                  new imgObj("V3_336x280.jpg",336,280,t),
                  new imgObj("WOW160x600.png",160,600,g),
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
                  new imgObj("toxinfree.jpg", 160, 600, c),
                  new imgObj("revlon.jpg", 2473, 3289, c),
                  
new imgObj("tennis.jpg", 300, 600, "mis"),
new imgObj("staples.jpg", 600, 267, "mis"),
new imgObj("priceline.jpg", 595, 165, "mis"),
new imgObj("studyabroad.jpg", 710, 150, "mis"),
new imgObj("office.jpg", 800,229, "mis"),
new imgObj("cosmetics-120x240.png", 120,240, c,true),
new imgObj("cosmetics-120x60.png", 120, 60, c,true),
new imgObj("cosmetics-120x600.png", 120, 600, c,true),
new imgObj("cosmetics-120x90.png", 120, 90, c,true),
new imgObj("cosmetics-125x125.png", 125, 125, c,true),
new imgObj("cosmetics-160x600.png", 160, 600, c,true),
new imgObj("cosmetics-180x215.png", 180, 215, c,true),
new imgObj("cosmetics-234x60.png", 234, 60, c,true),
new imgObj("cosmetics-240x400.png", 240, 400, c,true),
new imgObj("cosmetics-250x250.png", 250, 250, c,true),
new imgObj("cosmetics-300x100.png", 300, 100, c,true),
new imgObj("cosmetics-300x600.png", 300, 600, c,true),
new imgObj("cosmetics-336x280.png", 336, 280, c,true),
new imgObj("cosmetics-468x60.png", 468, 60, c,true),
new imgObj("cosmetics-720x300.png", 720, 300, c, true),
new imgObj("cosmetics-728x90.png", 728, 90, c,true),
new imgObj("cosmetics-88x31.png", 88, 31, c,true),

new imgObj("fashion-120x240.png", 120, 240, f, true),
new imgObj("fashion-120x60.png", 120, 60, f, true),
new imgObj("fashion-120x600.png", 120, 600, f, true),
new imgObj("fashion-120x90.png", 120, 90, f, true),
new imgObj("fashion-125x125.png",125, 125, f, true),
new imgObj("fashion-160x600.png",160, 600, f, true),
new imgObj("fashion-180x150.png",180, 150, f, true),
new imgObj("fashion-234x60.png",234, 60, f, true),
new imgObj("fashion-240x400.png",240, 400, f, true),
new imgObj("fashion-250x250.png",250, 250, f, true),
new imgObj("fashion-300x100.png",300, 100, f, true),
new imgObj("fashion-300x250.png",300, 250, f, true),
new imgObj("fashion-300x600.png",300, 600, f, true),
new imgObj("fashion-336x280.png",336, 280, f, true),
new imgObj("fashion-468x60.png",468, 60, f, true),
new imgObj("fashion-720x300.png",720, 300, f, true),
new imgObj("fashion-728x90.png",728, 90, f, true),
new imgObj("fashion-88x31.png",88, 31, f, true),

new imgObj("music-120x240.png", 120,240,m, true),
new imgObj("music-120x60.png", 120,60,m, true),
new imgObj("music-120x600.png", 120,600,m, true),
new imgObj("music-120x90.png", 120,90,m, true),
new imgObj("music-125x125.png", 125,125,m, true),
new imgObj("music-160x600.png", 160,600,m, true),
new imgObj("music-180x150.png", 180,150,m, true),
new imgObj("music-234x60.png", 234,60,m, true),
new imgObj("music-240x400.png", 240,400,m, true),
new imgObj("music-250x250.png", 250,250,m, true),
new imgObj("music-300x100.png", 300,100,m, true),
new imgObj("music-300x250.png", 300,250,m, true),
new imgObj("music-300x600.png", 300,600,m, true),
new imgObj("music-336x280.png", 336,280,m, true),
new imgObj("music-468x60.png", 468,60,m, true),
new imgObj("music-720x300.png", 720,300,m, true),
new imgObj("music-728x90.png", 728,90,m, true),
new imgObj("music-88x31.png", 88,31,m, true),

new imgObj("tech-88x31.png", 88,31,t, true),
new imgObj("tech-120x60.png", 120,60,t, true),
new imgObj("tech-120x90.png", 120,90,t, true),
new imgObj("tech-120x240.png", 120,240,t, true),
new imgObj("tech-120x600.png", 120,600,t, true),
new imgObj("tech-125x125.png", 125,125,t, true),
new imgObj("tech-160x600.png", 160,600,t, true),
new imgObj("tech-180x150.png", 180,150,t, true),
new imgObj("tech-234x60.png", 234,60,t, true),
new imgObj("tech-240x400.png", 240,400,t, true),
new imgObj("tech-250x250.png", 250,250,t, true),
new imgObj("tech-300x100.png", 300,100,t, true),
new imgObj("tech-300x250.png", 300,250,t, true),
new imgObj("tech-300x600.png", 300,600,t, true),
new imgObj("tech-336x280.png", 336,280,t, true),
new imgObj("tech-468x60.png", 468,60,t, true),
new imgObj("tech-720x300.png", 720,300,t, true),
new imgObj("tech-728x90.png", 728,90,t, true),

new imgObj("gaming-120x240.png", 120,240,g, true),
new imgObj("gaming-120x60.png", 120,60,g, true),
new imgObj("gaming-120x600.png", 120,600,g, true),
new imgObj("gaming-120x90.png", 120,90,g, true),
new imgObj("gaming-125x125.png", 125,125,g, true),
new imgObj("gaming-160x600.png", 160,600,g, true),
new imgObj("gaming-180x150.png", 180,150,g, true),
new imgObj("gaming-234x60.png", 234,60,g, true),
new imgObj("gaming-240x400.png", 240,400,g, true),
new imgObj("gaming-250x250.png", 250,250,g, true),
new imgObj("gaming-300x100.png", 300,100,g, true),
new imgObj("gaming-300x250.png", 300,250,g, true),
new imgObj("gaming-300x600.png", 300,600,g, true),
new imgObj("gaming-336x280.png", 336,280,g, true),
new imgObj("gaming-468x60.png", 468,60,g, true),
new imgObj("gaming-720x300.png", 720,300,g, true),
new imgObj("gaming-728x90.png", 728,90,g, true),
new imgObj("gaming-88x31.png", 88,31,g, true),

new imgObj("note.png", 500, 500, m, false)];
                  

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
  if (undefine(storagePrefs)) {
    storagePrefs = {"tech": true, "music": true, "gaming": true, "fashion": true, "cosmetics": true};
    options = storagePrefs;
    callback(each(options));
  }

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
          console.log("pic: " + imageArray[j].name);
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

