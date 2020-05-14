<template>
  <v-card flat class="mx-auto" max-width="100%">
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
                  <v-checkbox color="primary" v-model="facets[key].selected" :value="subItem.key"></v-checkbox>
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
                <v-btn @click="searchFilters()" color="primary">FILTER</v-btn>
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
    <v-toolbar flat class="py-4">
      <v-combobox
        @change="showinfo"
        @keyup.enter="submitSearch"
        v-model="completeSelected"
        :items="completeOptions"
        :loading="isLoadingOptions"
        :search-input.sync="searchTerm"
        hide-no-data
        no-filter
        item-text="text"
        item-value="text"
        :label="labelText"
        :prepend-inner-icon="'mdi-magnify'"
        @click:prepend-inner="submitSearch"
        @click:append-outer="filterdrawer = !filterdrawer"
        :append-outer-icon="isEntrySearch ? 'mdi-filter-variant' : ''"
        clearable
        return-object
        dense
        :error="errormessage !== ''"
        :error-messages="errormessage"
        rounded
        full-width
        solo
      >
        <template v-slot:item="{ item }">
          <div v-if="isEntrySearch">
            <v-icon v-if="item.type == 'SOFTWARE'" left>games</v-icon><v-icon v-if="item.type == 'BOOK'" left>book</v-icon
            ><v-icon v-if="item.type == 'HARDWARE'" left>mouse</v-icon>
            <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Company')" left
              >mdi-bank</v-icon
            >
            <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Person')" left
              >mdi-account</v-icon
            >
            <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Nickname')" left
              >mdi-account-multiple</v-icon
            >
            <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype == ''" left
              >mdi-map-marker-question</v-icon
            >
            <span v-html="highlight(item.text)"></span>
          </div>
          <div v-if="isPublisherPage || isAuthorPage">
            <v-icon v-if="item.labeltype.startsWith('Company')" left>mdi-bank</v-icon
            ><v-icon v-if="item.labeltype.startsWith('Person')" left>mdi-account</v-icon
            ><v-icon v-if="item.labeltype.startsWith('Nickname')" left>mdi-account-multiple</v-icon
            ><v-icon v-if="item.labeltype == ''" left>mdi-map-marker-question</v-icon> <span v-html="highlight(item.text)"></span>
          </div>
        </template>
      </v-combobox>
    </v-toolbar>

    <!-- chip section for filters -->
    <v-row justify="start" align="center" class="px-2 py-1">
      <v-chip
        v-for="(item, id) in activeFacetsForChips"
        :key="id"
        small
        outlined
        label
        close
        class="ma-1"
        @click:close="uncheckFilter(item.group, item.value)"
      >
        <v-icon left small>{{ item.icon }}</v-icon> {{ item.value }}</v-chip
      >
      <v-chip v-if="queryparameters.groupname.value" small outlined label close @click:close="uncheckGroup()" color="green">
        <v-icon left small>mouse</v-icon> {{ queryparameters.groupname.value }}</v-chip
      >
      <v-chip
        v-if="queryparameters.contenttype.value"
        small
        outlined
        label
        close
        @click:close="uncheckContenttype()"
        color="green"
      >
        <v-icon left small>mouse</v-icon> {{ queryparameters.contenttype.value }}</v-chip
      >
    </v-row>
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
  </v-card>
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

// @ is an alias to /src
// import GamesListCards from "@/components/GamesListCards";

export default {
  name: "SearchView",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data: function() {
    return {
      completeSelected: null,
      completeOptions: [],
      isLoadingOptions: false,
      errormessage: "",
      searchTerm: "",
      queryparameters: {
        group: { name: "group", value: "" },
        groupname: { name: "groupname", value: "" },
        contenttype: { name: "contenttype", value: "" },
      },
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
      listtype: "grid",
      imagetype: "screen",
      fab: false,
      isLoading: false,
      searchTimeOf: 0,
      searchNumberOfResults: 0,
      allResults: false,
      pagesize: this.getPageSize,
      pageindex: 0,
      cards: [],
    };
  },
  watch: {
    // reload page when linking to new entry
    $route() {
      if (this.$isDevelopment) {
        console.log("WATCH route");
      }

      this.updateContenttypeIcon();
      this.resetSearchResult();
      this.loadMore();
    },
    searchTerm(val) {
      if (this.$isDevelopment) console.log("searchTerm() - " + val);
      if (!val) {
        if (this.$isDevelopment) console.log("no value, doing nothing");
        return;
      }
      this.isLoadingOptions = true;
      this.errormessage = "";

      if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);
      axios
        .get(this.$api_base_url + this.suggestEndpoint + val, { timeout: 1500 })
        .then((response) => {
          this.completeOptions = response.data;
          this.isLoadingOptions = false;
        })
        .catch((error) => {
          console.log(error);
          this.completeOptions = [];
          this.errormessage = error.code + ": " + error.message;
          this.isLoadingOptions = false;
        })
        .finally(() => (this.isLoadingOptions = false));
    },
  },
  methods: {
    updateContenttypeIcon() {
      if (this.$route.query.contenttype) {
        this.$emit("updateContenttype", this.$route.query.contenttype);
      } else if (this.isPublisherPage) {
        this.$emit("updateContenttype", "PUBLISHER");
      } else if (this.isAuthorPage) {
        this.$emit("updateContenttype", "AUTHOR");
      } else {
        this.$emit("updateContenttype", "");
      }
    },
    showinfo() {
      if (this.$isDevelopment) {
        console.log("showinfo()");
        console.log("showinfo() - completeSelected: " + this.completeSelected);
        console.log("showinfo() - searchTerm: " + this.searchTerm);
      }
      if (!this.searchTerm && !this.completeSelected) {
        if (this.$isDevelopment) console.log("Nothing to do - probaly just cleared");
        return;
      }
      var selected = this.completeSelected;
      var selectedText;
      if (selected === Object(selected)) {
        selectedText = JSON.parse(JSON.stringify(selected)).text;
      } else {
        selectedText = selected;
      }
      if (this.$isDevelopment) console.log("showinfo() - searchText: " + selectedText);
      this.searchTerm = selectedText;
      this.submitSearch();
    },
    submitSearch() {
      if (this.$isDevelopment) {
        console.log("submitSearch()");
        console.log("submitSearch() - completeSelected: " + this.completeSelected);
        console.log("submitSearch() - searchTerm: " + this.searchTerm);
      }

      this.replaceURL();
    },

    highlight(content) {
      if (!this.searchTerm) {
        return content;
      }
      return content.replace(new RegExp(this.searchTerm, "gi"), (match) => {
        return '<span class="font-weight-bold">' + match + "</span>";
      });
    },
    getParametersFromRequest() {
      // resetSearchResultialize parameters from request
      if (this.$isDevelopment) console.log("getParametersFromRequest()");
      if (this.$route.params.query) {
        this.completeSelected = this.searchTerm = this.$route.params.query;
      } else {
        this.completeOptions = [];
      }
      // this.searchTerm = this.$route.params.query ? this.$route.params.query : "";
      for (var qp in this.queryparameters) {
        var paramname = this.queryparameters[qp].name;
        var queryvalue = this.$route.query[paramname];
        if (paramname !== "query" && queryvalue) {
          this.queryparameters[paramname].value = queryvalue;
        }
      }

      for (var agg in this.facets) {
        this.facets[agg].selected = Array.isArray(this.$route.query[this.facets[agg].paramname])
          ? this.$route.query[this.facets[agg].paramname]
          : [this.$route.query[this.facets[agg].paramname]];
      }
    },

    toggleNavigation() {
      this.filterdrawer = !this.filterdrawer;
    },
    resetSearchResult() {
      if (this.$isDevelopment) console.log("resetSearchResult()");
      this.isLoading = false;
      this.searchTimeOf = 0;
      this.searchNumberOfResults = 0;
      this.allResults = false;
      this.pageindex = 0;
      this.cards = [];
      this.searchTerm = "";
    },
    replaceURL() {
      // build URL for current selection
      if (this.$isDevelopment) console.log("replaceURL()");
      const queryparam = this.searchTerm ? this.searchTerm : "";

      var filterquery = {};
      // Update URL query object with filter values for current selection
      for (var agg in this.facets) {
        var selected = [];
        for (var sel in this.facets[agg].selected) {
          if (this.facets[agg].selected[sel]) {
            selected.push(this.facets[agg].selected[sel]);
          }
        }
        filterquery[this.facets[agg].paramname] = selected;
      }

      // Update URL query object with filter values for current queryparameters
      for (var qp in this.queryparameters) {
        if (this.queryparameters[qp].value) {
          filterquery[this.queryparameters[qp].name] = this.queryparameters[qp].value;
        }
      }

      if (this.$isDevelopment) console.log(filterquery);
      // fire event to parent
      if (this.queryparameters.contenttype) {
        this.$emit("updateContenttype", this.queryparameters.contenttype.value);
      } else {
        this.$emit("updateContenttype", "");
      }
      var path;
      if (this.isEntrySearch) path = "search";
      if (this.isPublisherPage) path = "publisher";
      if (this.isAuthorPage) path = "author";
      this.$router.replace({ path: `/${path}/${queryparam}`, query: filterquery }, () => {});
    },

    /* NAVIGATION FILTERS */
    searchFilters() {
      if (this.$isDevelopment) {
        console.log("searchFilters()");
      }
      this.filterdrawer = false;
      this.replaceURL();
    },
    resetfilters() {
      if (this.$isDevelopment) console.log("resetfilters()");
      for (var agg in this.facets) {
        this.facets[agg].selected = [];
      }
      for (var qp in this.queryparameters) {
        this.queryparameters[qp].value = "";
      }

      this.filterdrawer = false;
      // this.searchText = "";
      this.$route.params.query = "";
      this.replaceURL();
    },
    uncheckFilter(group, value) {
      if (this.$isDevelopment) console.log("uncheck(): " + group + " = " + value);
      var idx = this.facets[group].selected.indexOf(value);
      if (idx > -1) {
        this.facets[group].selected.splice(idx, 1);
      }
      this.$route.query[group] = "";
      this.replaceURL();
    },
    uncheckGroup() {
      if (this.$isDevelopment) {
        console.log("uncheckGroup");
      }
      this.queryparameters.group = {};
      this.queryparameters.groupname = {};
      this.resetSearchResult();
      this.replaceURL();
    },
    uncheckContenttype() {
      this.queryparameters.contenttype = {};
      this.replaceURL();
    },
    loadPage(p) {
      this.resetSearchResult();
      this.pageindex = p;
      this.loadMore();
    },
    loadMore: function() {
      if (this.$isDevelopment) console.log("loadMore()");
      this.isLoading = true;
      this.allResults = true;
      this.errormessage = "";

      this.getParametersFromRequest();

      var cs = "";
      if (this.completeSelected) {
        cs = JSON.parse(JSON.stringify(this.completeSelected)).text;
      }
      if (this.$isDevelopment) {
        console.log("- completeSelected: " + cs + ", " + typeof cs);
        console.log("- searchTerm: " + this.searchTerm);
      }
      let searchText = "";
      if (typeof cs !== "undefined" && !this.searchTerm) {
        if (this.$isDevelopment) console.log("=> Using completeSelected (what is selected)");
        if (this.completeSelected) {
          searchText = JSON.parse(JSON.stringify(this.completeSelected)).text;
        }
      } else if (this.searchTerm && typeof cs === "undefined") {
        // entering URL /search/<text>
        if (this.$isDevelopment) console.log("=> Using searchTerm (what is typed in)");
        searchText = this.searchTerm;
      } else if (this.searchTerm === cs) {
        if (this.$isDevelopment) console.log("=> The same, use one");
        searchText = this.searchTerm;
      } else if (this.searchTerm !== cs) {
        if (this.$isDevelopment) console.log("=> Different - using searchTerm");
        searchText = this.searchTerm;
      } else {
        if (this.$isDevelopment) console.log("=> CONFUSED)");
      }

      var p = {
        query: searchText,
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

      for (var qp in this.queryparameters) {
        if (this.queryparameters[qp].value) {
          p[this.queryparameters[qp].name] = this.queryparameters[qp].value;
        }
      }

      if (this.$isDevelopment) console.log(buildQuery(p));
      if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);

      var dataURL;
      if (this.isEntrySearch) dataURL = this.$api_base_url + "/v2/search?" + buildQuery(p);
      if (this.isPublisherPage)
        dataURL = this.$api_base_url + "/publishers/" + this.$route.params.query + "/games?" + buildQuery(p);
      if (this.isAuthorPage) dataURL = this.$api_base_url + "/authors/" + this.$route.params.query + "/games?" + buildQuery(p);
      axios
        .get(dataURL, { timeout: 5000 })
        .then((response) => {
          var cards = response.data;

          // initialize options for filters
          if (this.isEntrySearch) {
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

    /* FAB scroll to yop */
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  computed: {
    isEntrySearch() {
      return this.$route.name == "EntrySearch";
    },
    isPublisherPage() {
      return this.$route.name == "PublisherPage";
    },
    isAuthorPage() {
      return this.$route.name == "AuthorPage";
    },
    suggestEndpoint() {
      if (this.isEntrySearch) return "/suggest/";
      else if (this.isPublisherPage) return "/suggest/publisher/";
      else if (this.isAuthorPage) return "/suggest/author/";
      else return "/suggest/";
    },
    labelText() {
      if (this.isEntrySearch) return "What is your favorite game, publisher or author?";
      else if (this.isPublisherPage) return "What is your favorite publisher?";
      else if (this.isAuthorPage) return "Who is your favorite coder?";
      else return "Type something to search for";
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
    if (this.$isDevelopment) console.log("mounted(): " + this.$route.params.query);
    if (this.$route.params.query) {
      this.completeSelected = this.searchTerm = this.$route.params.query;
    } else {
      this.completeOptions = [];
    }
    this.updateContenttypeIcon();
    this.loadMore();
  },
  components: {
    SearchResultGrid,
    SearchResultList,
  },
};
</script>
