// cleaned version of JSON
var entry = function(gamedata) {
  let entry = {};
  entry.id = gamedata._id;
  entry.title = gamedata._source.fulltitle;

  entry.availability = gamedata._source.availability;

  if (gamedata._source.yearofrelease === undefined) {
    entry.yearofrelease = "-";
  } else {
    entry.yearofrelease = gamedata._source.yearofrelease;
  }

  if (gamedata._source.machinetype === undefined) {
    entry.machinetype = "-";
  } else {
    entry.machinetype = gamedata._source.machinetype;
  }

  entry.originalPublisher = [];
  for (var publisher in gamedata._source.publisher) {
    var originalPublisher = gamedata._source.publisher[publisher].name;
    var originalPublisherCountry = "";
    if (gamedata._source.publisher[publisher].country !== undefined) {
      originalPublisherCountry = "(" + gamedata._source.publisher[publisher].country + ")";
    }
    entry.originalPublisher.push({ name: originalPublisher, country: originalPublisherCountry });
  }

  entry.genretype = gamedata._source.type;
  entry.genre = "-/-";
  if (gamedata._source.type && gamedata._source.subtype) {
    entry.genre = gamedata._source.type + "/" + gamedata._source.subtype;
  } else if (gamedata._source.type && !gamedata._source.subtype) {
    entry.genre = gamedata._source.type;
  }

  entry.score = {};
  entry.score.score = gamedata._source.score.score;
  entry.score.votes = gamedata._source.score.votes;
  entry.coverimage = this.getCoverImage(gamedata);

  // look for inlay
  var inlays = []; // contains inlay, if found from Type
  var allInlays = []; // contains all matching type or inlay in filename
  for (var idx = 0; idx < gamedata._source.additionals.length; idx++) {
    let item = gamedata._source.additionals[idx];
    if (["Cassette inlay", "Cassette inlay - Front"].includes(item.type)) {
      inlays.push(item);
    }
    if (item.type.toLowerCase().indexOf("inlay") !== -1 || item.url.toLowerCase().indexOf("inlay") !== -1) {
      allInlays.push(item);
    }
  }
  inlays.sort((a, b) => (a.url < b.url ? 1 : -1));
  allInlays.sort((a, b) => (a.url > b.url ? 1 : -1));

  entry.inlayimage = this.getDefaultImageSrc;
  if (inlays.length > 0) {
    entry.inlayimage = this.getScreenUrl(inlays[0].url);
    //console.log(gamedata._id + " - Inlay: " + inlays[0].url + " => " + entry.inlayimage);
  } else if (allInlays.length > 0) {
    entry.inlayimage = this.getScreenUrl(allInlays[0].url);
  }
  entry.allinlays = [];
  for (idx = 0; idx < allInlays.length; idx++) {
    entry.allinlays.push(this.getScreenUrl(allInlays[idx].url));
  }

  return entry;
};

module.exports = {
  entryData: entry,
};
