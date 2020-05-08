<template>
  <v-container justify-start class="scroll-y ma-0 px-0 py-4" fluid>
    <v-container class="py-4" fluid style="max-width: 80%;" justify="start">
      <v-row>Enter the names of any two ZX Spectrum programmers to see how they are connected! </v-row>
      <v-row>
        <v-col cols="6" class="px-0">
          <v-autocomplete
            v-model="name1"
            :items="nameOptions1"
            :loading="loadingNames2"
            :search-input.sync="searchName1"
            hide-no-data
            item-text="text"
            item-value="text"
            label="Favorite ZX Spectrum programmer you like"
            prepend-icon="person"
            append-icon=""
            placeholder="Start typing to Search"
            clearable
            return-object
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            v-model="name2"
            :items="nameOptions2"
            :loading="loadingNames2"
            :search-input.sync="searchName2"
            hide-no-data
            item-text="text"
            item-value="text"
            label="Another ZX Spectrum programmer you like"
            prepend-icon="person"
            append-icon=""
            placeholder="Start typing to Search"
            clearable
            return-object
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="my-0">
        <v-checkbox v-model="includeall" class="my-0 mx-2" label="Include all types (not only games)"></v-checkbox>
        <v-checkbox v-model="includerereleases" class="my-0 mx-2" label="Include relation re-released"></v-checkbox>
        <v-checkbox v-model="includeallsteps" class="my-0 mx-2" label="Consider more than 6 steps"></v-checkbox></v-row
      ><v-row justify="space-around"
        ><v-btn :disabled="!(searchName1 && searchName2)" color="primary" @click="loadMore()">GO!</v-btn></v-row
      >
    </v-container>
    <div align="center" class="red--text font-weight-black" v-if="errormessage">
      {{ errormessage }}
    </div>
    <div align="center" class="red--text font-weight-black" v-if="!loading && steps && steps.length == 0">
      Ooops! you got me, didn't find a relation.
    </div>
    <!-- DISPLAY PATH -->
    <v-container v-if="steps && steps.length > 0" style="max-width: 800px;">
      <v-timeline :dense="this.$vuetify.breakpoint.xsOnly">
        <div v-for="(step, i) in steps" :key="i">
          <v-timeline-item v-if="step.relationtype" class="white--text mb-6" small>
            <template v-slot:icon>
              <span class="caption font-weight-bold">{{ step.level }}</span>
            </template>
            <v-text-field disabled hide-details flat :label="step.text + (step.item ? ': ' + step.item : '')" solo>
            </v-text-field>
          </v-timeline-item>
          <v-timeline-item :left="i % 4 == 0" v-if="step.type == 'Author' || step.type == 'Publisher'" color="green" fill-dot="">
            <v-card class="elevation-2">
              <v-card-subtitle>{{ step.name }}</v-card-subtitle>
            </v-card>
          </v-timeline-item>
          <v-timeline-item
            :left="i % 4 == 0"
            v-if="['Game', 'Compilation', 'Utility'].includes(step.type)"
            color="yellow"
            fill-dot=""
          >
            <v-card class="elevation-2">
              <v-card-subtitle>{{ step.title }}</v-card-subtitle>
            </v-card>
          </v-timeline-item>
          <v-timeline-item :left="i % 4 == 0" v-if="step.type == 'Inspiration'" color="cyan" fill-dot="">
            <v-card class="elevation-2">
              <v-card-subtitle>{{ step.name }}</v-card-subtitle>
            </v-card>
          </v-timeline-item>
        </div>
      </v-timeline>
    </v-container></v-container
  >
</template>
<script>
import axios from "axios";
// import debounce from "debounce";

//import GameCard from "@/components/GameCard";

export default {
  name: "GraphPage",
  data() {
    return {
      // FORM
      name1: { text: "William J. Wray", type: "AUTHOR" },
      searchName1: "",
      name2: { text: "Matthew Smith", type: "AUTHOR" },
      searchName2: "",
      nameOptions1: [{ text: "William J. Wray", type: "AUTHOR" }],
      nameOptions2: [{ text: "Matthew Smith", type: "AUTHOR" }],
      loadingNames1: false,
      loadingNames2: false,
      includeall: false,
      includerereleases: false,
      includeallsteps: false,
      errormessage: "",
      loading: true,
      steps: null,
    };
  },
  //components: { GameCard },

  methods: {
    lookUpNames: function(name) {
      this.errormessage = "";
      if (this.isDevelopment) console.log("CALLING ZXINFO API...()");

      return axios.get("https://api.zxinfo.dk/api/zxinfo/suggest/author/" + name, {
        timeout: 5000,
      });
    },
    loadMore: function() {
      if (this.isDevelopment) console.log("loadMore()");
      this.steps = [];
      this.loading = true;
      this.errormessage = "";

      if (!this.name1 || !this.name2) return;
      if (!(this.searchName1 && this.searchName2)) return;

      var p1 = JSON.parse(JSON.stringify(this.name1));
      var p2 = JSON.parse(JSON.stringify(this.name2));

      if (this.isDevelopment) console.log(p1.text + " = > " + p2.text);

      var include = "?";
      if (this.includeall) {
        include += "&includeall=1";
      }
      if (this.includerereleases) {
        include += "&includerereleases=1";
      }
      if (this.includeallsteps) {
        include += "&includeallsteps=1";
      }

      if (this.isDevelopment) console.log("CALLING ZXINFO API...()");
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/graph/path/" + p1.text + "/" + p2.text + include, {
          timeout: 5000,
        })
        .then((response) => {
          this.steps = response.data.result;
          this.loading = false;
          if (this.isDevelopment) console.log("...DONE!");
        })
        .catch((error) => {
          this.loading = false;
          this.errormessage = error.code + ": " + error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    isDevelopment() {
      return process.env.NODE_ENV == "development";
    },
  },
  watch: {
    searchName1(value) {
      if (!value) {
        return;
      }
      // Debounce the input and wait for a pause of at
      // least 200 milliseconds. This can be changed to
      // suit your needs.
      //debounce(this.makeSearch, 200)(value, this);
      this.lookUpNames(value)
        .then((response) => {
          this.nameOptions1 = response.data;
          this.loading = false;
          if (this.isDevelopment) console.log("...DONE!");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.nameOptions1 = [];
          this.errormessage = error.code + ": " + error.message;
        });
    },
    searchName2(value) {
      if (!value) {
        return;
      }
      // Debounce the input and wait for a pause of at
      // least 200 milliseconds. This can be changed to
      // suit your needs.
      //debounce(this.makeSearch, 200)(value, this);
      this.lookUpNames(value)
        .then((response) => {
          this.nameOptions2 = response.data;
          this.loading = false;
          if (this.isDevelopment) console.log("...DONE!");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.nameOptions2 = [];
          this.errormessage = error.code + ": " + error.message;
        });
    },
  },
  mounted() {
    if (this.$route.params.name1) this.nameOptions1[0].text = this.name1.text = this.searchName1 = this.$route.params.name1;
    if (this.$route.params.name2) this.nameOptions2[0].text = this.name2.text = this.searchName2 = this.$route.params.name2;
    if (this.$route.query.includeall == "1") this.includeall = true;
    if (this.$route.query.includerereleases == "1") this.includerereleases = true;
    if (this.$route.query.includeallsteps == "1") this.includeallsteps = true;
    if (this.$route.params.name1 && this.$route.params.name2) this.loadMore();
  },
};
</script>
<style scoped>
.v-timeline-item {
  display: flex;
  padding-bottom: 4px;
  margin-bottom: 4px !important;
}
</style>
