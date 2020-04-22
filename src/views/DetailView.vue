<template>
  <v-card class="mx-auto" :max-width="$vuetify.breakpoint.xsOnly ? '100%' : '80%'" v-if="isLoaded">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ entry.title }}</v-list-item-title>
        <v-list-item-subtitle
          >{{ entry.originalReleaseYear }} {{ entry.originalPublisher }}
          {{ entry.originalPublisherCountry }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pa-0">
      <v-row align="start">
        <v-col cols="6" :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
          <v-img :src="entry.screenurl" :alt="entry.title" width="256"></v-img>
        </v-col>
        <v-col cols="6" :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
          {{ entry.machinetype }}<br />{{ entry.genre }}<br />
          <v-rating
            v-model="entry.score.score"
            background-color="grey lighten-1"
            color="red lighten-2"
            full-icon="mdi-heart"
            half-icon="mdi-heart-half-full"
            empty-icon="mdi-heart-outline"
            half-increments
            x-small
            dense
            readonly
            length="10"
          ></v-rating>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="font-weight-bold" width="33%">Title</td>
            <td>{{ entry.title }}</td>
          </tr>
          <tr>
            <td :class="entry.alsoKnownAs ? 'font-weight-bold' : 'font-weight-light'">Also known as</td>
            <td>{{ entry.alsoKnownAs }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Orignial Release Year</td>
            <td valign="top">{{ entry.originalReleaseYear }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Orignial Publisher</td>
            <td valign="top">{{ entry.originalPublisher }} {{ entry.originalPublisherCountry }}</td>
          </tr>
          <tr>
            <td :class="entry.authors.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Authors</td>
            <td valign="top">
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(author, i) in entry.authors" :key="i">
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle>{{ author.name }} {{ author.country }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.messageLanguage ? 'font-weight-bold' : 'font-weight-light'">Message Language</td>
            <td valign="top">{{ entry.messageLanguage }}</td>
          </tr>
          <tr>
            <td :class="entry.machinetype != '-' ? 'font-weight-bold' : 'font-weight-light'">Machine Type</td>
            <td>{{ entry.machinetype }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Genre</td>
            <td>{{ entry.genre }}</td>
          </tr>
          <tr>
            <td :class="entry.controlOptions.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
              Control Options
            </td>
            <td>
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(control, i) in entry.controlOptions" :key="i">
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle>{{ control }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.originalPriceAmount ? 'font-weight-bold' : 'font-weight-light'">Original Price</td>
            <td>{{ entry.originalPriceAmount }} {{ entry.originalPriceCurrency }}</td>
          </tr>
          <tr>
            <td :class="entry.comments ? 'font-weight-bold' : 'font-weight-light'" valign="top">Comments</td>
            <td>{{ entry.comments }}</td>
          </tr>
          <tr>
            <td :class="entry.features.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Features</td>
            <td>
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(feature, i) in entry.features" :key="i">
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle>{{ feature }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.otherPlatforms.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Other platforms</td>
            <td>
              <v-row justify="start" align="center">
                <v-chip
                  v-for="(platform, i) in entry.otherPlatforms"
                  :key="i"
                  class="ma-1"
                  small
                  outlined
                  label
                  @click="openUrl(platform.url)"
                  :disabled="platform.url == null"
                >
                  {{ platform.name }} <v-icon small right>mdi-link</v-icon>
                </v-chip>
              </v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>BUTTON</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "DetailView",
  data() {
    return {
      isLoaded: false,
      GameData: Object,
      BasicInfo: [],
    };
  },
  mounted() {
    this.loadentry();
  },
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
    loadentry() {
      this.isLoaded = false;
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/games/" + this.$route.params.entryid + "?mode=full")
        .then((response) => {
          this.GameData = response.data;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.isLoaded = false;
          console.log(error);
        })
        .finally(() => {});
    },
  },
  computed: {
    // cleaned version of JSON

    /*
     * Main test cases:
     *
     * GAME: 0002259 (Author without country)
     * original price: missing 0007869
     * HARDWARE: 1000220
     * BOOK: 2000388
     */
    entry() {
      let entry = {};
      entry.id = this.GameData._id;
      entry.title = this.GameData._source.fulltitle;
      entry.alsoKnownAs = this.GameData._source.alsoknownas;
      entry.originalReleaseYear = this.GameData._source.yearofrelease === undefined ? "-" : this.GameData._source.yearofrelease;

      entry.originalPublisher = "";
      entry.originalPublisherCountry = "";
      if (this.GameData._source.publisher.length) {
        entry.originalPublisher = this.GameData._source.publisher[0].name;
        if (this.GameData._source.publisher[0].country !== undefined) {
          entry.originalPublisherCountry = "(" + this.GameData._source.publisher[0].country + ")";
        }
      }

      entry.authors = [];
      if (this.GameData._source.authors.length) {
        for (var author in this.GameData._source.authors[0].authors) {
          var country = this.GameData._source.authors[0].authors[author].country;
          entry.authors.push({
            name: this.GameData._source.authors[0].authors[author].name,
            country: country == undefined ? "" : "(" + country + ")",
          });
        }
      }

      entry.messageLanguage = this.GameData._source.messagelanguage;

      if (this.GameData._source.machinetype === undefined) {
        entry.machinetype = "-";
      } else {
        entry.machinetype = this.GameData._source.machinetype;
      }

      entry.genre = "-/-";
      if (this.GameData._source.type !== undefined) {
        entry.genre = this.GameData._source.type + "/" + this.GameData._source.subtype;
      }

      entry.controlOptions = [];
      for (var control in this.GameData._source.controls) {
        entry.controlOptions.push(this.GameData._source.controls[control].control);
      }

      // original price: missing 0007869
      if (this.GameData._source.originalprice) {
        entry.originalPriceAmount = this.GameData._source.originalprice[0].amount;
        entry.originalPriceCurrency = this.GameData._source.originalprice[0].currency;
      } else {
        entry.originalPriceAmount = "";
        entry.originalPriceCurrency = "";
      }

      entry.comments = this.GameData._source.remarks;

      // features: multiple 0012733
      entry.features = [];
      for (var feature in this.GameData._source.features) {
        entry.features.push(this.GameData._source.features[feature].name);
      }

      entry.otherPlatforms = [];
      for (var platform in this.GameData._source.othersystems) {
        entry.otherPlatforms.push(this.GameData._source.othersystems[platform]);
      }

      // handle screens, make one a "cover"
      entry.screenurl = "https://zxinfo.dk/media/images/empty.png";
      if (this.GameData._source.type === "Compilation") {
        entry.screenurl = "https://zxinfo.dk/media/images/compilation.png";
      } else if (this.GameData._source.screens.length) {
        let screen = this.GameData._source.screens[0];
        if (screen.url.startsWith("/pub/sinclair/books-pics")) {
          entry.screenurl = "https://zxinfo.dk/media" + screen.url.replace("/pub/sinclair/books-pics", "/thumbs/books-pics");
        } else if (screen.url.startsWith("/zxscreen")) {
          entry.screenurl = "https://zxinfo.dk/media" + screen.url;
        } else if (screen.url.startsWith("/pub")) {
          entry.screenurl = "https://spectrumcomputing.co.uk/" + screen.url;
        } else if (screen.url.startsWith("/zxdb/sinclair/pics/hw/")) {
          entry.screenurl = "https://zxinfo.dk/media" + screen.url.replace("/zxdb/sinclair/pics/hw/", "/thumbs/hardware-pics/");
        } else {
          console.log("UKNOWN ACTION(" + this.GameData._id + "): " + screen.url);
        }
      }

      entry.score = {};
      entry.score.score = this.GameData._source.score.score;
      entry.score.votes = this.GameData._source.score.votes;
      return entry;
    },
  },
  components: {},
};
</script>
<style scoped>
/* disable hover effect on table */
.v-data-table /deep/ tbody /deep/ tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}

/* dense. extra dense! */
.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 16px;
}
</style>
