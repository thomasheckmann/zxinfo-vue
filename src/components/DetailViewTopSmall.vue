<template>
  <v-card-text class="pa-0">
    <v-row align="start">
      <v-col cols="12" class="pa-0" height="192">
        <v-card elevation="0" class="mx-auto" flat>
          <v-carousel :continuous="false" :show-arrows="true" height="100%" hide-delimiters>
            <v-carousel-item v-for="(item, i) in allscreens" :key="i" :src="getScreenUrl(item.url)" width="100%">
              <v-row class="fill-height" align="end" justify="center">
                <v-system-bar lights-out dark width="100%"
                  ><span class="white--text">{{ item.title }}</span></v-system-bar
                >
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-list-item two-line>
          <v-list-item-content class="pa-0">
            <v-list-item-title class="headline">{{ entry.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ entry.originalReleaseYear }}
              <span v-for="(orgpub, i) in entry.originalPublisher" :key="i"
                >{{ orgpub.name }} {{ orgpub.country }}
                <span v-if="i != Object.keys(entry.originalPublisher).length - 1">/ </span></span
              ></v-list-item-subtitle
            >
            {{ entry.machinetype }} - {{ entry.genre }}<br />
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
      </v-col>
    </v-row>
  </v-card-text>
</template>
<script>
import imageHelper from "@/helpers/image-helper";

export default {
  props: ["entry"],
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
  },
  components: {},
  computed: {
    // calculate page size, so each "page" are filled out based on breakpoint
    // TODO: recalculate on resize window.
    allscreens() {
      return this.entry.screens;
    },
  },
};
</script>
