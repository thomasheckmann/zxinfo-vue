var isDevelopment = false;

var getScreenUrl = function (path) {
  if (!path) return this.DEFAULT_SRC;

  if (path.startsWith("/pub/sinclair/books-pics")) {
    // book pics, resized
    path = path.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
  } else if (path.startsWith("/pub/sinclair/")) {
    path = path.replace("+", "%2B");
    path = path.replace("/pub/", "");
    return (
      "https://ia600604.us.archive.org/view_archive.php?archive=/1/items/World_of_Spectrum_June_2017_Mirror/World%20of%20Spectrum%20June%202017%20Mirror.zip&file=World%20of%20Spectrum%20June%202017%20Mirror%2F" +
      encodeURIComponent(path)
    );
  }
  return "https://zxinfo.dk/media" + path;
};

/**
 * Look through screens section, priority:
 * Loading (SCR)
 * Opening (SCR)
 * Run (SCR)
 *
 */
var getScreenHelper = function (gamedata) {
  // sort by url, open-1, 2, 3
  const loadingSCR = gamedata._source.screens.filter((item) => item.type === "Loading screen" && item.scrUrl).sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  const openingSCR = gamedata._source.screens.filter((item) => item.type === "Opening screen" && item.scrUrl).sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  const runningSCR = gamedata._source.screens.filter((item) => item.type === "Running screen" && item.scrUrl).sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));

  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - loadingScr: ${loadingSCR.length}`);
    console.log(`getCoverImageForSoftware() - openingScr: ${openingSCR.length}`);
    console.log(`getCoverImageForSoftware() - runningScr: ${runningSCR.length}`);
  }

  if (loadingSCR.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning loading SCR: ${loadingSCR[0].url}`);
    }
    return loadingSCR[0].url;
  } else if (openingSCR.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning opening SCR: ${openingSCR[0].url}`);
    }
    return openingSCR[0].url;
  } else if (runningSCR.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning running SCR: ${runningSCR[0].url}`);
    }
    return runningSCR[0].url;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - no SCR found, keep looking for IMG (bmp, gif, jpg, png)`);
  }
  // No SCR found, look for Image (BMP, GIF, JPG, PNG)
  const imgFormats = ["Picture (BMP)", "Picture (GIF)", "Picture (JPG)", "Picture (PNG)"];
  const loadingIMG = gamedata._source.screens
    .filter((item) => item.type === "Loading screen" && imgFormats.indexOf(item.format) >= 0)
    .sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  const openingIMG = gamedata._source.screens
    .filter((item) => item.type === "Opening screen" && imgFormats.indexOf(item.format) >= 0)
    .sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  const runningIMG = gamedata._source.screens
    .filter((item) => item.type === "Running screen" && imgFormats.indexOf(item.format) >= 0)
    .sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - loadingImg: ${loadingIMG.length}`);
    console.log(`getCoverImageForSoftware() - openingImg: ${openingIMG.length}`);
    console.log(`getCoverImageForSoftware() - runningImg: ${runningIMG.length}`);
  }

  if (loadingIMG.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning loading IMG: ${loadingIMG[0].url}`);
    }
    return loadingIMG[0].url;
  } else if (openingIMG.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning opening IMG: ${openingIMG[0].url}`);
    }
    return openingIMG[0].url;
  } else if (runningIMG.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForSoftware() - ${gamedata._id}, returning running IMG: ${runningIMG[0].url}`);
    }
    return runningIMG[0].url;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - WARNING, no SCR and no IMG, returning null`);
  }
  return null;
};

var getCoverImageForCompilation = function (gamedata) {
  if (isDevelopment) {
    console.log(`getCoverImageForCompilation() - Type: ${gamedata._source.contentType}(${gamedata._source.genreType})`);
  }

  var screenurl = "https://zxinfo.dk/media/images/compilation.png";

  // find one with title = null, usual an animated GIF with all entries
  const screenWithoutTitle = gamedata._source.screens.filter((item) => item.title === null).sort((a, b) => (a.url.toLowerCase() > b.url.toLowerCase() ? 1 : -1));
  if (isDevelopment) {
    console.log(`getCoverImageForCompilation() - screenWithoutTitle: ${screenWithoutTitle.length}`);
  }

  if (screenWithoutTitle.length > 0) {
    if (isDevelopment) {
      console.log(`getCoverImageForCompilation() - ${gamedata._id}, returning : ${screenWithoutTitle[0].url}`);
    }
    return screenWithoutTitle[0].url;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - no "all" image found, keep looking...`);
  }

  screenurl = getScreenHelper(gamedata);
  if (screenurl) {
    if (isDevelopment) {
      console.log(`getCoverImageForCompilation() - screen found, returning ${screenurl}`);
    }
    return screenurl;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForCompilation() - no SCR found, keep looking for inlay`);
  }

  // Look for Inlay picture in "AdditionalDownloads"
  const inlayImg = gamedata._source.additionalDownloads
    .filter((item) => item.type === "Inlay - Front" && item.format.startsWith("Picture"))
    .sort((a, b) => (a.path.toLowerCase() > b.path.toLowerCase() ? 1 : -1));
  if (isDevelopment) {
    console.log(`getCoverImageForCompilation() - inlayImg: ${inlayImg.length}`);
  }

  if (inlayImg.length > 0) {
    const inlayUrl = inlayImg[0].path.replace("/pub/sinclair/", "/thumbs/");
    if (isDevelopment) {
      console.log(`getCoverImageForCompilation() - ${gamedata._id}, returning : ${inlayUrl}`);
    }
    return inlayUrl;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForCompilation() - NO image found, using default....)`);
  }

  return "/images/compilation.png";
};

var getCoverImageForHardware = function (gamedata) {
  if (isDevelopment) {
    console.log(`getCoverImageForHardware() - Type: ${gamedata._source.contentType}(${gamedata._source.genreType})`);
  }

  // Look for Hw picture in "AdditionalDownloads"
  const hardwareImg = gamedata._source.additionalDownloads
    .filter((item) => item.type === "Hardware picture" && item.format.startsWith("Picture"))
    .sort((a, b) => (a.path.toLowerCase() > b.path.toLowerCase() ? 1 : -1));
  if (isDevelopment) {
    console.log(`getCoverImageForHardware() - hardwareImg: ${hardwareImg.length}`);
  }

  if (hardwareImg.length > 0) {
    const hwUrl = hardwareImg[0].path; //.replace("/pub/sinclair/", "/thumbs/");
    if (isDevelopment) {
      console.log(`getCoverImageForHardware() - ${gamedata._id}, returning : ${hwUrl}`);
    }
    return hwUrl;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForHardware() - NO image found, using default....)`);
  }
  return "/images/placeholder.png";
};

var getCoverImageForBook = function (gamedata) {
  if (isDevelopment) {
    console.log(`getCoverImageForBook() - Type: ${gamedata._source.contentType}(${gamedata._source.genreType})`);
  }

  // Look for Hw picture in "AdditionalDownloads"
  const coverImg = gamedata._source.additionalDownloads
    .filter((item) => item.type === "Book cover" && item.format.startsWith("Picture"))
    .sort((a, b) => (a.path.toLowerCase() < b.path.toLowerCase() ? 1 : -1));
  if (isDevelopment) {
    console.log(`getCoverImageForBook() - coverImg: ${coverImg.length}`);
  }

  if (coverImg.length > 0) {
    const bookUrl = coverImg[0].path; //.replace("/pub/sinclair/", "/thumbs/");
    if (isDevelopment) {
      console.log(`getCoverImageForBook() - ${gamedata._id}, returning : ${bookUrl}`);
    }
    return bookUrl;
  }

  if (isDevelopment) {
    console.log(`getCoverImageForBook() - NO image found, using default....)`);
  }
  return "/images/placeholder.png";
};

var getCoverImageForSoftware = function (gamedata) {
  if (isDevelopment) {
    console.log(`getCoverImageForSoftware() - Type: ${gamedata._source.contentType}(${gamedata._source.genreType})`);
  }

  if (gamedata._source.genreType === "Compilation") {
    return getCoverImageForCompilation(gamedata);
  }

  const screenurl = getScreenHelper(gamedata);

  if (isDevelopment && !screenurl) {
    console.log(`getCoverImageForSoftware() - NO image found, using default....)`);
  }

  return screenurl;
};

var getCoverImageForEntry = function (gamedata) {
  isDevelopment = this.$isDevelopment;
  if (this.$isDevelopment) {
    console.log(`getCoverImageForEntry() - ID: ${gamedata._id} - ${gamedata._source.title}`);
    console.log(`getCoverImageForEntry() - Type: ${gamedata._source.contentType}(${gamedata._source.genreType})`);
  }

  // handle screens, make one a "cover"
  var entry = {};

  entry.screenurl = "/images/placeholder.png";

  switch (gamedata._source.contentType) {
    case "SOFTWARE":
      entry.screenurl = getCoverImageForSoftware(gamedata);
      break;
    case "HARDWARE":
      entry.screenurl = getCoverImageForHardware(gamedata);
      break;
    case "BOOK":
      entry.screenurl = getCoverImageForBook(gamedata);
      break;

    default:
      break;
  }

  // if (gamedata._source.genreType === "Compilation") {
  //   entry.screenurl = getCoverImageForCompilation(gamedata);
  //   return getScreenUrl(entry.screenurl);
  // } else if (gamedata._source.genreType === "Hardware") {
  //   entry.screenurl = getCoverImageForHardware(gamedata);
  //   return getScreenUrl(entry.screenurl);
  // }

  // // search for "Loading screen in "screens" section, pick first one found

  // var found;
  // gamedata._source.screens.forEach(function (item) {
  //   if (item.type === "Loading screen" && item.format.startsWith("Picture") && !found) {
  //     found = item.url;
  //   }
  // });

  // if (!found) found = "/images/placeholder.png";
  if (!entry.screenurl) entry.screenurl = "/images/placeholder.png";

  return getScreenUrl(entry.screenurl);
};

module.exports = {
  getCoverImage: getCoverImageForEntry,
  getScreenUrl: getScreenUrl,
  DEFAULT_SRC: "https://zxinfo.dk/media/images/placeholder.png",
  DEFAULT_PAPER_SRC: "https://zxinfo.dk/media/images/placeholderPaper.png",
};
