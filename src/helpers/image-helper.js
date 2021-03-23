var getScreenUrl = function(path) {
  if (!path) return this.DEFAULT_SRC;

  if (path.startsWith("/pub/sinclair/books-pics")) {
    // book pics, resized
    path = path.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
  } else if (path.startsWith("/pub/sinclair/")) {
    path = path.replace("+", "%2B");
    path = path.replace("/pub/", "");
    return (
      "https://ia800604.us.archive.org/view_archive.php?archive=/1/items/World_of_Spectrum_June_2017_Mirror/World%20of%20Spectrum%20June%202017%20Mirror.zip&file=World%20of%20Spectrum%20June%202017%20Mirror/" +
      path
    );
  }
  return "https://zxinfo.dk/media" + path;
};

var getCoverImageForEntry = function(gamedata) {
  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "/images/placeholder.png";
  if (gamedata._source.genreType === "Compilation") {
    entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";

    /** Try to find Inlay for compilation - in additionals */
    var i = 0;
    var inlays = [];
    for (; gamedata._source.additionalDownloads !== undefined && i < gamedata._source.additionalDownloads.length; i++) {
      var item = gamedata._source.additionalDownloads[i];
      if (item.type.indexOf("inlay") != -1 && item.format.startsWith("Picture")) {
        /** Ignore 'Back' */
        if (item.path.indexOf("Back") == -1) {
          inlays.push(item);
        }
      }
    }
    if (inlays.length > 0) {
      entry.screenurl = inlays[0].path.replace("/pub/sinclair/", "/thumbs/");
    } else if (gamedata._source.screens.length) {
      entry.screenurl = gamedata._source.screens[0].url;
    } else {
      /* no inlay found, and no running screens */
      entry.screenurl = "/images/compilation.png";
    }
  }

  if (gamedata._source.genreType === "Hardware") {
    if (gamedata._source.screens.length && gamedata._source.screens[0].url) {
      console.log(`image-helper - getScreenUrl(): HW using existing image: ${gamedata._source.screens[0].url}`);
    } else if (gamedata._source.additionalDownloads) {
      console.log(`image-helper - getScreenUrl(): HW looking for hardware picture`);
      entry.screenurl = null;
      for (var addIdx = 0; addIdx < gamedata._source.additionalDownloads.length; addIdx++) {
        var hwItem = gamedata._source.additionalDownloads[addIdx];
        if (this.$isDevelopment) console.log(`image-helper - getScreenUrl(): ${addIdx} - ` + JSON.stringify(hwItem));
        if (hwItem.type === "Hardware picture" && hwItem.format === "Picture (JPG)" && !entry.screenurl) {
          entry.screenurl = hwItem.path;
          if (this.$isDevelopment)
            console.log(
              `image-helper - getScreenUrl(): ${addIdx} - FOUND HW Image (${hwItem.path}), entry.screenurl: ${entry.screenurl}`
            );
        }
      }
      if (!entry.screenurl) {
        entry.screenurl = "/images/placeholder.png";
      }
    }
  }

  if (gamedata._source.screens.length && gamedata._source.screens[0].url && gamedata._source.genreType !== "Compilation") {
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
  DEFAULT_PAPER_SRC: "https://zxinfo.dk/media/images/placeholderPaper.png",
};
