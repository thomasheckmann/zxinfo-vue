<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <div>
              <SearchInput v-model="searchText" />
              <p></p>
              <p class="text-center .caption .font-weight-thin	">ZXDB update 29.04.2020</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SearchInput from "@/components/SearchInput";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      searchText: "",
    };
  },
  components: { SearchInput },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchText}` }, () => {});
    },
  },
  watch: {
    searchText() {
      this.search();
    },
  },
  mounted() {
    // fire event to parent
    this.$emit("updateContenttype", "");
  },
};
</script>
