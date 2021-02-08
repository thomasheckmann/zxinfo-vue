<template>
  <v-card outlined>
    <router-link :to="'/details/' + entry.id">
      <!-- image -->
      <ImageContainer v-bind:entry="entry" v-bind:imagetype="imagetype"></ImageContainer>
    </router-link>
    <v-card-title class="d-inline-block text-truncate" style="max-width: 100%;"
      ><v-badge v-if="entry.availability == 'MIA'" color="pink" dot> {{ entry.title }} </v-badge>
      <span v-else>{{ entry.title }}</span></v-card-title
    >
    <v-card-subtitle class="pb-0 text-truncate" style="max-width: 100%;"
      ><router-link :to="{ path: '/search', query: { year: entry.yearofrelease } }">{{ entry.yearofrelease }}</router-link
      >&nbsp;
      <span v-for="(orgpub, i) in entry.originalPublisher" :key="i"
        ><router-link :to="{ path: '/publisher/' + encodeURIComponent(orgpub.name) }"
          >{{ orgpub.name }} {{ orgpub.country }}</router-link
        >
        <span v-if="i != Object.keys(entry.originalPublisher).length - 1">/ </span></span
      ></v-card-subtitle
    >
    <v-card-text class="text--primary">
      <div>
        <router-link :to="{ path: '/search', query: { machinetype: entry.machinetype } }">{{ entry.machinetype }}</router-link>
      </div>
      <div class="d-inline-block text-truncate" style="max-width: 100%;">
        <router-link :to="{ path: '/search', query: { genretype: entry.genretype } }">{{ entry.genre }}</router-link>
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
    <!--
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
    </v-card-actions>-->
  </v-card>
</template>
<script>
import imageHelper from "@/helpers/image-helper";
import entry from "@/helpers/entry-helper";
import ImageContainer from "@/components/Image";

export default {
  name: "GameCard",
  props: ["GameData", "imagetype"],
  methods: {
    getCoverImage: imageHelper.getCoverImage,
    getScreenUrl: imageHelper.getScreenUrl,
    entryData: entry.entryData,
    search() {
      if (this.searchterm) {
        this.$emit("input", this.searchterm);
      }
    },
  },
  components: { ImageContainer },
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
    entry() {
      return this.entryData(this.GameData);
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
