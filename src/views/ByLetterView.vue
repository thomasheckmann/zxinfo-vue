<template>
  <v-container justify-start class="scroll-y pa-3" fluid>
    <v-row align="start" justify="center">
      <v-sheet dark width="100%">
        <v-slide-group show-arrows>
          <v-slide-item v-for="n in getLetters" :key="n">
            <v-btn selected plain small text tile @click="byLetter(n)">{{ n }} </v-btn></v-slide-item
          >
        </v-slide-group>
      </v-sheet></v-row
    >
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-toolbar color="grey" flat dense>
          <span v-if="!isLoading"> {{ searchNumberOfResults }} results ({{ searchTimeOf }}ms)</span>
          <span v-else>searching: {{ this.$route.params.query }}</span>
          <v-spacer /><v-select
            :items="machineTypes"
            dense
            clearable
            hide-details
            single-line
            dark
            label="Machinetype"
            v-model="selectedMachine"
            @change="reloadPage"
          ></v-select
          ><v-progress-linear :active="isLoading" :indeterminate="isLoading" absolute bottom></v-progress-linear
        ></v-toolbar>
        <v-system-bar v-if="errormessage" color="red">{{ errormessage }}</v-system-bar></v-col
      > </v-row
    ><SearchResultGrid
      v-bind:imagetype="imagetype"
      v-bind:cards="cards"
      v-bind:allResults="allResults"
      v-bind:getPageSize="this.getPageSize"
      v-bind:pageindex="pageindex"
      v-on:loadMore="loadMore"
  /></v-container>
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
      machineTypes: ["ZXSPECTRUM", "ZX81", "PENTAGON"],
      selectedMachine: null,
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
      if (this.$route.query.machinetype) this.selectedMachine = this.$route.query.machinetype;
      var dataURL = `${this.$api_base_url}/entries/byletter/${encodeURIComponent(this.letter)}?mode=tiny&size=${this.getPageSize}&offset=${this.pageindex}`;
        if (this.selectedMachine) {
        dataURL = dataURL + `&machinetype=${encodeURIComponent(this.selectedMachine)}`;
      }
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
      this.errormessage = "";
      this.isLoading = false;
      this.searchTimeOf = 0;
      this.searchNumberOfResults = 0;
      this.allResults = false;
      this.pageindex = 0;
      this.cards = [];
      var query = {};
      if (this.selectedMachine) {
        query = { machinetype: this.selectedMachine };
      }
      this.$router.replace({ path: `/letter/${encodeURIComponent(l.toLowerCase())}`, query: query }, () => {});
      this.loadMore();
    },
    reloadPage() {
      if (this.$isDevelopment) console.log(`ByLetterView.vue - reloadPage()`);
      this.$router.replace(
        { path: `/letter/${encodeURIComponent(this.letter)}`, query: { machinetype: this.selectedMachine } },
        () => {}
      );
      this.byLetter(this.letter);
    },
  },
  mounted() {
    if (this.$isDevelopment) console.log(`mounted()`);
    var dataURL = this.$api_base_url + "/metadata";
    if (this.$isDevelopment) console.log(`ByLetterView.vue - created(): calling ZXInfo API ${dataURL}`);
    axios
      .get(dataURL, { timeout: 5000 })
      .then((response) => {
        for (var i = 0; i < response.data.machinetypes.values.length; i++) {
          this.machineTypes.push(response.data.machinetypes.values[i].value);
        }
      })
      .catch((error) => {
        this.errormessage = error.code + ": " + error.message;
      })
      .finally(() => {});
    this.loadMore();
  },
};
</script>
