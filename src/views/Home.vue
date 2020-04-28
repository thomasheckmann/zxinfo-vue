<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <div>
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
                full-width
                hide-no-data
                hide-details
                hide-selected
                item-text="text"
                item-value="text"
                label="What is your favorite game or author?"
                solo
              >
                <template v-slot:item="{ item }"
                  ><v-icon v-if="item.type == 'SOFTWARE'" left>games</v-icon><v-icon v-if="item.type == 'BOOK'" left>book</v-icon
                  ><v-icon v-if="item.type == 'AUTHOR'" left>mdi-account</v-icon
                  ><v-icon v-if="item.type == 'HARDWARE'" left>mouse</v-icon> <span v-html="highlight(item.text)"></span
                ></template>
              </v-autocomplete>
              <p></p>
              <p class="text-center .caption .font-weight-thin	">ZXDB update 25.03.2020</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container></template
>
<script>
export default {
  name: "Home",
  data() {
    return {
      searchterm: "",
      isLoading: false,
      items: [],
      model: null,
    };
  },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchterm}` }, () => {});
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
          console.log(this.items.length);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
