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
                  <router-link :to="{ path: '/search', query: { genretype: entry(card).genretype } }">{{
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
import entry from "@/helpers/entry-helper";
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
      if (this.$isDevelopment) console.log(`SearchResultList.vue - ${this.searchNumberOfResults}, ${this.getPageSize}`);

      return Math.floor(parseInt(this.searchNumberOfResults, 10) / this.getPageSize);
    },
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
  },
  methods: {
    getCoverImage: imageHelper.getCoverImage,
    getScreenUrl: imageHelper.getScreenUrl,
    entry: entry.entryData,
  },
  components: { ImageContainer },
};
</script>
