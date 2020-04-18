<template>
  <v-card outlined>
    <v-img
      :src="entry.screenurl"
      class="white--text align-end"
      lazy-src="https://zxinfo.dk/media/images/empty.png"
      aspect-ratio="1.33"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
        </v-row> </template
    ></v-img>
    <v-card-title class="d-inline-block text-truncate" style="max-width: 100%;" v-text="entry.title"></v-card-title>
    <v-card-subtitle class="pb-0 text-truncate" style="max-width: 100%;"
      >{{ entry.yearofrelease }} {{ entry.publisher }} {{ entry.publisher_country }}</v-card-subtitle
    >
    <v-card-text class="text--primary">
      <div>{{ entry.machinetype }}</div>
      <div class="d-inline-block text-truncate" style="max-width: 100%;">
        {{ entry.type }}
      </div>
      <div>
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
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "GameCard",
  props: ["GameData"],
  computed: {
    // cleaned version of JSON
    entry() {
      let entry = {};
      entry.id = this.GameData._id;
      entry.title = this.GameData._source.fulltitle;

      if (this.GameData._source.yearofrelease === undefined) {
        entry.yearofrelease = "-";
      } else {
        entry.yearofrelease = this.GameData._source.yearofrelease;
      }

      if (this.GameData._source.machinetype === undefined) {
        entry.machinetype = "-";
      } else {
        entry.machinetype = this.GameData._source.machinetype;
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
      // 0: publisher = main
      if (this.GameData._source.publisher.length) {
        entry.publisher = this.GameData._source.publisher[0].name;
        if (this.GameData._source.publisher[0].country === undefined) {
          entry.publisher_country = "";
        } else {
          entry.publisher_country = "(" + this.GameData._source.publisher[0].country + ")";
        }
      } else {
        entry.publisher = "";
        entry.publisher_country = "";
      }

      if (this.GameData._source.type === undefined) {
        entry.type = "-/-";
      } else {
        entry.type = this.GameData._source.type + "/" + this.GameData._source.subtype;
      }

      entry.score = {};
      entry.score.score = this.GameData._source.score.score;
      entry.score.votes = this.GameData._source.score.votes;
      return entry;
    },
  },
};
</script>
