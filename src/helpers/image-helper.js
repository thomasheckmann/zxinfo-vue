var screenurl = function(gamedata) {
  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "/images/empty.png";
  if (gamedata._source.type === "Compilation") {
    entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";

    console.log("screenurl: compilation");

    /** Try to find Inlay - in additionals */
    var i = 0;
    var inlays = [];
    for (; gamedata._source.additionals !== undefined && i < gamedata._source.additionals.length; i++) {
      var item = gamedata._source.additionals[i];
      if (item.type.indexOf("inlay") != -1 && item.format.startsWith("Picture")) {
        /** Ignore 'Back' */
        if (item.url.indexOf("Back") == -1) {
          inlays.push(item);
        }
      }
    }
    if (inlays.length > 0) {
      entry.screenurl = inlays[0].url.replace("/pub/sinclair/", "/thumbs/");
    } else if (gamedata._source.screens.length) {
      entry.screenurl = gamedata._source.screens[0].url;
    } else {
      console.log("Unhandled compilation cover");
    }
  }

  if (gamedata._source.screens.length && gamedata._source.type !== "Compilation") {
    entry.screenurl = gamedata._source.screens[0].url;
    entry.screenurl = entry.screenurl.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
    entry.screenurl = "https://zxinfo.dk/media" + entry.screenurl;
  } else {
    entry.screenurl = "https://zxinfo.dk/media" + entry.screenurl;
  }

  return entry.screenurl;
};

module.exports = {
  screenurl: screenurl,
};
