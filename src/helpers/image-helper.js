var screenurl = function(gamedata) {
  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "https://zxinfo.dk/media/images/empty.png";
  if (gamedata._source.type === "Compilation") {
    entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";
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
