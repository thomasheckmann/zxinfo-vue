<template>
  <v-container justify-start class="scroll-y pa-3" fluid>
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
import SearchResultGrid from "@/components/SearchResultGrid";
import SearchResultList from "@/components/SearchResultList";

export default {
  name: "SearchView",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  props: [
    "facets",
    "queryparameters",
    "searchNumberOfResults",
    "searchTimeOf",
    "cards",
    "allResults",
    "pagesize",
    "pageindex",
    "isLoading",
  ],
  data: function() {
    return { imagetype: "screen", listtype: "grid", errormessage: "" };
  },
  methods: {
    loadMore: function() {
      this.$emit("loadMore", true);
    },
    loadPage: function(v) {
      this.$emit("loadPage", v);
    },
    uncheckFilter(group, value) {
      if (this.$isDevelopment) console.log(`SearchVuew.vue - uncheckFilter(${group}, ${value})`);
      var idx = this.facets[group].selected.indexOf(value);
      if (idx > -1) {
        this.facets[group].selected.splice(idx, 1);
      }
      this.$route.query[group] = "";
      this.$emit("replaceURL", true);
    },
    uncheckGroup() {
      if (this.$isDevelopment) {
        console.log("uncheckGroup");
      }
      this.queryparameters.group = {};
      this.queryparameters.groupname = {};
      //this.resetSearchResult();
      this.$emit("replaceURL", true);
    },
    uncheckContenttype() {
      this.queryparameters.contenttype = {};
      this.$emit("replaceURL", true);
    },
  },
  computed: {
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
    SearchResultGrid,
    SearchResultList,
  },
};
</script>
