<template>
  <v-autocomplete
    @keyup.enter="search"
    :prepend-inner-icon="'mdi-magnify'"
    @click:prepend-inner="search"
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="searchterm"
    clearable
    dense
    :error="errormessage !== ''"
    :error-messages="errormessage"
    rounded
    full-width
    hide-no-data
    item-text="text"
    item-value="text"
    :label="this.value"
    solo
    :append-outer-icon="filter ? 'mdi-filter-variant' : ''"
    @click:append-outer="$emit('filter', (filterdrawer = !filterdrawer))"
  >
    <template v-slot:item="{ item }"
      ><v-icon v-if="item.type == 'SOFTWARE'" left>games</v-icon><v-icon v-if="item.type == 'BOOK'" left>book</v-icon
      ><v-icon v-if="item.type == 'AUTHOR'" left>mdi-account</v-icon><v-icon v-if="item.type == 'HARDWARE'" left>mouse</v-icon>
      <span v-html="highlight(item.text)"></span
    ></template>
  </v-autocomplete>
</template>
<script>
import axios from "axios";

export default {
  name: "SearchInput",
  props: ["value", "filter"],
  data() {
    return {
      searchterm: "",
      isLoading: false,
      items: [],
      model: "",
      filterdrawer: null,
      errormessage: "",
    };
  },
  methods: {
    search() {
      if (this.searchterm) {
        this.$emit("input", this.searchterm);
      }
    },
    highlight(content) {
      if (!this.searchterm) {
        return content;
      }
      return content.replace(new RegExp(this.searchterm, "gi"), (match) => {
        return '<span class="font-weight-bold">' + match + "</span>";
      });
    },
  },
  watch: {
    model(v) {
      this.searchterm = v;
      this.search();
    },
    searchterm(val) {
      if (!val) return;
      this.isLoading = true;
      this.items = [];
      this.errormessage = "";

      // Lazily load input items
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/suggest/" + val, { timeout: 1500 })
        .then((response) => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.allRitemsesults = [];
          this.errormessage = error.code + ": " + error.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {},
};
</script>
