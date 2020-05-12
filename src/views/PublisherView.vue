<template>
  <v-container justify-start class="scroll-y ma-0 px-0 py-4" fluid>
    <!-- FAB button for scroll to top -->
    <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>

    <v-toolbar color="grey" flat dense
      ><v-icon class="pr-1" @click="imagetype = 'screen'" :color="imagetype == 'screen' ? 'white' : ''"
        >mdi-monitor-screenshot</v-icon
      ><v-icon @click="imagetype = 'inlay'" :color="imagetype == 'inlay' ? 'white' : ''">mdi-book-open-outline</v-icon>
      <span v-if="!isLoading"> {{ searchNumberOfResults }} results ({{ searchTimeOf }}ms)</span>
      <span v-else>searching: {{ this.$route.params.name }}</span>
      <v-spacer /><v-icon @click="listtype = 'grid'" :color="listtype == 'grid' ? 'white' : ''">apps</v-icon
      ><v-icon @click="listtype = 'list'" :color="listtype == 'list' ? 'white' : ''">menu</v-icon
      ><v-progress-linear :active="isLoading" :indeterminate="isLoading" absolute bottom></v-progress-linear
    ></v-toolbar>
    <v-system-bar dark window v-if="this.$route.params.name"
      ><span
        ><kbd style="white-space: normal;" class="wrap-text">{{ this.$route.params.name }}</kbd></span
      ></v-system-bar
    >
    <v-system-bar v-if="errormessage" color="red">{{ errormessage }}</v-system-bar>

    <!-- SEARCH RESULT -->
    <SearchResultGrid
      v-if="listtype == 'grid'"
      v-bind:imagetype="imagetype"
      v-bind:cards="cards"
      v-bind:allResults="allResults"
      v-bind:getPageSize="getPageSize"
      v-bind:pageindex="pageindex"
      v-on:loadMore="loadMore"
    />
    <SearchResultList
      v-if="listtype == 'list'"
      v-bind:imagetype="imagetype"
      v-bind:cards="cards"
      v-bind:allResults="allResults"
      v-bind:getPageSize="getPageSize"
      v-bind:pageindex="pageindex"
      v-bind:searchNumberOfResults="searchNumberOfResults"
      v-on:loadPage="loadPage"
    />
    <!-- SEARCH RESULT -->
  </v-container>
</template>
<script>
import SearchResultGrid from "@/components/SearchResultGrid";
import SearchResultList from "@/components/SearchResultList";
import axios from "axios";

// QUeryBuilder Helper
var buildQuery = function(data) {
  // If the data is already a string, return it as-is
  if (typeof data === "string") return data;

  // Create a query array to hold the key/value pairs
  var query = [];

  // Loop through the data object
  for (var key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      // Encode each key and value, concatenate them into a string, and push them to the array

      if (typeof data[key] === "object") {
        let subitems = data[key];
        for (var items in subitems) {
          query.push(encodeURIComponent(key) + "=" + encodeURIComponent(subitems[items]));
        }
      } else {
        query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
      }
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join("&");
};

export default {
  name: "PublisherView",
  metaInfo() {
    return {
      title: this.$route.params.name,
      titleTemplate: "%s | ZXInfo",
    };
  },
  data() {
    return {
      errormessage: "",
      listtype: "grid",
      imagetype: "screen",
      fab: false,
      isLoading: true,
      searchTimeOf: 0,
      searchNumberOfResults: 0,
      allResults: true,
      pageindex: 0,
      cards: [],
    };
  },
  components: { SearchResultGrid, SearchResultList },
  methods: {
    resetSearchResult() {
      if (this.$isDevelopment) console.log("resetSearchResult()");
      this.isLoading = false;
      this.searchTimeOf = 0;
      this.searchNumberOfResults = 0;
      this.allResults = false;
      this.pageindex = 0;
      this.cards = [];
    },
    loadPage(p) {
      this.resetSearchResult();
      this.pageindex = p;
      this.loadMore();
    },
    loadMore: function() {
      if (this.$isDevelopment) console.log("loadMore()");

      // Get games for requested publisher
      this.isLoading = true;
      this.allResults = true;
      this.errormessage = "";
      var p = {
        mode: "full",
        size: this.getPageSize,
        offset: this.pageindex,
      };
      if (this.$isDevelopment) console.log(buildQuery(p));
      if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);

      axios
        .get(this.$api_base_url + "/publishers/" + this.$route.params.name + "/games?" + buildQuery(p), { timeout: 5000 })
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
          this.searchNumberOfResults = cards.hits.total;
          this.searchTimeOf = cards.took;
          this.isLoading = false;
          if (this.$isDevelopment) console.log("...DONE!");
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
    /* FAB scroll to top */
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  watch: {
    $route() {
      if (this.$isDevelopment) {
        console.log("WATCH route");
      }
      this.resetSearchResult();
      this.loadMore();
    },
  },
  computed: {
    // calculate page size, so each "page" are filled out based on breakpoint
    // TODO: recalculate on resize window.
    getPageSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 16; // cols=12 (1 column),
        case "sm":
          return 16; // cols=6 (2 columns),
        case "md":
          return 16; // cols=3 (4 columns)
        case "lg":
          return 18; // cols=2 (6 columns)
        case "xl":
          return 18; // cols=2 (6 columns)
        default:
          return 20;
      }
    },
  },
  mounted() {
    // fire event to parent
    if (this.$isDevelopment) {
      console.log("mounted()");
      console.log("looking for publisher: " + this.$route.params.name);
    }
    this.$emit("updateContenttype", "PUBLISHER");
    this.loadMore();
  },
};
</script>
