<template>
  <v-container justify-start class="scroll-y pa-3" fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-toolbar color="grey" flat dense>
          <v-spacer></v-spacer> <span>WHAT'S NEW - Total of {{cards.length}} new entries</span>
          <v-spacer></v-spacer>
          <v-progress-linear
            :active="isLoading"
            :indeterminate="isLoading"
            absolute
            bottom
          ></v-progress-linear
        ></v-toolbar>
        <v-system-bar v-if="errormessage" color="red">{{
          errormessage
        }}</v-system-bar></v-col
      > </v-row
    ><SearchResultGrid
      v-bind:imagetype="imagetype"
      v-bind:cards="cards"
      v-bind:allResults="allResults"
      v-bind:getPageSize="this.getPageSize"
      v-bind:pageindex="pageindex"
  /></v-container>
</template>
<script>
import axios from "axios";
import SearchResultGrid from "@/components/SearchResultGrid";
import newEntries from "@/news.json";

export default {
  name: "WhatIsNew",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      isLoading: true,
      searchTimeOf: 0,
      searchNumberOfResults: 0,
      allResults: true,
      pagesize: this.getPageSize,
      pageindex: 0,
      cards: [],
      imagetype: "screen",
      listtype: "grid",
      errormessage: "",
    };
  },
  components: {
    SearchResultGrid,
  },
  computed: {
    getPageSize() {
      return 999;
    },
  },
  methods: {
    loadentry(entryid) {
      var dataURL = this.$api_base_url + "/games/" + entryid + "?mode=compact";
      if (this.$isDevelopment)
        console.log(`NNN.vue - loadentry(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          this.cards.push(response.data);
        })
        .catch((error) => {
           // TODO: Handle NOT found better
          console.log(`New entry ${entryid} not found...`);

        })
        .finally(() => {});
    },
  },
  mounted() {
    this.isLoading = true;
    // iterate newEntries and populate this.cards
    newEntries.forEach((element) => {
      if (this.$isDevelopment)
        console.log(`NNN.vue - ${element.id} : ${element.title}`);
      this.loadentry(element.id);
    });
    this.isLoading = false;
  },
};
</script>
