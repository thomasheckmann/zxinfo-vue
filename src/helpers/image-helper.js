var screenurl = function(gamedata) {
  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "https://zxinfo.dk/media/images/empty.png";
  if (gamedata._source.type === "Compilation") {
    entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";

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
      entry.screenurl = "https://spectrumcomputing.co.uk/" + inlays[0].url;
    }
  } else if (gamedata._source.screens.length) {
    let screen = gamedata._source.screens[0];
    if (screen.url.startsWith("/pub/sinclair/books-pics")) {
      entry.screenurl = "https://zxinfo.dk/media" + screen.url.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
    } else if (screen.url.startsWith("/zxscreen")) {
      entry.screenurl = "https://zxinfo.dk/media" + screen.url;
    } else if (screen.url.startsWith("/pub")) {
      entry.screenurl = "https://spectrumcomputing.co.uk/" + screen.url;
    } else if (screen.url.startsWith("/zxdb/sinclair/pics/hw/")) {
      entry.screenurl = "https://zxinfo.dk/media" + screen.url.replace("/zxdb/sinclair/pics/hw/", "/thumbs/hardware-pics/");
    } else if (screen.url.startsWith("/zxdb/sinclair/entries/")) {
      entry.screenurl =
        "https://spectrumcomputing.co.uk/" + screen.url.replace("/zxdb/sinclair/pics/hw/", "/thumbs/hardware-pics/");
    } else {
      console.log("UKNOWN ACTION(" + gamedata._id + "): " + screen.url);
    }
  }
  return entry.screenurl;
};

module.exports = {
  screenurl: screenurl,
};
