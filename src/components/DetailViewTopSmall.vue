<template>
  <v-sheet tile>
    <v-carousel :continuous="false" :show-arrows="true" height="100%" hide-delimiters>
      <v-carousel-item v-for="(item, i) in entry.screens" :key="i"
        ><v-sheet height="100%" red>
          <ImageContainer class="pa-0" v-bind:item="item"></ImageContainer>
          <v-system-bar v-if="item.title" lights-out dark width="100%"
            ><v-spacer></v-spacer><span class="white--text">{{ item.title }}</span
            ><v-spacer></v-spacer
          ></v-system-bar>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-list-item two-line>
      <v-list-item-content class="pa-0">
        <v-list-item-title class="headline">{{ entry.title }} </v-list-item-title>
        <v-list-item-subtitle
          >{{ entry.originalYearOfRelease }}
          <span v-for="(orgpub, i) in entry.originalPublishers" :key="i"
            ><router-link :to="{ path: '/publisher/' + encodeURIComponent(orgpub.name) }"
              >{{ orgpub.name }} {{ orgpub.country }}</router-link
            ><span v-if="orgpub.country"> ({{ orgpub.country }})</span>
            <span v-if="i != Object.keys(entry.originalPublishers).length - 1">/ </span></span
          ></v-list-item-subtitle
        >
        <router-link :to="{ path: '/search', query: { machinetype: entry.machineType } }">{{ entry.machineType }}</router-link
        ><br /><router-link :to="{ path: '/search', query: { genretype: entry.genretype } }">{{ entry.genre }}</router-link
        ><br />
        <v-rating
          class="text-center"
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
  </v-sheet>
</template>
<script>
import imageHelper from "@/helpers/image-helper";
import ImageContainer from "@/components/ImageContainer";

export default {
  name: "DetailViewTopSmall",
  props: ["entry"],
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
  },
  components: { ImageContainer },
  computed: {
    // calculate page size, so each "page" are filled out based on breakpoint
    // TODO: recalculate on resize window.
    allscreens() {
      return this.entry.screens;
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
