<template>
  <v-card outlined>
    <router-link :to="'/details/' + entry.id">
      <v-img
        :src="entry.coverimage"
        class="white--text align-end"
        lazy-src="https://zxinfo.dk/media/images/empty.png"
        aspect-ratio="1.33"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
          </v-row> </template></v-img
    ></router-link>
    <v-card-title class="d-inline-block text-truncate" style="max-width: 100%;" v-text="entry.title"></v-card-title>
    <v-card-subtitle class="pb-0 text-truncate" style="max-width: 100%;"
      ><router-link :to="{ path: '/search', query: { year: entry.yearofrelease } }">{{ entry.yearofrelease }}</router-link
      >&nbsp;
      <span v-for="(orgpub, i) in entry.originalPublisher" :key="i"
        >{{ orgpub.name }} {{ orgpub.country }} <span v-if="i != Object.keys(entry.originalPublisher).length - 1">/ </span></span
      ></v-card-subtitle
    >
    <v-card-text class="text--primary">
      <div>
        <router-link :to="{ path: '/search', query: { machinetype: entry.machinetype } }">{{ entry.machinetype }}</router-link>
      </div>
      <div class="d-inline-block text-truncate" style="max-width: 100%;">
        <router-link :to="{ path: '/search', query: { type: entry.genretype } }">{{ entry.type }}</router-link>
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
import imageHelper from "@/helpers/image-helper";

export default {
  name: "GameCard",
  props: ["GameData"],
  methods: {
    getCoverImage: imageHelper.getCoverImage,
  },
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

      entry.originalPublisher = [];
      for (var publisher in this.GameData._source.publisher) {
        var originalPublisher = this.GameData._source.publisher[publisher].name;
        var originalPublisherCountry = "";
        if (this.GameData._source.publisher[publisher].country !== undefined) {
          originalPublisherCountry = "(" + this.GameData._source.publisher[publisher].country + ")";
        }
        entry.originalPublisher.push({ name: originalPublisher, country: originalPublisherCountry });
      }

      entry.genretype = this.GameData._source.type;
      if (this.GameData._source.type === undefined) {
        entry.type = "-/-";
      } else {
        entry.type = this.GameData._source.type + "/" + this.GameData._source.subtype;
      }

      entry.score = {};
      entry.score.score = this.GameData._source.score.score;
      entry.score.votes = this.GameData._source.score.votes;
      entry.coverimage = this.getCoverImage(this.GameData);

      return entry;
    },
  },
};
</script>
<style scoped>
a:hover,
a:link,
a:visited,
a.router-link-active,
a.router-link-exact-active {
  color: black;
  cursor: pointer;
  text-decoration: underline;
}
</style>
