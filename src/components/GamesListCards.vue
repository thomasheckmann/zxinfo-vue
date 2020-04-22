<template>
  <v-container justify-start class="scroll-y">
    <!-- FAB button for scroll to top -->
    <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>

    <!-- Navigation drawer -->
    <v-navigation-drawer app temporary right v-model="filterdrawer" width="340">
      <template>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Filtering options</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="resetfilters">
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list dense>
            <v-list-group :prepend-icon="group.icon" no-action v-for="(group, key) in activeFacets" :key="key">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ group.title }} {{ group.items.length }} option(s)</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="subItem in group.items" :key="subItem.key">
                <v-list-item-action class="ma-0">
                  <v-checkbox color="primary" v-model="facets[key].selected[subItem.key]" :value="subItem.key"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content class="py-0 pl-4">
                  <v-list-item-title v-text="subItem.key"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-list-item-action-text v-text="subItem.doc_count"></v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
          <v-divider></v-divider>
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="4">
              <div class="my-2">
                <v-btn @click="submit" color="primary">FILTER</v-btn>
              </div>
            </v-col>
            <v-col class="text-center" cols="6">
              <div class="my-2">
                <v-btn @click="filterdrawer = !filterdrawer">CLOSE</v-btn>
              </div>
            </v-col>
          </v-row>
          <v-system-bar color="teal" window dark></v-system-bar>
        </v-card>
      </template>
    </v-navigation-drawer>

    <!-- search bar -->
    <v-toolbar flat>
      <v-text-field
        v-model="searchterm"
        label="What is your favorite game or author?"
        single-line
        full-width
        hide-details
        clearable
        :append-icon="'mdi-magnify'"
        @click:append="submit"
        :append-outer-icon="'mdi-filter-variant'"
        @click:append-outer="filterdrawer = !filterdrawer"
        @keyup.enter="submit"
        @keypress.enter.native.prevent=""
      ></v-text-field>
    </v-toolbar>

    <!-- chip section for filters -->
    <v-row justify="start" align="center">
      <v-chip
        v-for="(item, id) in activeFacetsForChips"
        :key="id"
        c
        small
        outlined
        label
        close
        @click:close="uncheck(item.group, item.value)"
      >
        <v-icon left small>{{ item.icon }}</v-icon> {{ item.value }}</v-chip
      >
    </v-row>

    <v-system-bar v-if="!loading">{{ searchNumberOfResults }} results ({{ searchTimeOf }}ms)</v-system-bar>
    <v-row :align="'start'" :justify="'start'" dense>
      <v-col v-for="(card, index) in cards" :key="index" :xl="2" :lg="2" :md="3" :sm="6" :xs="12">
        <v-responsive :aspect-ratio="1 / 1">
          <router-link :to="'/details/' + card._id">
            <GameCard v-bind:GameData="card" :id="index / getPageSize == pageindex - 1 ? pageindex : ''" />
          </router-link>
        </v-responsive>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn :disabled="allResults" @click="loadMore" color="black" :dark="!allResults">SHOW MORE</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GameCard from "@/components/GameCard";
import axios from "axios";

var dataURL = "https://api.zxinfo.dk/api/zxinfo/v2/search?";

export default {
  name: "EntrySearch",
  data() {
    return {
      dialog: false,
      dialogEntryID: 0,
      facets: {
        // key = name in agg output, paramname = parameter name for search
        machinetypes: { icon: "mdi-desktop-classic", title: "Machine type", items: [], selected: [], paramname: "machinetype" },
        type: { icon: "mdi-drama-masks", title: "Genre type", items: [], selected: [], paramname: "type" },
        year: { icon: "mdi-timetable", title: "Year", items: [], selected: [], paramname: "year" },
        // TODO: Should be handled seperate, as it contains: controls.controls. FIX in es-service
        controls: { icon: "mdi-controller-classic", title: "Controls", items: [], selected: [], paramname: "control" },
        multiplayertype: {
          icon: "mdi-account-multiple",
          title: "Multiplayer type",
          items: [],
          selected: [],
          paramname: "multiplayertype",
        },
        multiplayermode: {
          icon: "mdi-account-multiple-check",
          title: "Multiplayer mode",
          items: [],
          selected: [],
          paramname: "multiplayermode",
        },
        originalpublication: {
          icon: "mdi-rocket",
          title: "Original publication",
          items: [],
          selected: [],
          paramname: "originalpublication",
        },
        language: { icon: "mdi-message", title: "Language", items: [], selected: [], paramname: "language" },
        availability: { icon: "mdi-check-circle", title: "Availability", items: [], selected: [], paramname: "availability" },
      },
      filterdrawer: null,
      fab: false,
      loading: true,
      searchterm: "",
      searchTimeOf: 0,
      searchNumberOfResults: 0,
      allResults: false,
      pagesize: this.getPageSize,
      pageindex: 0,
      cards: [],
    };
  },
  methods: {
    init() {
      this.loading = false;
      this.searchTimeOf = 0;
      this.searchNumberOfResults = 0;
      this.allResults = false;
      this.pageindex = 0;
      this.cards = [];
    },
    submit() {
      this.filterdrawer = false;
      this.init();
      this.loadMore();
    },
    loadMore: function() {
      var p = {
        query: this.searchterm,
        mode: "full",
        size: this.getPageSize,
        offset: this.pageindex,
      };

      // add filters
      for (var agg in this.facets) {
        var selected = [];
        for (var sel in this.facets[agg].selected) {
          if (this.facets[agg].selected[sel]) {
            selected.push(this.facets[agg].selected[sel]);
          }
        }
        p[this.facets[agg].paramname] = selected;
      }
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

      // console.log("Q: " + buildQuery(p));
      this.loading = true;
      this.allResults = true;
      axios
        .get(dataURL + buildQuery(p))
        .then((response) => {
          var cards = response.data;

          // initialize options for filters

          for (var agg in this.facets) {
            this.facets[agg].items = [];
            if (agg === "controls") {
              // temp fix...
              for (var ic = 0; ic < cards.aggregations.all_entries[agg].controls["filtered_" + agg].buckets.length; ic++) {
                this.facets[agg].items.push(cards.aggregations.all_entries[agg].controls["filtered_" + agg].buckets[ic]);
              }
            } else {
              for (var i = 0; i < cards.aggregations.all_entries[agg]["filtered_" + agg].buckets.length; i++) {
                this.facets[agg].items.push(cards.aggregations.all_entries[agg]["filtered_" + agg].buckets[i]);
              }
            }
          }

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
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.allResults = true;
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    uncheck(group, value) {
      this.facets[group].selected[value] = null;
      this.submit();
    },
    resetfilters() {
      for (var agg in this.facets) {
        this.facets[agg].selected = [];
      }
      this.submit();
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  mounted() {
    this.loadMore();
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
    // Only return non-empty facets
    activeFacets: function() {
      var active = {};
      for (var agg in this.facets) {
        if (this.facets[agg].items.length) {
          active[agg] = this.facets[agg];
        }
      }
      return active;
    },
    activeFacetsForChips: function() {
      var active = [];
      for (var group in this.facets) {
        for (var item in this.facets[group].selected) {
          if (this.facets[group].selected[item]) {
            active.push({ icon: this.facets[group].icon, group: group, value: this.facets[group].selected[item] });
          }
        }
      }
      return active;
    },
  },
  components: {
    GameCard,
  },
};
</script>
