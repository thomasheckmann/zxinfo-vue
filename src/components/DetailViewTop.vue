<template>
  <v-container justify-start class="ma-0 pa-0" fluid>
    <v-row align="start">
      <v-col cols="6" class="ma-0 py-4 px-4">
        <v-carousel :continuous="false" :show-arrows="true" height="100%" hide-delimiters>
          <v-carousel-item v-for="(item, i) in entry.screens" :key="i"
            ><v-sheet height="100%" red>
              <ImageContainer class="pa-0" v-bind:item="item" v-bind:xrated="entry.xrated"></ImageContainer>
              <v-system-bar v-if="item.title" lights-out dark width="100%"
                ><v-spacer></v-spacer><span class="white--text">{{ item.title }}</span
                ><v-spacer></v-spacer
              ></v-system-bar>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="6">
        <v-card flat class="my-0"
          ><v-card-title class="py-0">{{ entry.title }}</v-card-title>
          <v-card-text>
            <v-list-item two-line class="px-0">
              <v-list-item-content>
                <v-list-item-subtitle
                  >{{ entry.originalYearOfRelease }}
                  <span v-for="(orgpub, i) in entry.originalPublishers" :key="i"
                    ><router-link :to="{ path: '/publisher/' + encodeURIComponent(orgpub.name) }">{{ orgpub.name }}</router-link
                    ><span v-if="orgpub.country"> ({{ orgpub.country }})</span>
                    <span v-if="i != Object.keys(entry.originalPublishers).length - 1">/ </span></span
                  ></v-list-item-subtitle
                >
                <router-link :to="{ path: '/search', query: { machinetype: entry.machineType } }">{{
                  entry.machineType
                }}</router-link
                ><br /><router-link :to="{ path: '/search', query: { genretype: entry.genreType } }">{{
                  entry.genre
                }}</router-link
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
            </v-list-item> </v-card-text
        ></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import imageHelper from "@/helpers/image-helper";
import ImageContainer from "@/components/ImageContainer";

export default {
  name: "DetailViewTop",
  props: ["entry"],
  methods: {
    getCoverImage: imageHelper.getCoverImage,
  },
  components: { ImageContainer },
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
