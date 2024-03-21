/**
 * cleaned version of JSON - used in overview (using search compact view)
 * @param {*} gamedata
 */
var entry = function (gamedata) {
  if (this.$isDevelopment) {
    console.log(`entry-helper.js - entry(): ${gamedata._id}`);
  }
  let entry = {};
  entry.id = gamedata._id;
  entry.title = gamedata._source.title;
  entry.xrated = gamedata._source.xrated;

  entry.isbn = gamedata._source.isbn;
  entry.availability = gamedata._source.availability;

  if (gamedata._source.originalYearOfRelease === undefined) {
    entry.yearofrelease = "-";
  } else {
    entry.yearofrelease = gamedata._source.originalYearOfRelease;
  }

  entry.machinetype = gamedata._source.machineType;

  entry.originalPublisher = [];
  for (var publisher in gamedata._source.publishers) {
    var originalPublisher = gamedata._source.publishers[publisher].name;
    var originalPublisherCountry = gamedata._source.publishers[publisher].country;
    entry.originalPublisher.push({ name: originalPublisher, country: originalPublisherCountry });
  }

  entry.genretypeCombined = gamedata._source.genreType;
  if (gamedata._source.genreType && gamedata._source.genreSubType) {
    entry.genretypeCombined = gamedata._source.genreType + "/" + gamedata._source.genreSubType;
  } else if (gamedata._source.genreType && !gamedata._source.genreSubType) {
    entry.genretypeCombined = gamedata._source.genreType;
  }
  entry.genretype = gamedata._source.genreType;
  entry.genresubtype = gamedata._source.genreSubType;

  entry.score = {};
  entry.score.score = gamedata._source.score.score;
  entry.score.votes = gamedata._source.score.votes;
  entry.coverimage = this.getCoverImage(gamedata);

  // look for inlay
  var inlays = []; // contains inlay, if found from Type
  var allInlays = []; // contains all matching type or inlay in filename
  for (var idx = 0; idx < gamedata._source.additionalDownloads.length; idx++) {
    let item = gamedata._source.additionalDownloads[idx];
    if (["Cassette inlay", "Cassette inlay - Front"].includes(item.type)) {
      inlays.push(item);
      if (this.$isDevelopment) console.log(`entry-helper.js - inlays: ${JSON.stringify(item)}`);
    }
    if (item.type.toLowerCase().indexOf("inlay") !== -1 || item.path.toLowerCase().indexOf("inlay") !== -1) {
      allInlays.push(item);
    }
  }
  inlays.sort((a, b) => (a.path < b.path ? 1 : -1));
  allInlays.sort((a, b) => (a.path > b.path ? 1 : -1));

  entry.inlayimage = this.getDefaultImageSrc;
  if (inlays.length > 0) {
    entry.inlayimage = this.getScreenUrl(inlays[0].path);
  } else if (allInlays.length > 0) {
    entry.inlayimage = this.getScreenUrl(allInlays[0].path);
  }
  entry.allinlays = [];
  for (idx = 0; idx < allInlays.length; idx++) {
    entry.allinlays.push(this.getScreenUrl(allInlays[idx].path));
  }

  return entry;
};

module.exports = {
  entryData: entry,
};
