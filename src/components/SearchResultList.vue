<template>
  <v-container justify-start class="scroll-y pa-0">
    <v-list dense>
      <v-list-item class="pa-0" v-for="(card, index) in cards" :key="index">
        <v-list-item-content>
          <v-row justify="start" align="start" no-gutters>
            <v-col cols="2">
              <router-link :to="{ path: '/details/' + entry(card).id }">
                <ImageContainer v-bind:entry="entry(card)" v-bind:imagetype="imagetype"></ImageContainer>
              </router-link>
            </v-col>
            <v-col
              ><v-card class="pa-0 mx-1" tile flat
                ><v-list-item-title>{{ entry(card).title }}</v-list-item-title>
                <v-list-item-subtitle
                  ><span v-for="(orgpub, i) in entry(card).originalPublisher" :key="i"
                    ><router-link :to="{ path: '/publisher/' + orgpub.name }">{{ orgpub.name }} {{ orgpub.country }}</router-link>
                    <span v-if="i != Object.keys(entry(card).originalPublisher).length - 1">/ </span></span
                  ></v-list-item-subtitle
                ><v-list-item-subtitle style="white-space: normal;"
                  ><router-link :to="{ path: '/search', query: { machinetype: entry(card).machinetype } }">{{
                    entry(card).machinetype
                  }}</router-link>
                  -
                  <router-link :to="{ path: '/search', query: { type: entry(card).genretype } }">{{
                    entry(card).genre
                  }}</router-link></v-list-item-subtitle
                ></v-card
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
import ImageContainer from "@/components/Image";

export default {
  name: "SearchResultList",
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
  props: ["cards", "allResults", "getPageSize", "pageindex", "searchNumberOfResults", "imagetype"],
  computed: {
    numberOfPages() {
      return Math.floor(this.searchNumberOfResults / this.getPageSize) + 1;
    },
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
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
      entry.genre = "-/-";
      if (GameData._source.type && GameData._source.subtype) {
        entry.genre = GameData._source.type + "/" + GameData._source.subtype;
      } else if (GameData._source.type && !GameData._source.subtype) {
        entry.genre = GameData._source.type;
      }

      entry.score = {};
      entry.score.score = GameData._source.score.score;
      entry.score.votes = GameData._source.score.votes;
      entry.coverimage = this.getCoverImage(GameData);

      // look for inlay
      var inlays = [];
      for (var idx = 0; idx < GameData._source.additionals.length; idx++) {
        let item = GameData._source.additionals[idx];
        if (item.type === "Cassette inlay") {
          inlays.push(item);
        }
      }

      inlays.sort((a, b) => (a.url < b.url ? 1 : -1));
      entry.inlayimage = this.getDefaultImageSrc;
      if (inlays[0]) entry.inlayimage = this.getScreenUrl(inlays[0].url);
      if (this.$isDevelopment) console.log("inlay: " + entry.inlayimage);

      return entry;
    },
  },
  components: { ImageContainer },
};
</script>
