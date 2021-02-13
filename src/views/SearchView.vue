<template>
  <v-card flat class="mx-auto" max-width="100%">
    <v-container fluid>
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
      </v-row></v-container
    >
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
      v-bind:getPageSize="pagesize"
      v-bind:pageindex="pageindex"
      v-on:loadMore="loadMore"/>
    <SearchResultList
      v-if="listtype == 'list'"
      v-bind:imagetype="imagetype"
      v-bind:cards="cards"
      v-bind:allResults="allResults"
      v-bind:getPageSize="pagesize"
      v-bind:pageindex="pageindex"
      v-bind:searchNumberOfResults="searchNumberOfResults"
      v-on:loadPage="loadPage"
  /></v-card>
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
