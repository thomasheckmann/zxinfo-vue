<template>
  <v-container v-if="!loading" class="py-2">
    <v-row
      v-for="(item, index) in items"
      :key="index"
      justify="start"
      align="start"
      :class="index % 2 !== 0 ? 'grey lighten-3' : 'grey lighten-5'"
      ><v-col cols="12"
        ><v-system-bar color="black white--text"
          >{{ item._id }} - <span class="font-weight-black">{{ item._source.fulltitle }}</span
          >&nbsp;({{ index }} / {{ items.length }})</v-system-bar
        ></v-col
      >
      <v-col v-for="(screen, i) in item._source.screens" :key="i" cols="3"
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
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
  },
  mounted() {
    axios
      .get(
        "https://api.zxinfo.dk/api/zxinfo/v2/search?mode=tiny&contenttype=SOFTWARE&size=2000&offset=0&machinetype=ZX81%2064K&machinetype=ZX81%2032K&machinetype=ZX81%202K&machinetype=ZX81%201K&machinetype=ZX81%2016K"
      )
      .then((response) => {
        var cards = response.data;
        // append to cards
        if (cards.hits.hits) {
          for (var ii = 0; ii < cards.hits.hits.length; ii++) {
            if (cards.hits.hits[ii]._source.screens.length > 1) {
              this.items.push(cards.hits.hits[ii]);
            }
          }
        }
        this.loading = false;
        if (this.isDevelopment) console.log("...DONE!");
        this.items.sort((a, b) => (a._id > b._id ? 1 : -1));
      })
      .catch((error) => {
        this.loading = false;
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
<style scoped></style>
