var getScreenUrl = function(path) {
  if (path.startsWith("/pub/sinclair/games-inlays/")) {
    path = path.replace("/pub/", "");
    return (
      "https://ia800604.us.archive.org/view_archive.php?archive=/1/items/World_of_Spectrum_June_2017_Mirror/World%20of%20Spectrum%20June%202017%20Mirror.zip&file=World%20of%20Spectrum%20June%202017%20Mirror/" +
      path
    );
  } else if (path.startsWith("/pub/sinclair/zx81/games-inlays/")) {
    path = path.replace("/pub/", "");
    return (
      "https://ia800604.us.archive.org/view_archive.php?archive=/1/items/World_of_Spectrum_June_2017_Mirror/World%20of%20Spectrum%20June%202017%20Mirror.zip&file=World%20of%20Spectrum%20June%202017%20Mirror/" +
      path
    );
  }
  path = path.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
  return "https://zxinfo.dk/media" + path;
};

var getCoverImageForEntry = function(gamedata) {
  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "/images/placeholder.png";
  if (gamedata._source.type === "Compilation") {
    entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";

    /** Try to find Inlay for compilation - in additionals */
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
      /* no inlay found, and no running screens */
      entry.screenurl = "/images/compilation.png";
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
  getCoverImage: getCoverImageForEntry,
  getScreenUrl: getScreenUrl,
  DEFAULT_SRC: "https://zxinfo.dk/media/images/placeholder.png",
};
