<template>
  <v-sheet tile>
    <v-row align="start">
      <v-col cols="6">
        <v-sheet tile>
          <v-carousel :continuous="false" :show-arrows="true" height="100%" hide-delimiters>
            <v-carousel-item v-for="(item, i) in entry.screens" :key="i" :src="getScreenUrl(item.url)">
              <v-row class="fill-height" align="end" justify="center">
                <v-system-bar v-if="item.title" lights-out dark width="100%"
                  ><span class="white--text">{{ item.title }}</span></v-system-bar
                >
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">{{ entry.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ entry.originalReleaseYear }}
              <span v-for="(orgpub, i) in entry.originalPublisher" :key="i"
                >{{ orgpub.name }} {{ orgpub.country }}
                <span v-if="i != Object.keys(entry.originalPublisher).length - 1">/ </span></span
              ></v-list-item-subtitle
            >
            <router-link :to="{ path: '/search', query: { machinetype: entry.machinetype } }">{{ entry.machinetype }}</router-link
            ><br /><router-link :to="{ path: '/search', query: { type: entry.genretype } }">{{ entry.genre }}</router-link
            ><br />
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
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
import imageHelper from "@/helpers/image-helper";

export default {
  props: ["entry"],
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
    getCoverImage: imageHelper.getCoverImage,
  },
  components: {},
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
