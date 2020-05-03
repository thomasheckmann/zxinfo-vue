<template>
  <v-container justify-start class="scroll-y pa-0">
    <v-list dense>
      <v-list-item class="pa-0" v-for="(card, index) in cards" :key="index">
        <v-list-item-content @click="$router.push({ path: '/details/' + entry(card).id })">
          <v-row justify="start" align="start" no-gutters>
            <v-col cols="2">
              <v-img
                :src="entry(card).coverimage"
                class="white--text align-end"
                lazy-src="https://zxinfo.dk/media/images/empty.png"
                aspect-ratio="1.33"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                  </v-row> </template
              ></v-img>
            </v-col>
            <v-col
              ><v-card class="pa-0 mx-1" tile flat
                ><v-list-item-title>{{ entry(card).title }}</v-list-item-title>
                <v-list-item-subtitle
                  ><span v-for="(orgpub, i) in entry(card).originalPublisher" :key="i"
                    >{{ orgpub.name }} {{ orgpub.country }}
                    <span v-if="i != Object.keys(entry(card).originalPublisher).length - 1">/ </span></span
                  ></v-list-item-subtitle
                ><v-list-item-subtitle>{{ entry(card).machinetype }} - {{ entry(card).type }}</v-list-item-subtitle></v-card
              ></v-col
            >
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination v-model="page" class="my-4" :length="numberOfPages" :total-visible="5"></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import imageHelper from "@/helpers/image-helper";

export default {
  name: "SearchResultGrid",
  data() {
    return {
      page: this.pageindex,
    };
  },
  watch: {
    page(p) {
      this.$emit("loadPage", p - 1);
    },
  },
  props: ["cards", "allResults", "getPageSize", "pageindex", "searchNumberOfResults"],
  computed: {
    numberOfPages() {
      return Math.floor(this.searchNumberOfResults / this.getPageSize) + 1;
    },
  },
  methods: {
    getCoverImage: imageHelper.getCoverImage,
    getScreenUrl: imageHelper.getScreenUrl,
    // cleaned version of JSON
    entry: function(GameData) {
      let entry = {};
      entry.screens = GameData._source.screens;
      entry.id = GameData._id;
      entry.title = GameData._source.fulltitle;

      if (GameData._source.yearofrelease === undefined) {
        entry.yearofrelease = "-";
      } else {
        entry.yearofrelease = GameData._source.yearofrelease;
      }

      if (GameData._source.machinetype === undefined) {
        entry.machinetype = "-";
      } else {
        entry.machinetype = GameData._source.machinetype;
      }

      entry.originalPublisher = [];
      for (var publisher in GameData._source.publisher) {
        var originalPublisher = GameData._source.publisher[publisher].name;
        var originalPublisherCountry = "";
        if (GameData._source.publisher[publisher].country !== undefined) {
          originalPublisherCountry = "(" + GameData._source.publisher[publisher].country + ")";
        }
        entry.originalPublisher.push({ name: originalPublisher, country: originalPublisherCountry });
      }

      entry.genretype = GameData._source.type;
      if (GameData._source.type === undefined) {
        entry.type = "-/-";
      } else {
        entry.type = GameData._source.type + "/" + GameData._source.subtype;
      }

      entry.score = {};
      entry.score.score = GameData._source.score.score;
      entry.score.votes = GameData._source.score.votes;
      entry.coverimage = this.getCoverImage(GameData);

      return entry;
    },
  },
  components: {},
};
</script>
