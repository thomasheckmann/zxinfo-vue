<template>
  <v-combobox
    @change="searchSelected"
    @keyup.enter="search"
    v-model="completeSelected"
    :items="completeOptions"
    :loading="isLoading"
    :search-input.sync="searchTerm"
    hide-no-data
    no-filter
    item-text="text"
    item-value="text"
    label="What is your favorite game, publisher or author?"
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
    <template v-slot:item="{ item }">
      <v-icon v-if="item.type == 'SOFTWARE'" left>games</v-icon><v-icon v-if="item.type == 'BOOK'" left>book</v-icon
      ><v-icon v-if="item.type == 'HARDWARE'" left>mouse</v-icon>
      <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Company')" left>mdi-bank</v-icon>
      <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Person')" left>mdi-account</v-icon>
      <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype.startsWith('Nickname')" left
        >mdi-account-multiple</v-icon
      >
      <v-icon v-if="['AUTHOR', 'PUBLISHER'].includes(item.type) && item.labeltype == ''" left>mdi-map-marker-question</v-icon>
      <span v-html="highlight(item.text)"></span>
    </template>
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
      if (this.$isDevelopment) console.log("searchSelected(): " + this.completeSelected);

      var selected = this.completeSelected;
      if (!selected) return;

      if (selected === Object(selected)) {
        selected = JSON.parse(JSON.stringify(selected)).text;
      }
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
      if (this.$isDevelopment) console.log("SearchInput.vue - searchTerm() - " + val);
      if (!val) {
        if (this.$isDevelopment) console.log("SearchInput.vue - no value, doing nothing");
        return;
      }
      this.isLoading = true;
      this.errormessage = "";

      var endPointUrl = this.$api_base_url + "/suggest/" + encodeURIComponent(val);
      if (this.$isDevelopment) console.log(`Invoking API: ${endPointUrl}`);
      axios
        .get(endPointUrl, { timeout: 1500 })
        .then((response) => {
          this.completeOptions = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.completeOptions = [];
          this.isLoading = false;
          this.errormessage = error.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    if (this.$isDevelopment) console.log("SearchInput.vue - mounted(): " + this.value + ", " + this.initialText);
    if (this.value) {
      this.completeOptions[0].text = this.completeSelected.text = this.searchTerm = this.value;
    } else {
      this.completeOptions = [];
    }
  },
};
</script>
