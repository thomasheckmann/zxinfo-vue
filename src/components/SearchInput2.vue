<template>
  <v-combobox
    @change="searchSelected"
    v-model="completeSelected"
    :items="completeOptions"
    :loading="isLoading"
    :search-input.sync="searchTerm"
    hide-no-data
    no-filter
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
  </v-combobox>
</template>
<script>
import axios from "axios";

export default {
  props: ["value", "filter"],
  data() {
    return {
      completeSelected: null,
      searchTerm: "",
      completeOptions: [],
      isLoading: false,
      filterdrawer: null,
      errormessage: "",
    };
  },
  methods: {
    searchSelected() {
      var selected = JSON.parse(JSON.stringify(this.completeSelected));
      if (this.$isDevelopment) console.log("searchSelected() - signal value to parent: " + selected);
      this.$emit("input", this.completeSelected);
    },

    search() {
      if (this.$isDevelopment) console.log("search(): " + this.searchTerm);

      if (this.searchTerm) {
        if (this.$isDevelopment) console.log("search() - signal value to parent: " + this.searchTerm);
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
  watch: {
    value(v) {
      if (this.$isDevelopment) console.log("model() - got input from parent: " + v);
      if (!v) {
        return;
      }
      this.searchTerm = v;
      this.search();
    },
    /*

		returns an array of items for suggestions
		item = [{entry_id: <id>, text: <text to display>, type: <type, used to pick an icon>}]
	*/
    searchTerm(val) {
      if (this.$isDevelopment) console.log("searchTerm() - " + val);
      if (!val) {
        if (this.$isDevelopment) console.log("no value, doing nothing");
        return;
      }
      this.isLoading = true;
      this.errormessage = "";

      if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);
      axios
        .get(this.$api_base_url + "/suggest/" + val, { timeout: 1500 })
        .then((response) => {
          console.log(response.data);
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
