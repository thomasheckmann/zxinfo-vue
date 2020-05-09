<template>
  <v-autocomplete
    @keyup.enter="search"
    v-model="completeSelected"
    :items="completeOptions"
    :loading="isLoading"
    :search-input.sync="searchTerm"
    hide-no-data
    item-text="text"
    item-value="text"
    label="What is your favorite game?"
    :prepend-inner-icon="'mdi-magnify'"
    @click:prepend-inner="search"
    @click:append-outer="$emit('filter', (filterdrawer = !filterdrawer))"
    :append-outer-icon="filter ? 'mdi-filter-variant' : ''"
    clearable
    dense
    :error="errormessage !== ''"
    :error-messages="errormessage"
    rounded
    full-width
    solo
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
  props: ["value", "filter"],
  data() {
    return {
      completeSelected: [{ text: "", type: "" }],
      searchTerm: "",
      completeOptions: [{ text: "", type: "" }],
      isLoading: false,
      filterdrawer: null,
      errormessage: "",
    };
  },
  methods: {
    search() {
      if (this.isDevelopment) console.log("search(): " + this.searchTerm);

      if (this.searchTerm) {
        if (this.isDevelopment) console.log("search() - signal value to parent: " + this.searchTerm);
        this.$emit("input", this.searchTerm);
      }
    },
    highlight(content) {
      if (!this.searchTerm) {
        return content;
      }
      return content.replace(new RegExp(this.searchTerm, "gi"), (match) => {
        return '<span class="font-weight-bold">' + match + "</span>";
      });
    },
  },
  computed: {
    isDevelopment() {
      return process.env.NODE_ENV == "development";
    },
  },
  watch: {
    value(v) {
      if (this.isDevelopment) console.log("model() - got input from parent: " + v);
      if (!v) {
        return;
      }
      this.searchTerm = v;
      this.search();
    },
    searchTerm(val) {
      if (this.isDevelopment) console.log("searchTerm() - " + val);
      if (!val) {
        if (this.isDevelopment) console.log("no value, doing nothing");
        return;
      }
      this.isLoading = true;
      this.errormessage = "";

      // Lazily load input items
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/suggest/" + val, { timeout: 1500 })
        .then((response) => {
          this.completeOptions = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.completeOptions = [];
          this.isLoading = false;
          this.errormessage = error.code + ": " + error.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    console.log("mounted(): " + this.value + ", " + this.initialText);
    if (this.value) {
      this.completeOptions[0].text = this.completeSelected.text = this.searchTerm = this.value;
    } else {
      this.completeOptions = [];
    }
  },
};
</script>
