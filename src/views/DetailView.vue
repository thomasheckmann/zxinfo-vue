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
            <td :class="entry.originalReleaseYear != '-' ? 'font-weight-bold' : 'font-weight-light'">Orignial Release Year</td>
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
            <td :class="entry.modFrom.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
              Mod from
            </td>
            <td valign="top">
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(mod, i) in entry.modFrom" :key="i" two-line>
                  <v-list-item-content class="py-1">
                    <router-link :to="'/details/' + mod.id">
                      <v-list-item-subtitle>{{ mod.title }} - {{ mod.publisher }}</v-list-item-subtitle>
                    </router-link>
                    <v-list-item-subtitle>{{ mod.machinetype }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.inspiredBy.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
              Inspired by
            </td>
            <td valign="top">
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(insp, i) in entry.inspiredBy" :key="i" two-line>
                  <v-list-item-content class="py-1">
                    <router-link :to="'/details/' + insp.id">
                      <v-list-item-subtitle>{{ insp.title }} - {{ insp.publisher }}</v-list-item-subtitle>
                    </router-link>
                    <v-list-item-subtitle>{{ insp.machinetype }}</v-list-item-subtitle>
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
            <td :class="entry.maximumPlayers ? 'font-weight-bold' : 'font-weight-light'">Maximum Players</td>
            <td valign="top">{{ entry.maximumPlayers }}</td>
          </tr>
          <tr>
            <td :class="entry.multiTurnType ? 'font-weight-bold' : 'font-weight-light'">Multi-Turn Type</td>
            <td valign="top">{{ entry.multiTurnType }}</td>
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
            <td :class="entry.competitions.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Competitions</td>
            <td>
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(competition, i) in entry.competitions" :key="i">
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle>{{ competition }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.authoredWith.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Authored with</td>
            <td>
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(authoredwith, i) in entry.authoredWith" :key="i" two-line>
                  <v-list-item-content class="py-1">
                    <router-link :to="'/details/' + authoredwith.id">
                      <v-list-item-subtitle>{{ authoredwith.title }} - {{ authoredwith.publisher }}</v-list-item-subtitle>
                    </router-link>
                    <v-list-item-subtitle>{{ authoredwith.machinetype }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>
          <tr>
            <td :class="entry.authoring.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Programs authored</td>
            <td>
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(authoring, i) in entry.authoring" :key="i">
                  <v-list-item-content class="py-1">
                    <router-link :to="'/details/' + authoring.id">
                      <v-list-item-subtitle>{{ authoring.title }} - {{ authoring.publisher }}</v-list-item-subtitle>
                    </router-link>
                    <v-list-item-subtitle>{{ authoring.machinetype }}</v-list-item-subtitle>
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
import imageHelper from "@/helpers/image-helper";

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
    screenurl: imageHelper.screenurl,
  },
  computed: {
    // cleaned version of JSON

    /*
     * Main test cases:
     *
     * GAME: 0002259 (Author without country)
     * In compilation: 0002259
     * original price: missing 0007869
     * mod from: 0032032
     * Inspiration for: 3012
     * Modified by: 3012
     * Can be edited with: 3012
     * Competitions: 3012
     * Series: 3012
     *
     * Multi-Turn type: 3067
     * Maximum players: 3067
     *
     * COMPILATION: 11372, 11869
     * compilation content: 11372, 11869
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

      entry.modFrom = [];
      for (var mod in this.GameData._source.mod_of) {
        if (this.GameData._source.mod_of[mod].is_mod) {
          entry.modFrom.push({
            id: this.GameData._source.mod_of[mod].id,
            title: this.GameData._source.mod_of[mod].title,
            machinetype: this.GameData._source.mod_of[mod].machinetype,
            publisher: this.GameData._source.mod_of[mod].publisher,
          });
        }
      }
      entry.inspiredBy = [];
      for (var insp in this.GameData._source.mod_of) {
        if (!this.GameData._source.mod_of[mod].is_mod) {
          entry.inspiredBy.push({
            id: this.GameData._source.mod_of[insp].id,
            title: this.GameData._source.mod_of[insp].title,
            machinetype: this.GameData._source.mod_of[insp].machinetype,
            publisher: this.GameData._source.mod_of[insp].publisher,
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

      entry.maximumPlayers = this.GameData._source.numberofplayers == undefined ? "" : this.GameData._source.numberofplayers;
      entry.multiTurnType = this.GameData._source.multiplayermode == undefined ? "" : this.GameData._source.multiplayermode;

      entry.controlOptions = [];
      for (var control in this.GameData._source.controls) {
        entry.controlOptions.push(this.GameData._source.controls[control].control);
      }

      if (this.GameData._source.originalprice) {
        entry.originalPriceAmount = this.GameData._source.originalprice[0].amount;
        entry.originalPriceCurrency = this.GameData._source.originalprice[0].currency;
      } else {
        entry.originalPriceAmount = "";
        entry.originalPriceCurrency = "";
      }

      entry.comments = this.GameData._source.remarks;

      entry.features = [];
      for (var feature in this.GameData._source.features) {
        entry.features.push(this.GameData._source.features[feature].name);
      }

      entry.competitions = [];
      for (var competition in this.GameData._source.competition) {
        entry.competitions.push(this.GameData._source.competition[competition].name);
      }

      entry.authoredWith = [];
      for (var authoredwith in this.GameData._source.authored) {
        var authoredwithitem = this.GameData._source.authored[authoredwith];
        authoredwithitem.id = "FIX IN ZXDB-ES";
        authoredwithitem.machinetype = "FIX IN ZXINFO-ES";
        entry.authoredWith.push(authoredwithitem);
      }

      entry.authoring = [];
      for (var authoring in this.GameData._source.authoring) {
        var authoringitem = this.GameData._source.authoring[authoring];
        authoringitem.id = "FIX IN ZXDB-ES";
        authoringitem.machinetype = "FIX IN ZXINFO-ES";
        entry.authoring.push(authoringitem);
      }

      entry.otherPlatforms = [];
      for (var platform in this.GameData._source.othersystems) {
        entry.otherPlatforms.push(this.GameData._source.othersystems[platform]);
      }

      entry.score = {};
      entry.score.score = this.GameData._source.score.score;
      entry.score.votes = this.GameData._source.score.votes;

      entry.screenurl = this.screenurl(this.GameData);
      return entry;
    },
  },
  components: {},
  watch: {
    // reload page when linking to new entry
    $route() {
      // console.log(to + " -> " + from);
      this.loadentry();
    },
  },
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
