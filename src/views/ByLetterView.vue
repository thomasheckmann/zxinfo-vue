<template>
  <v-card flat class="mx-auto" max-width="100%">
    <v-row align="start" justify="center">
      <v-sheet dark width="100%">
        <v-slide-group show-arrows>
          <v-slide-item v-for="n in getLetters" :key="n">
            <v-btn selected plain small text tile @click="byLetter(n)">{{ n }} </v-btn></v-slide-item
          >
        </v-slide-group>
      </v-sheet></v-row
    >
    <v-container class="fill-height pa-0">
      <v-toolbar color="grey" flat dense>
        <v-icon class="pr-1" @click="imagetype = 'screen'" :color="imagetype == 'screen' ? 'white' : ''"
          >mdi-monitor-screenshot</v-icon
        ><v-icon class="pr-1" @click="imagetype = 'inlay'" :color="imagetype == 'inlay' ? 'white' : ''"
          >mdi-book-open-outline</v-icon
        >
        <span v-if="!isLoading"> {{ searchNumberOfResults }} results ({{ searchTimeOf }}ms)</span>
        <span v-else>searching: {{ this.$route.params.query }}</span>
        <v-spacer /><v-icon @click="listtype = 'grid'" :color="listtype == 'grid' ? 'white' : ''">apps</v-icon
        ><v-icon @click="listtype = 'list'" :color="listtype == 'list' ? 'white' : ''">menu</v-icon
        ><v-progress-linear :active="isLoading" :indeterminate="isLoading" absolute bottom></v-progress-linear
      ></v-toolbar>
      <v-system-bar v-if="errormessage" color="red">{{ errormessage }}</v-system-bar>
      <SearchResultGrid
        v-bind:imagetype="imagetype"
        v-bind:cards="cards"
        v-bind:allResults="allResults"
        v-bind:getPageSize="this.getPageSize"
        v-bind:pageindex="pageindex"
        v-on:loadMore="loadMore"
      />
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
import SearchResultGrid from "@/components/SearchResultGrid";

export default {
  name: "ByLetterView",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      isLoading: false,
      searchTimeOf: 0,
      searchNumberOfResults: 0,
      allResults: true,
      pagesize: this.getPageSize,
      pageindex: 0,
      cards: [],
      letter: "",
      imagetype: "screen",
      listtype: "grid",
      errormessage: "",
    };
  },
  components: {
    SearchResultGrid,
  },
  computed: {
    getLetters: function() {
      var letters = ["#"];
      for (var i = 65; i < 91; i++) {
        letters.push(String.fromCharCode(i));
      }
      return letters;
    },
    getPageSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 20; // cols=12 (1 column),
        case "sm":
          return 20; // cols=6 (2 columns),
        case "md":
          return 21; // cols=3 (3 columns)
        case "lg":
          return 20; // cols=2 (4 columns)
        case "xl":
          return 24; // cols=2 (6 columns)
        default:
          return 20;
      }
    },
  },
  methods: {
    loadMore: function() {
      this.isLoading = true;
      this.letter = this.$route.params.letter.toLowerCase();
      var dataURL =
        this.$api_base_url + `/games/byletter/${this.letter}?mode=compact&size=${this.getPageSize}&offset=${this.pageindex}`;
      if (this.$isDevelopment) console.log(`ByLetterView.vue - loadMore(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL, { timeout: 500 })
        .then((response) => {
          var cards = response.data;
          // append to cards
          if (cards.hits.hits) {
            for (var ii = 0; ii < cards.hits.hits.length; ii++) {
              this.cards.push(cards.hits.hits[ii]);
            }

            // all shown?
            if (cards.hits.hits.length !== this.getPageSize || cards.hits.total == this.getPageSize) {
              this.allResults = true;
            } else {
              this.allResults = false;
            }
          }
          this.pageindex++;
          this.searchNumberOfResults = cards.hits.total.value;
          if (cards.hits.total.relation === "gte") this.searchNumberOfResults += "+";
          this.searchTimeOf = cards.took;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.allResults = true;
          this.errormessage = error.code + ": " + error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    byLetter(l) {
      if (this.$isDevelopment) console.log(`ByLetterView.vue - byLetter(): ${l}`);
      this.isLoading = false;
      this.searchTimeOf = 0;
      this.searchNumberOfResults = 0;
      this.allResults = false;
      this.pageindex = 0;
      this.cards = [];
      this.$router.replace({ path: `/letter/${l}` }, () => {});
      this.loadMore();
    },
  },
  mounted() {
    this.loadMore();
  },
};
</script>
