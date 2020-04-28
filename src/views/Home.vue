<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <div>
              <v-text-field
                @keyup.enter="search"
                :prepend-inner-icon="'mdi-magnify'"
                @click:prepend-inner="search"
                v-model="searchterm"
                label="What is your favorite game or author?"
                autofocus
                rounded
                single-line
                full-width
                solo
                dense
                hide-details
                clearable
              ></v-text-field>
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
    };
  },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchterm}` }, () => {});
    },
  },
};
</script>
