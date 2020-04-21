<template>
  <v-card class="mx-auto" max-width="80%" v-if="isLoaded">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ entry.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ entry.yearofrelease }} {{ entry.publisher }} {{ entry.publisher_country }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="pa-0">
      <v-row align="center">
        <v-col cols="4">
          <v-img :src="entry.screenurl" :alt="entry.title" width="256"></v-img>
        </v-col>
        <v-col cols="4">
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
        <v-col cols="4"> </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-simple-table dense>
      <template v-slot:default>
        <tbody>
          <tr>
            <td class="font-weight-bold" width="25%">Title</td>
            <td>{{ entry.title }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Also known as</td>
            <td>{{ entry.alsoKnownAs }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Orignial Release Year</td>
            <td>{{ entry.originalReleaseYear }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Orignial Publisher</td>
            <td>{{ entry.originalPublisher }} {{ entry.originalPublisherCountry }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Authors</td>
            <td></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Message Language</td>
            <td></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Machine Type</td>
            <td>{{ entry.machinetype }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Genre</td>
            <td>{{ entry.genre }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Control Options</td>
            <td></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Original Price</td>
            <td></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Comments</td>
            <td>{{ entry.comments }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">Features</td>
            <td></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Other platforms</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>Full Report</v-btn>
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
    entry() {
      let entry = {};
      entry.id = this.GameData._id;
      entry.title = this.GameData._source.fulltitle;
      entry.alsoKnownAs = this.GameData._source.alsoknownas;
      entry.originalReleaseYear = this.GameData._source.yearofrelease === undefined ? "-" : this.GameData._source.yearofrelease;

      entry.originalPublisher = "";
      entry.originalPublisherCountry = "";
      if (this.GameData._source.publisher.length) {
        entry.publisher = this.GameData._source.publisher[0].name;
        if (this.GameData._source.publisher[0].country !== undefined) {
          entry.publisher_country = "(" + this.GameData._source.publisher[0].country + ")";
        }
      }

      if (this.GameData._source.machinetype === undefined) {
        entry.machinetype = "-";
      } else {
        entry.machinetype = this.GameData._source.machinetype;
      }

      entry.genre = "-/-";
      if (this.GameData._source.type !== undefined) {
        entry.genre = this.GameData._source.type + "/" + this.GameData._source.subtype;
      }

      entry.comments = this.GameData._source.remarks;

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
.v-data-table /deep/ tbody /deep/ tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}
</style>
