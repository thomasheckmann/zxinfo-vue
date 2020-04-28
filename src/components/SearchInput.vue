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
    rounded
    full-width
    hide-no-data
    item-text="text"
    item-value="text"
    :label="this.value"
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
export default {
  name: "SearchInput",
  props: ["value"],
  data() {
    return {
      searchterm: "",
      isLoading: false,
      items: [],
      model: "",
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

      // Lazily load input items
      fetch("https://api.zxinfo.dk/api/suggest/" + val)
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {},
};
</script>
