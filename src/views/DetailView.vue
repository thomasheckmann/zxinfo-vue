<template>
  <v-card class="mx-auto" :max-width="$vuetify.breakpoint.xsOnly ? '100%' : '80%'" v-if="!isLoading">
    <DetailViewTopSmall v-if="$vuetify.breakpoint.xsOnly" v-bind:entry="entry"></DetailViewTopSmall>
    <DetailViewTop v-if="$vuetify.breakpoint.smAndUp" v-bind:entry="entry"></DetailViewTop>

    <v-divider></v-divider>
    <BasicInfoView v-bind:entry="entry"></BasicInfoView>
    <v-slide-group v-model="entry.allinlays" class="py-2 ma-0" :show-arrows="true" :center-active="true">
      <v-slide-item v-for="(inlay, n) in entry.allinlays" :key="n" v-slot:default="{ active, toggle }">
        <v-card :color="active ? 'grey lighten-5' : 'grey lighten-1'" class="ma-4" width="250" height="250" @click="toggle">
          <v-img :src="inlay" class="white--text align-end">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
              </v-row> </template
          ></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <ReleasesView v-bind:entry="entry"></ReleasesView>
    <ExtendedInfoView v-bind:entry="entry"></ExtendedInfoView>
    <CompilationInfoView v-bind:entry="entry"></CompilationInfoView>
    <RelationsInfoView v-bind:entry="entry"></RelationsInfoView>
    <BookInfoView v-bind:entry="entry"></BookInfoView>
    <LinksInfoView v-bind:entry="entry"></LinksInfoView>
  </v-card>
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

//Vue.use(VueMeta, {
//  refreshOnceOnNavigation: true,
//});

export default {
  name: "DetailView",
  metaInfo() {
    if (this.$isDevelopment) console.log("DetailView - metaInfo()");

    if (!this.isLoading) {
      return {
        title: this.entry.title,
        titleTemplate: "%s | ZXInfo",
      };
    }
  },
  data() {
    return {
      isLoading: true,
      GameData: Object,
      BasicInfo: [],
    };
  },
  mounted() {
    if (this.$isDevelopment) console.log("DetailView - mounted():");
    this.loadentry();
  },
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
    loadentry() {
      this.isLoading = true;

      var dataURL = this.$api_base_url + "/games/" + this.$route.params.entryid + "?mode=full";
      if (this.$isDevelopment) console.log(`DetailView.vue - loadentry(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          this.GameData = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.GameData = null; // TODO: Handle NOT found better
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCoverImage: imageHelper.getCoverImage,
    getScreenUrl: imageHelper.getScreenUrl,
  },
  computed: {
    // cleaned version of JSON

    /*
		ENTRY DETAILS
     */
    entry() {
      let entry = {};
      entry.screens = this.GameData._source.screens;
      if (entry.screens.length == 0) {
        entry.screens.push({ url: "/images/placeholder.png" });
      }
      entry.id = this.GameData._id;
      entry.title = this.GameData._source.title;
      entry.contentType = this.GameData._source.contentType;
      entry.zxinfoVersion = this.GameData._source.zxinfoVersion;
      entry.availability = this.GameData._source.availability;
      entry.alsoKnownAs = this.GameData._source.alsoKnownAs;
      entry.originalReleaseYear = this.GameData._source.originalYearOfRelease;

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

      entry.genre = this.GameData._source.genre;
      entry.genreType = this.GameData._source.genreType;
      entry.genreSubType = this.GameData._source.genreSubType;

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
      } else {
        entry.originalPriceAmount = null;
        entry.originalPriceCurrency = null;
      }

      entry.hardwareBlurb = this.GameData._source.hardwareBlurb;
      entry.knownErrors = this.GameData._source.knownErrors
        ? this.GameData._source.knownErrors.replace(/\^/g, "\n").replace(/#/g, "<br/>")
        : null;
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
            entry.comments = entry.comments.replace(
              result[0],
              "<a href='/details/" + result[3] + "'>" + result[1] + "</a> (" + result[2] + ")"
            );
          }
        }
      }

      entry.awards = [];
      for (var award in this.GameData._source.awards) {
        entry.awards.push(this.GameData._source.awards[award].text);
      }

      entry.reviewAwards = this.GameData._source.reviewAwards;

      entry.themedgroups = [];
      for (var theme in this.GameData._source.themedGroup) {
        entry.themedgroups.push(this.GameData._source.themedGroup[theme].name);
      }

      entry.features = [];
      for (var feature in this.GameData._source.features) {
        entry.features.push(this.GameData._source.features[feature].name);
      }

      entry.competitions = [];
      for (var competition in this.GameData._source.competition) {
        entry.competitions.push(this.GameData._source.competition[competition].name);
      }

      entry.unsortedgroups = [];
      for (var group in this.GameData._source.unsortedGroup) {
        entry.unsortedgroups.push(this.GameData._source.unsortedGroup[group].name);
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
      } else {
        entry.additionals_headers = [
          { text: "Filename", value: "path" },
          { text: "Link", value: "actions" },
        ];
        entry.downloads.headers = [{ text: "Filename", value: "url" }];
      }

      /*
		entry.inspirationFor = [];
      entry.modifiedBy = [];
      for (var modby in this.GameData._source.modified_by) {
        var modbyitem = this.GameData._source.modified_by[modby];
        modbyitem.machinetype = this.GameData._source.modified_by[modby].machinetype;
        if (this.GameData._source.modified_by[modby].is_mod) {
          entry.modifiedBy.push(modbyitem);
        } else {
          entry.inspirationFor.push(modbyitem);
        }
      }
*/
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

      entry.coverimage = this.getCoverImage(this.GameData);

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
      allInlays.sort((a, b) => (a.url > b.url ? 1 : -1));

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
/* disable hover effect on table */
.v-data-table /deep/ tbody /deep/ tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}

/* remove padding from expansion-panel-content */
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
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
