<template>
  <v-container class="py-2">
    <v-progress-linear v-if="loading" indeterminate color="blue darken-2"></v-progress-linear>
    <v-row
      v-for="(item, index) in items"
      :key="index"
      justify="start"
      align="start"
      :class="index % 2 !== 0 ? 'grey lighten-3' : 'grey lighten-5'"
      ><v-col cols="12"
        ><v-system-bar color="black white--text">
          <span class="font-weight-black d-inline-block text-truncate" style="white-space: normal;"
            >[{{ item._id }}] - {{ item._source.title }}
            <span v-if="item._source.publishers">/ {{ item._source.publishers[0].name }}</span>
            ({{ item._source.genre }})</span
          >
          <v-spacer></v-spacer><span class="overline">{{ index }}/{{ items.length }}</span></v-system-bar
        ></v-col
      >
      <v-col v-for="(screen, i) in getMaxNscreens(item._source.screens, 4)" :key="i" cols="3"
        ><v-card class="mx-auto" max-width="400" tile>
          <v-img class="white--text align-end" aspect-ratio="1.33" :src="getScreenUrl(screen.url)"></v-img></v-card
        ><v-card-subtitle>{{ screen.filename }}</v-card-subtitle></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import imageHelper from "@/helpers/image-helper";

export default {
  name: "Test",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  computed: {},
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
    getMaxNscreens: function(screens, n) {
      let res = [];
      for (var i = 0; i < screens.length && i < n; i++) {
        res.push(screens[i]);
      }
      return res;
    },
  },
  mounted() {
    if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);
    this.loading = true;
    /*
    this.interval = setInterval(() => {
      this.value = this.progress;
      console.log(this.value);
    }, 200);*/
    axios
      .get("https://api.zxinfo.dk/v3/search?sort=title_asc&mode=tiny&contenttype=SOFTWARE&size=2000&offset=0&machinetype=ZX81")
      .then((response) => {
        var cards = response.data;
        // append to cards
        if (cards.hits.hits) {
          for (var ii = 0; ii < cards.hits.hits.length; ii++) {
            this.progress = ii;
            if (cards.hits.hits[ii]._source.screens.length > 0) {
              this.items.push(cards.hits.hits[ii]);
            }
          }
        }
        this.loading = false;
        if (this.$isDevelopment) console.log("...DONE!");
        //this.items.sort((a, b) => (a._id > b._id ? 1 : -1));
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      })
      .finally(() => {});
  },
};
</script>
<style scoped></style>
