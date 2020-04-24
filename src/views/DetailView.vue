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
          <tr :style="!isDevelopment && !entry.alsoKnownAs ? 'display: none;' : ''">
            <td :class="entry.alsoKnownAs ? 'font-weight-bold' : 'font-weight-light'">Also known as</td>
            <td>{{ entry.alsoKnownAs }}</td>
          </tr>
          <tr :style="entry.originalReleaseYear == '-' && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.originalReleaseYear != '-' ? 'font-weight-bold' : 'font-weight-light'">Orignial Release Year</td>
            <td valign="top">{{ entry.originalReleaseYear }}</td>
          </tr>
          <tr :style="!entry.originalPublisher && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.originalPublisher ? 'font-weight-bold' : 'font-weight-light'">Orignial Publisher</td>
            <td valign="top">{{ entry.originalPublisher }} {{ entry.originalPublisherCountry }}</td>
          </tr>
          <tr :style="!entry.authors.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.licensed && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.licensed ? 'font-weight-bold' : 'font-weight-light'" valign="top">Tie-in Licence</td>
            <td valign="top">
              <v-list flat dense class="pa-0">
                <v-list-item class="pa-0 ma-0 auto" v-for="(license, i) in entry.licensed" :key="i">
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle
                      >{{ license.name }}({{ license.country }}) - {{ license.type }}:
                      {{ license.originalname }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </tr>

          <tr :style="!entry.modFrom.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.inspiredBy.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.messageLanguage && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.messageLanguage ? 'font-weight-bold' : 'font-weight-light'">Message Language</td>
            <td valign="top">{{ entry.messageLanguage }}</td>
          </tr>
          <tr :style="entry.machinetype == '-' && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.machinetype != '-' ? 'font-weight-bold' : 'font-weight-light'">Machine Type</td>
            <td>{{ entry.machinetype }}</td>
          </tr>
          <tr :style="entry.genre == '-/-' && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.genre != '-/-' ? 'font-weight-bold' : 'font-weight-light'">Genre</td>
            <td>{{ entry.genre }}</td>
          </tr>
          <tr :style="!entry.maximumPlayers && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.maximumPlayers ? 'font-weight-bold' : 'font-weight-light'">Maximum Players</td>
            <td valign="top">{{ entry.maximumPlayers }}</td>
          </tr>
          <tr :style="!entry.multiTurnType && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.multiTurnType ? 'font-weight-bold' : 'font-weight-light'">Multi-Turn Type</td>
            <td valign="top">{{ entry.multiTurnType }}</td>
          </tr>
          <tr :style="!entry.controlOptions.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.originalPriceAmount && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.originalPriceAmount ? 'font-weight-bold' : 'font-weight-light'">Original Price</td>
            <td>{{ entry.originalPriceAmount }} {{ entry.originalPriceCurrency }}</td>
          </tr>
          <tr :style="!entry.comments && !isDevelopment ? 'display: none;' : ''">
            <td :class="entry.comments ? 'font-weight-bold' : 'font-weight-light'" valign="top">Comments</td>
            <td>{{ entry.comments }}</td>
          </tr>
          <tr :style="!entry.features.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.competitions.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.authoredWith.length && !isDevelopment ? 'display: none;' : ''">
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
          <tr :style="!entry.otherPlatforms.length && !isDevelopment ? 'display: none;' : ''">
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
          <!-- A LOT OF EXPANSION PANELS -->
          <tr>
            <td colspan="2" class="pa-0">
              <v-expansion-panels class="pa-0">
                <!-- * RELEASES * -->
                <v-expansion-panel :hidden="!(entry.releases.length > 1) && !isDevelopment">
                  <v-expansion-panel-header :class="entry.releases.length > 1 ? 'font-weight-bold' : 'font-weight-light'"
                    >Releases</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pl-0"
                      :headers="entry.releases.headers"
                      :items="entry.releases"
                      disable-sort
                      hide-default-footer
                      dense
                      :mobile-breakpoint="0"
                    ></v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * AVAILABLE FORMATS * -->
                <v-expansion-panel :hidden="!entry.availableformat.length > 1 && !isDevelopment">
                  <v-expansion-panel-header :class="entry.availableformat.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Available formats</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-chip v-for="(format, i) in entry.availableformat" :key="i" class="ma-1" color="green" small outlined label>
                      {{ format.format }} <v-icon small right>{{ getIconForDownload(format.type) }}</v-icon></v-chip
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * PROTECTION SCHEMES * -->
                <v-expansion-panel :hidden="!entry.protectionscheme.length > 1 && !isDevelopment">
                  <v-expansion-panel-header :class="entry.protectionscheme.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Protection schemes</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-chip v-for="(format, i) in entry.protectionscheme" :key="i" class="ma-1" small label> {{ format }}</v-chip>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * INSPIRATION FOR * -->
                <v-expansion-panel :hidden="!entry.inspirationFor.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.inspirationFor.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Inspiration for</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.item_short_headers"
                      :items="entry.inspirationFor"
                      disable-sort
                      hide-default-header
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.title="{ item }">
                        <router-link :to="'/details/' + item.id"
                          >{{ item.title }} - {{ item.publisher }} ({{ item.machinetype }})</router-link
                        >
                      </template></v-data-table
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- *MODIFIED BY * -->
                <v-expansion-panel :hidden="!entry.modifiedBy.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.modifiedBy.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Modified by</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.item_short_headers"
                      :items="entry.modifiedBy"
                      disable-sort
                      hide-default-header
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.title="{ item }">
                        <router-link :to="'/details/' + item.id"
                          >{{ item.title }} - {{ item.publisher }} ({{ item.machinetype }})</router-link
                        >
                      </template></v-data-table
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * PROGRAMS AUTHORED WITH * -->
                <v-expansion-panel :hidden="!entry.authoring.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.authoring.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Programs authored</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.item_short_headers"
                      :items="entry.authoring"
                      disable-sort
                      hide-default-header
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.title="{ item }">
                        <router-link :to="'/details/' + item.id">{{ item.title }} - {{ item.publisher }}</router-link>
                      </template></v-data-table
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * IN COMPILATIONS  * -->
                <v-expansion-panel :hidden="!entry.inCompilations.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.inCompilations.length ? 'font-weight-bold' : 'font-weight-light'"
                    >In compilations</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.item_short_headers"
                      :items="entry.inCompilations"
                      disable-sort
                      hide-default-header
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.title="{ item }">
                        <router-link :to="'/details/' + item.id">{{ item.title }} - {{ item.publisher }}</router-link>
                      </template></v-data-table
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * COMPILATION CONTENT  * -->
                <v-expansion-panel :hidden="!entry.compilationContent.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.compilationContent.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Compilation content</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.item_short_headers"
                      :items="entry.compilationContent"
                      disable-sort
                      hide-default-header
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.title="{ item }">
                        <router-link :to="'/details/' + item.id"
                          >{{ side }} {{ item.title }} - {{ item.publisher }} ({{ item.variation }})</router-link
                        >
                      </template></v-data-table
                    >
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * Download info * -->
                <v-expansion-panel :hidden="!entry.downloads.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.downloads.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Download info</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-data-table
                      class="pa-0"
                      :headers="entry.downloads.headers"
                      :items="entry.downloads"
                      disable-sort
                      hide-default-header
                      hide-default-footer
                      dense
                      flat
                      :mobile-breakpoint="0"
                      ><template v-slot:item.origin="{ item }">
                        <v-simple-checkbox
                          disabled
                          v-bind:value="item.origin == 'Original release (O)'"
                        ></v-simple-checkbox> </template
                    ></v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * TOSEC * -->
                <v-expansion-panel :hidden="!entry.tosec.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.tosec.length ? 'font-weight-bold' : 'font-weight-light'"
                    >TOSEC Info</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-list flat dense class="pa-0">
                      <v-list-item class="pa-0 ma-0 auto" v-for="(tosec, i) in entry.tosec" :key="i" two-line>
                        <v-list-item-content class="py-1">
                          {{ tosec.url }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * Additional downloads  * -->
                <v-expansion-panel :hidden="!entry.additionals.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.additionals.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Additional Downlod</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-list flat outline dense class="pa-0">
                      <v-list-item class="pa-0 ma-0 auto" v-for="(additional, i) in entry.additionals" :key="i" two-line>
                        <v-list-item-content class="py-1">
                          <v-list-item-subtitle>{{ additional.url }} </v-list-item-subtitle>
                          <v-list-item-subtitle>{{ additional.type }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * Related links  * -->
                <v-expansion-panel :hidden="!entry.relatedlinks.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.relatedlinks.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Related links</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-list flat outline dense class="pa-0">
                      <v-list-item class="pa-0 ma-0 auto" v-for="(link, i) in entry.relatedlinks" :key="i" two-line>
                        <v-list-item-content class="py-1">
                          <v-list-item-subtitle>{{ link.sitename }} </v-list-item-subtitle>
                          <v-list-item-subtitle>{{ link.link }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- * Related sites  * -->
                <v-expansion-panel :hidden="!entry.relatedsites.length && !isDevelopment">
                  <v-expansion-panel-header :class="entry.relatedsites.length ? 'font-weight-bold' : 'font-weight-light'"
                    >Related sites</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-list flat outline dense class="pa-0">
                      <v-list-item class="pa-0 ma-0 auto" v-for="(link, i) in entry.relatedsites" :key="i" two-line>
                        <v-list-item-content class="py-1">
                          <v-list-item-subtitle>{{ link.sitename }} </v-list-item-subtitle>
                          <v-list-item-subtitle>{{ link.link }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
    getIconForDownload: function(file_type) {
      switch (file_type) {
        case "Snapshot image":
        case "Computer/ZX Interface 2 cartridge ROM image dump":
        case "DOCK cartridge ROM image dump":
          return "mdi-archive";
        case "Tape image":
        case "Archive file":
        case "Covertape version":
        case "BUGFIX tape image":
          return "mdi-cassette";
        case "Disk image":
          return "mdi-floppy";
        case "Complete book":
          return "mid-book-open-page-variant";
        case "Electronic magazine":
          return "mid-book-open";
        default:
          return "mdi-archive";
      }
    },
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
    isDevelopment() {
      return process.env.NODE_ENV == "development";
    },
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

      entry.licensed = this.GameData._source.licensed;

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
        authoredwithitem.id = this.GameData._source.authored[authoredwith].id;
        authoredwithitem.machinetype = this.GameData._source.authored[authoredwith].machinetype;
        entry.authoredWith.push(authoredwithitem);
      }

      entry.authoring = [];
      for (var authoring in this.GameData._source.authoring) {
        var authoringitem = this.GameData._source.authoring[authoring];
        authoringitem.id = this.GameData._source.authoring[authoring].id;
        authoringitem.machinetype = this.GameData._source.authoring[authoring].machinetype;
        entry.authoring.push(authoringitem);
      }

      entry.inCompilations = [];
      for (var compilation in this.GameData._source.incompilations) {
        var incompitem = this.GameData._source.incompilations[compilation];
        incompitem.id = this.GameData._source.incompilations[compilation].id;
        incompitem.machinetype = this.GameData._source.incompilations[compilation].machinetype;
        entry.inCompilations.push(incompitem);
      }

      entry.compilationContent = [];
      for (var content in this.GameData._source.contents) {
        var contentItem = this.GameData._source.contents[content];
        contentItem.id = this.GameData._source.contents[content].id;
        contentItem.machinetype = this.GameData._source.contents[content].machinetype;
        entry.compilationContent.push(contentItem);
      }

      entry.otherPlatforms = [];
      for (var platform in this.GameData._source.othersystems) {
        entry.otherPlatforms.push(this.GameData._source.othersystems[platform]);
      }

      // iterate releases to find rereleases, downloads, available format and encodingschemes
      entry.releases = [];
      entry.availableformat = [];
      entry.protectionscheme = [];
      entry.downloads = [];

      for (var release in this.GameData._source.releases) {
        if (
          this.GameData._source.releases[release].format &&
          !entry.availableformat.find((obj) => obj.format == this.GameData._source.releases[release].format)
        ) {
          entry.availableformat.push({
            format: this.GameData._source.releases[release].format,
            type: this.GameData._source.releases[release].type,
          });
        }
        if (
          this.GameData._source.releases[release].encodingscheme &&
          entry.protectionscheme.indexOf(this.GameData._source.releases[release].encodingscheme) < 0
        ) {
          entry.protectionscheme.push(this.GameData._source.releases[release].encodingscheme);
        }
        if (
          /*this.GameData._source.releases[release].release !== 0 &&*/
          entry.releases
            .map(function(e) {
              return e.release;
            })
            .indexOf(this.GameData._source.releases[release].release) < 0
        ) {
          entry.releases.push(this.GameData._source.releases[release]);
        }
        if (this.GameData._source.releases[release].url) {
          entry.downloads.push({
            url: this.GameData._source.releases[release].url,
            type: this.GameData._source.releases[release].type,
            format: this.GameData._source.releases[release].format,
            encodingscheme: this.GameData._source.releases[release].encodingscheme,
            origin: this.GameData._source.releases[release].origin,
          });
        }
      }

      entry.downloads.headers = [
        { text: "Filename", value: "url" },
        { text: "Type/format", value: "type" },
        { text: "Protection scheme", value: "encodingscheme" },
        { text: "Orignial", value: "origin" },
      ];

      if (this.$vuetify.breakpoint.smAndUp) {
        entry.releases.headers = [
          { text: "#", value: "release" },
          { text: "Publisher", value: "publisher" },
          { text: "Year", value: "yearofrelease" },
          { text: "Price", value: "releaseprice" },
          { text: "Title", value: "as_title" },
        ];
      } else {
        entry.releases.headers = [
          { text: "#", value: "release" },
          { text: "Publisher", value: "publisher" },
          { text: "Year", value: "yearofrelease" },
          { text: "Title", value: "as_title" },
        ];
      }

      entry.item_short_headers = [{ text: "Title", value: "title" }];

      entry.additionals = [];
      for (var aidx in this.GameData._source.additionals) {
        var item = this.GameData._source.additionals[aidx];
        entry.additionals.push(item);
      }

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

      entry.tosec = this.GameData._source.tosec;
      entry.relatedlinks = this.GameData._source.relatedlinks;

      // filter out some unused sites
      entry.relatedsites = [];
      for (var site in this.GameData._source.relatedsites) {
        var siteItem = this.GameData._source.relatedsites[site];
        switch (siteItem.sitename) {
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

/* remove padding from expansion-panel-content */
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0px;
}
</style>
