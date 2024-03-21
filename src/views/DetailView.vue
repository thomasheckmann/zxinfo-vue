<template>
  <div>
    <div v-if="!isLoading && entry == null">
      <v-container justify-start class="ma-0 pa-0" fluid>
        <v-row align="start"><v-col cols="10" class="ma-0 py-4 px-4 text-center">
            ID: <strong>{{ $route.params.entryid }} </strong> not found, sorry :( <br />But here are some suggestions to
            check out :-)
          </v-col></v-row>
        <v-row :align="'start'" :justify="'center'">
          <v-col v-for="(card, index) in randomCards" :key="index" cols="12" sm="6" md="4" lg="3" class="px-1">
            <GameCard v-bind:GameData="card" v-bind:imagetype="imagetype"></GameCard>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-card class="mx-auto" :max-width="$vuetify.breakpoint.xsOnly ? '100%' : '80%'"
      v-if="!isLoading && entry !== null">
      <DetailViewTopSmall v-if="$vuetify.breakpoint.xsOnly" v-bind:entry="entry"></DetailViewTopSmall>
      <DetailViewTop v-if="$vuetify.breakpoint.smAndUp" v-bind:entry="entry"></DetailViewTop>
      <v-divider></v-divider>
      <BasicInfoView v-bind:entry="entry"></BasicInfoView>
      <v-slide-group v-model="entry.allinlays" class="py-2 ma-0" :show-arrows="true" :center-active="true">
        <v-slide-item v-for="(inlay, n) in entry.allinlays" :key="n" v-slot:default="{ }">
          <div class="text-center">
            <v-dialog v-model="dialog[n]" max-width="80%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" small dark v-bind="attrs" v-on="on"> SHOW </v-btn>
              </template>
              <v-card>
                <v-img :src="inlay" class="white--text align-end">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-dialog>
            <v-card :color="'grey lighten-5'" class="ma-4" width="250" height="250">
              <v-img :src="inlay" class="white--text align-end">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </div>
        </v-slide-item>
      </v-slide-group>

      <ReleasesView v-bind:entry="entry"></ReleasesView>
      <ExtendedInfoView v-bind:entry="entry"></ExtendedInfoView>
      <CompilationInfoView v-bind:entry="entry"></CompilationInfoView>
      <RelationsInfoView v-bind:entry="entry"></RelationsInfoView>
      <BookInfoView v-bind:entry="entry"></BookInfoView>
      <LinksInfoView v-bind:entry="entry"></LinksInfoView>

      <v-slide-group show-arrows class="pa-4">
        <v-slide-item v-for="(card, n) in relatedCards" :key="n">
          <GameCard v-bind:GameData="card" v-bind:imagetype="imagetype"></GameCard>
        </v-slide-item>
      </v-slide-group>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

import imageHelper from "@/helpers/image-helper";
import DetailViewTopSmall from "@/components/DetailViewTopSmall";
import DetailViewTop from "@/components/DetailViewTop";

import BasicInfoView from "@/components/ZXInfo/basicInfo";
import ReleasesView from "@/components/ZXInfo/releases";
import ExtendedInfoView from "@/components/ZXInfo/extendedInfo";
import CompilationInfoView from "@/components/ZXInfo/compilationInfo";
import RelationsInfoView from "@/components/ZXInfo/relationsInfo";
import BookInfoView from "@/components/ZXInfo/bookInfo";
import LinksInfoView from "@/components/ZXInfo/linksInfo";

import GameCard from "@/components/GameCardSmall";

//Vue.use(VueMeta, {
//  refreshOnceOnNavigation: true,
//});

export default {
  name: "DetailView",
  metaInfo() {
    if (this.$isDevelopment) console.log("DetailView - metaInfo()");

    if (!this.isLoading && this.entry !== null) {
      return {
        title: this.entry.title,
        titleTemplate: "%s | ZXInfo",
      };
    } else {
      return {
        title: "NOT FOUND",
        titleTemplate: "%s | ZXInfo",
      };
    }
  },
  data() {
    return {
      isLoading: true,
      GameData: Object,
      relatedCards: [],
      randomCards: [],
      imagetype: "screen",
      BasicInfo: [],
      dialog: [],
    };
  },
  mounted() {
    if (this.$isDevelopment) console.log("DetailView - mounted():");
    this.loadentry();
  },
  methods: {
    openUrl: function (url) {
      window.open(url);
    },
    loadentry() {
      this.isLoading = true;

      // var dataURL = this.$api_base_url + "/entries/" + this.$route.params.entryid + "?mode=full";
      const dataURL = `${this.$api_base_url}/entries/${this.$route.params.entryid}?mode=full`;
      if (this.$isDevelopment) console.log(`DetailView.vue - loadentry(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          this.GameData = response.data;
          this.getMoreLikeThis();
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.GameData = null; // TODO: Handle NOT found better
          this.getRandom2();
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCoverImage: imageHelper.getCoverImage,
    getScreenUrl: imageHelper.getScreenUrl,
    getScreens: imageHelper.getScreens,

    // getMoreLikeThis, displayed on detail page
    getMoreLikeThis() {
      this.relatedCards = [];
      // var dataURL = this.$api_base_url + "/entries/morelikethis/" + this.$route.params.entryid + "?mode=tiny&size=10";
      const dataURL = `${this.$api_base_url}/entries/morelikethis/${this.$route.params.entryid}?mode=tiny&size=10`;
      if (this.$isDevelopment) console.log(`DetailView.vue - getMoreLikeThis(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          for (var ii = 0; ii < response.data.hits.hits.length; ii++) {
            this.relatedCards.push(response.data.hits.hits[ii]);
          }
        })
        .catch((error) => {
          this.relatedCards = []; // TODO: Handle NOT found better
          console.log(error);
        })
        .finally(() => { });
    },

    // getRandom2, displayed when entry not found (basically to avoid empty page)
    getRandom2() {
      this.randomCards = [];
      const dataURL = `${this.$api_base_url}/entries/random/2?mode=tiny`;
      if (this.$isDevelopment) console.log(`DetailView.vue - getRandom2(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          for (var ii = 0; ii < response.data.hits.hits.length; ii++) {
            this.randomCards.push(response.data.hits.hits[ii]);
          }
        })
        .catch((error) => {
          this.randomCards = [];
          console.log(error);
        })
        .finally(() => { });
    },
  },
  computed: {
    // cleaned version of JSON

    /*
    ENTRY DETAILS
     */
    entry() {
      if (!this.isLoading && this.GameData === null) {
        return null;
      }

      let entry = {};

      entry.screens = this.getScreens(this.GameData);

      entry.id = this.GameData._id;
      entry.title = this.GameData._source.title;
      entry.xrated = this.GameData._source.xrated;
      entry.contentType = this.GameData._source.contentType;
      entry.zxinfoVersion = this.GameData._source.zxinfoVersion;
      entry.availability = this.GameData._source.availability;
      entry.alsoKnownAs = this.GameData._source.alsoKnownAs;
      entry.originalYearOfRelease = this.GameData._source.originalYearOfRelease;

      entry.originalPublishers = [];
      entry.publisherNotes = [];
      for (var publishers in this.GameData._source.publishers) {
        var originalPublisher = this.GameData._source.publishers[publishers].name;
        var originalPublisherCountry = this.GameData._source.publishers[publishers].country;
        var originalPublisherLabelType = this.GameData._source.publishers[publishers].labelType;

        entry.originalPublishers.push({
          name: originalPublisher,
          country: originalPublisherCountry,
          labelType: originalPublisherLabelType,
        });
        if (this.GameData._source.publishers[publishers].notes && this.GameData._source.publishers[publishers].notes.length) {
          entry.publisherNotes.push({ name: originalPublisher, notes: this.GameData._source.publishers[publishers].notes });
        }
      }

      entry.authors = [];
      entry.contributors = [];
      entry.roles = [];
      entry.authorNotes = [];

      if (this.GameData._source.authors.length) {
        for (var author in this.GameData._source.authors) {
          var authorName = this.GameData._source.authors[author].name;
          if (!entry.authors.filter((e) => e.name === authorName).length > 0) {
            const item = {
              name: authorName,
              country: this.GameData._source.authors[author].country,
              labelType: this.GameData._source.authors[author].labelType,
              group: this.GameData._source.authors[author].groupName,
            };
            if (this.GameData._source.authors[author].type === "Creator") {
              entry.authors.push(item);
            } else {
              entry.contributors.push(item);
            }
            if (this.GameData._source.authors[author].notes && this.GameData._source.authors[author].notes.length) {
              entry.authorNotes.push({ name: authorName, notes: this.GameData._source.authors[author].notes });
            }
          }

          // check role
          var authorRole = this.GameData._source.authors[author].roles;
          if (authorRole && authorRole.length) {
            if (entry.roles[authorName] == undefined) {
              entry.roles[authorName] = {};
            }
            if (authorRole.length) {
              entry.roles[authorName].roles = authorRole;
            }
          }
        }
      }
      entry.licensed = this.GameData._source.licensed;

      entry.messageLanguage = this.GameData._source.language;

      entry.machineType = this.GameData._source.machineType;
      entry.isbn = this.GameData._source.isbn;

      entry.genretypeCombined = this.GameData._source.genreType;
      if (this.GameData._source.genreType && this.GameData._source.genreSubType) {
        entry.genretypeCombined = this.GameData._source.genreType + "/" + this.GameData._source.genreSubType;
      } else if (this.GameData._source.genreType && !this.GameData._source.genreSubType) {
        entry.genretypeCombined = this.GameData._source.genreType;
      }
      entry.genretype = this.GameData._source.genreType;
      entry.genresubtype = this.GameData._source.genreSubType;

      entry.maximumPlayers = this.GameData._source.numberOfPlayers;
      entry.multiTurnMode = this.GameData._source.multiplayerMode;
      entry.multiTurnType = this.GameData._source.multiplayerType;

      entry.controlOptions = [];
      for (var control in this.GameData._source.controls) {
        entry.controlOptions.push(this.GameData._source.controls[control].control);
      }

      entry.originalPublication = this.GameData._source.originalPublication;

      if (this.GameData._source.originalPrice) {
        entry.originalPriceAmount = this.GameData._source.originalPrice.amount;
        entry.originalPriceCurrency = this.GameData._source.originalPrice.currency;
        entry.originalPricePrefix = this.GameData._source.originalPrice.prefix;
      } else {
        entry.originalPriceAmount = null;
        entry.originalPriceCurrency = null;
        entry.originalPricePrefix = null;
      }

      entry.hardwareBlurb = this.GameData._source.hardwareBlurb;
      entry.knownErrors = this.GameData._source.knownErrors ? this.GameData._source.knownErrors.replace(/\^/g, "\n").replace(/#/g, "<br/>") : null;
      entry.comments = this.GameData._source.remarks;
      // replace {Professional Adventure Writer - User Overlays|Kelsoft|0010899}
      // 0006857
      if (entry.comments) {
        var rxp = /({[^}]+})/g,
          str = entry.comments,
          curMatch;

        while ((curMatch = rxp.exec(str))) {
          if (this.$isDevelopment) {
            console.log("Found match: " + curMatch[1]);
          }
          let embedded = curMatch[1];
          let result = embedded.match(/\{(.+)\|(.*)\|([0-9]+)\}/) || [];
          if (result[0]) {
            entry.comments = entry.comments.replace(result[0], "<a href='/details/" + result[3] + "'>" + result[1] + "</a> (" + result[2] + ")");
          }
        }
      }

      entry.awards = [];
      for (var award in this.GameData._source.awards) {
        entry.awards.push(this.GameData._source.awards[award].text);
      }

      entry.reviewAwards = this.GameData._source.reviewAwards;
      entry.magazineRefs = this.GameData._source.magazineReferences;

      entry.demoParty = [];
      for (var feature in this.GameData._source.demoParty) {
        entry.demoParty.push(this.GameData._source.demoParty[feature].name);
      }

      entry.features = [];
      for (var feature in this.GameData._source.features) {
        entry.features.push(this.GameData._source.features[feature].name);
      }

      entry.graphicalView = [];
      for (var feature in this.GameData._source.graphicalView) {
        entry.graphicalView.push(this.GameData._source.graphicalView[feature].name);
      }

      entry.programmingLanguage = [];
      for (var feature in this.GameData._source.programmingLanguage) {
        entry.programmingLanguage.push(this.GameData._source.programmingLanguage[feature].name);
      }

      entry.screenMovement = [];
      for (var feature in this.GameData._source.screenMovement) {
        entry.screenMovement.push(this.GameData._source.screenMovement[feature].name);
      }

      entry.sport = [];
      for (var feature in this.GameData._source.sport) {
        entry.sport.push(this.GameData._source.sport[feature].name);
      }

      entry.copyright = [];
      for (var feature in this.GameData._source.copyright) {
        entry.copyright.push(this.GameData._source.copyright[feature].name);
      }

      entry.featuresZX81 = [];
      for (var feature in this.GameData._source.featuresZX81) {
        entry.featuresZX81.push(this.GameData._source.featuresZX81[feature].name);
      }

      entry.crossPlatform = [];
      for (var feature in this.GameData._source.crossPlatform) {
        entry.crossPlatform.push(this.GameData._source.crossPlatform[feature].name);
      }

      entry.competitions = [];
      for (var competition in this.GameData._source.competition) {
        entry.competitions.push(this.GameData._source.competition[competition].name);
      }

      entry.unsortedgroups = [];
      for (var group in this.GameData._source.unsortedGroup) {
        entry.unsortedgroups.push(this.GameData._source.unsortedGroup[group].name);
      }

      entry.themedgroups = [];
      for (var theme in this.GameData._source.themedGroup) {
        entry.themedgroups.push(this.GameData._source.themedGroup[theme].name);
      }


      /* RELATIONS */
      entry.authoredWith = this.GameData._source.authoredWith;
      entry.authoring = this.GameData._source.authoring;

      entry.editorOf = this.GameData._source.editorOf;
      entry.editBy = this.GameData._source.editBy;

      entry.requiresHardware = this.GameData._source.requiresHardware;
      entry.requiredByHardware = this.GameData._source.requiredByHardware;

      entry.inspiredBy = this.GameData._source.inspiredBy;
      entry.inspirationFor = this.GameData._source.inspirationFor;

      entry.addOnDependsOn = this.GameData._source.addOnDependsOn;
      entry.addOnAvailable = this.GameData._source.addOnAvailable;

      entry.modificationOf = this.GameData._source.modificationOf;
      entry.modifiedBy = this.GameData._source.modifiedBy;

      entry.otherPlatform = this.GameData._source.otherPlatform;

      entry.runsWith = this.GameData._source.runsWith;
      entry.requiredToRun = this.GameData._source.requiredToRun;

      entry.derivedFrom = this.GameData._source.derivedFrom;
      entry.originOf = this.GameData._source.originOf;

      entry.bundledWith = this.GameData._source.bundledWith;
      entry.bundleContent = this.GameData._source.bundleContent;

      entry.duplicateOf = this.GameData._source.duplicateOf;
      entry.duplicatedBy = this.GameData._source.duplicatedBy;

      entry.inBook = [];
      for (var book in this.GameData._source.inBook) {
        var item = this.GameData._source.inBook[book];
        item.id = this.GameData._source.inBook[book].entry_id;
        entry.inBook.push(item);
      }

      entry.bookContent = [];
      for (var bookEntry in this.GameData._source.bookContents) {
        var bookItem = this.GameData._source.bookContents[bookEntry];
        bookItem.id = this.GameData._source.bookContents[bookEntry].entry_id;
        bookItem.publishers = this.GameData._source.bookContents[bookEntry].publishers;
        bookItem.machinetype = this.GameData._source.bookContents[bookEntry].machineType;
        entry.bookContent.push(bookItem);
      }

      entry.inCompilations = [];
      for (var compilation in this.GameData._source.inCompilations) {
        var incompitem = this.GameData._source.inCompilations[compilation];
        incompitem.id = this.GameData._source.inCompilations[compilation].entry_id;
        incompitem.publishers = this.GameData._source.inCompilations[compilation].publishers;
        incompitem.machinetype = this.GameData._source.inCompilations[compilation].machineType;
        entry.inCompilations.push(incompitem);
      }

      entry.compilationContent = [];
      for (var content in this.GameData._source.compilationContents) {
        var contentItem = this.GameData._source.compilationContents[content];
        contentItem.id = this.GameData._source.compilationContents[content].entry_id;
        contentItem.publishers = this.GameData._source.compilationContents[content].publishers;
        contentItem.machinetype = this.GameData._source.compilationContents[content].machineType;
        entry.compilationContent.push(contentItem);
      }

      entry.series = this.GameData._source.series;

      entry.otherPlatforms = [];
      for (var platform in this.GameData._source.otherSystems) {
        entry.otherPlatforms.push(this.GameData._source.otherSystems[platform]);
      }

      entry.youtubelinks = this.GameData._source.youTubeLinks;

      // iterate releases to find rereleases, downloads, available format and encodingschemes
      entry.releases = [];
      entry.availableformat = [];
      entry.protectionscheme = [];
      entry.downloads = [];

      for (var release in this.GameData._source.releases) {
        entry.releases.push(this.GameData._source.releases[release]);
        // add downloads
        for (var download in this.GameData._source.releases[release].files) {
          var downloadItem = this.GameData._source.releases[release].files[download];
          if (downloadItem) {
            entry.downloads.push({
              url: downloadItem.path,
              type: downloadItem.type,
              format: downloadItem.format,
              encodingscheme: downloadItem.encodingScheme,
              origin: downloadItem.origin,
            });

            entry.availableformat.push({
              format: downloadItem.format,
              type: downloadItem.type,
            });
          }
          if (downloadItem.encodingScheme) {
            entry.protectionscheme.push(downloadItem.encodingScheme);
          }
        }
      }

      // remove duplicates
      var jsonObject = entry.availableformat.map(JSON.stringify);
      var uniqueSet = new Set(jsonObject);
      entry.availableformat = Array.from(uniqueSet).map(JSON.parse);

      /* remove None from protection scheme */
      const tmpSchemes = entry.protectionscheme.filter((data, index) => {
        return entry.protectionscheme.indexOf(data) === index;
      });
      var idx = tmpSchemes.indexOf("None");
      if (idx > -1) {
        tmpSchemes.splice(idx, 1);
      }
      entry.protectionscheme = tmpSchemes;

      if (this.$vuetify.breakpoint.smAndUp) {
        entry.releases.headers = [
          { text: "#", value: "releaseSeq" },
          { text: "Publisher(s)", value: "publishers" },
          { text: "Year", value: "yearOfRelease" },
          { text: "Alt. title", value: "asTitle" },
          { text: "Price", value: "releasePrice" },
        ];
        entry.item_short_headers = [
          { text: "Title", value: "title" },
          { text: "Publisher(s)", value: "publisher" },
          { text: "Machinetype", value: "machineType" },
        ];
        entry.compilationContent_headers = [
          { text: "Side", value: "side" },
          { text: "Title", value: "title" },
          { text: "Publisher(s)", value: "publisher" },
        ];
      } else {
        /* small mobile */
        entry.releases.headers = [
          { text: "#", value: "releaseSeq" },
          { text: "Publisher(s)", value: "publishers" },
          { text: "Year", value: "yearOfRelease" },
        ];
        entry.item_short_headers = [
          { text: "Title", value: "title" },
          { text: "Publisher(s)", value: "publisher" },
        ];
        entry.compilationContent_headers = [
          { text: "Title", value: "title" },
          { text: "Publisher(s)", value: "publisher" },
        ];
      }

      if (this.$vuetify.breakpoint.mdAndUp) {
        entry.additionals_headers = [
          { text: "Filename", value: "path" },
          { text: "Type", value: "type" },
          { text: "Format", value: "format" },
          { text: "Link", value: "actions" },
        ];
        entry.downloads.headers = [
          { text: "Filename", value: "url" },
          { text: "Type", value: "type" },
          { text: "Format", value: "format" },
          { text: "Protection scheme", value: "encodingscheme" },
          { text: "Original", value: "origin" },
        ];
        entry.magrefs_headers = [
          { text: "Magazine", value: "magazineName" },
          { text: "Issue", value: "issue" },
          { text: "Page", value: "page" },
          { text: "Type", value: "type" },
          { text: "Score", value: "score" },
        ];
      } else if (this.$vuetify.breakpoint.smOnly) {
        entry.additionals_headers = [
          { text: "Filename", value: "path" },
          { text: "Link", value: "actions" },
        ];
        entry.downloads.headers = [
          { text: "Filename", value: "url" },
          { text: "Type", value: "type" },
          { text: "Format", value: "format" },
          { text: "Original", value: "origin" },
        ];
        entry.magrefs_headers = [
          { text: "Magazine", value: "magazineName" },
          { text: "Issue", value: "issue" },
          { text: "Page", value: "page" },
          { text: "Type", value: "typeMed" },
        ];
      } else {
        entry.additionals_headers = [
          { text: "Filename", value: "path" },
          { text: "Link", value: "actions" },
        ];
        entry.downloads.headers = [{ text: "Filename", value: "url" }];
        entry.magrefs_headers = [
          { text: "Magazine", value: "magazineName" },
          { text: "Issue", value: "issue" },
          { text: "Page", value: "page" },
          { text: "Type", value: "typeMed" },
        ];
      }

      entry.tosec = this.GameData._source.tosec;
      entry.relatedlinks = this.GameData._source.relatedLinks;

      // filter out some unused sites
      entry.relatedsites = [];
      for (var site in this.GameData._source.relatedSites) {
        var siteItem = this.GameData._source.relatedSites[site];
        switch (siteItem.siteName) {
          case "Spectrum 2.0":
          case "ZX-Art":
          case "Spectrum Computing":
          case "The Tipshop":
          case "WorldOfSpectrum":
            entry.relatedsites.push(siteItem);
        }
      }

      entry.score = {};
      entry.score.score = this.GameData._source.score.score;
      entry.score.votes = this.GameData._source.score.votes;

      // entry.coverimage = this.getCoverImage(this.GameData);

      entry.additionals = [];
      for (var aidx in this.GameData._source.additionalDownloads) {
        var aidx_item = this.GameData._source.additionalDownloads[aidx];
        aidx_item.url = this.getScreenUrl(this.GameData._source.additionalDownloads[aidx].path);
        entry.additionals.push(aidx_item);
      }

      // look for inlay
      var inlays = []; // contains inlay, if found from Type
      var allInlays = []; // contains all matching type or inlay in filename
      for (idx = 0; idx < this.GameData._source.additionalDownloads.length; idx++) {
        let item = this.GameData._source.additionalDownloads[idx];
        if (["Cassette inlay", "Cassette inlay - Front"].includes(item.type)) {
          inlays.push(item);
        }
        if (item.type.toLowerCase().indexOf("inlay") !== -1 || item.path.toLowerCase().indexOf("inlay") !== -1) {
          allInlays.push(item);
        }
      }
      inlays.sort((a, b) => (a.url < b.url ? 1 : -1));
      //allInlays.sort((a, b) => (a.url > b.url ? 1 : -1));

      entry.inlayimage = this.getDefaultImageSrc;
      if (inlays.length > 0) {
        entry.inlayimage = this.getScreenUrl(inlays[0].url);
      } else if (allInlays.length > 0) {
        entry.inlayimage = this.getScreenUrl(allInlays[0].url);
      }
      entry.allinlays = [];
      for (idx = 0; idx < allInlays.length; idx++) {
        entry.allinlays.push(this.getScreenUrl(allInlays[idx].path));
      }
      return entry;
    },
  },
  components: {
    DetailViewTopSmall,
    DetailViewTop,
    BasicInfoView,
    ReleasesView,
    ExtendedInfoView,
    CompilationInfoView,
    RelationsInfoView,
    BookInfoView,
    LinksInfoView,
    GameCard,
  },
  watch: {
    // reload page when linking to new entry
    $route() {
      // console.log(to + " -> " + from);
      this.loadentry();
    },
  },
};
</script>
<style>
/* remove padding from expansion-panel-content */
.v-expansion-panel-content>>>.v-expansion-panel-content__wrap {
  padding: 4px;
}

a:hover,
a:link,
a:visited,
a.router-link-active,
a.router-link-exact-active {
  color: black;
  cursor: pointer;
  text-decoration: underline;
}

.wrap-text {
  -webkit-line-clamp: unset !important;
}
</style>
