<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <v-card-title>{{ searchText }}</v-card-title>
            <div>
              <SearchInput v-model="searchText" v-bind:initialText="starttext" />
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
import SearchInput from "@/components/SearchInput2";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      starttext: "",
      searchText: null,
    };
  },
  components: { SearchInput },
  methods: {
    search() {
      //this.$router.push({ path: `/search/${this.searchText}` }, () => {});
    },
  },
  watch: {
    searchText(v) {
      console.log("watch: " + v);
      if (v === Object(v)) {
        console.log("Got object: " + v.text);
        this.searchText = v.text;
      } else {
        console.log("plain value: " + v);
      }
      this.search();
    },
  },
  mounted() {
    // fire event to parent
    this.$emit("updateContenttype", "");
    console.log(this.$route.query.input);
    if (this.$route.query.input) this.starttext = this.$route.query.input;
  },
};
</script>
