<template>
  <v-container justify-start class="scroll-y ma-0 px-0 py-4" fluid>
    <v-container class="py-4" fluid style="max-width: 80%;">
      <v-row>Enter the names of any two ZX Spectrum programmers to see how they are connected! </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="name1" label="Favorite ZX Spectrum programmer you like" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="name2" label="Another ZX Spectrum programmer you like" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-checkbox v-model="optAllEntries" class="mx-2" label="Include all types (not only games)"></v-checkbox>
        <v-checkbox v-model="optIncludeRereleased" class="mx-2" label="Include relation re-released"></v-checkbox>
        <v-checkbox v-model="optIncludeAllSteps" class="mx-2" label="Consider more than 6 steps"></v-checkbox></v-row
      ><v-row justify="space-around"><v-btn small color="primary" @click="loadMore()">GO!</v-btn></v-row>
    </v-container>
    <!-- DISPLAY PATH -->
    <v-container style="max-width: 800px;">
      <v-timeline>
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
          <v-timeline-item :left="i % 4 == 0" v-if="step.type == 'Game'" color="yellow" fill-dot="">
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
//import GameCard from "@/components/GameCard";

export default {
  name: "GraphPage",
  data() {
    return {
      // FORM
      name1: "William J. Wray",
      name2: "Matthew Smith",
      optAllEntries: false,
      optIncludeRereleased: false,
      optIncludeAllSteps: false,
      errormessage: "",
      loading: true,
      steps: [],
      cards: [],
    };
  },
  //components: { GameCard },

  methods: {
    details: function(id) {
      console.log(id);
      return axios
        .get("https://api.zxinfo.dk/api/zxinfo/games/" + id, {
          timeout: 5000,
        })
        .then((response) => {
          if (this.isDevelopment) console.log("...DONE!");
          let entry = response.data;
          return entry;
        })
        .catch((error) => {
          this.errormessage = error.code + ": " + error.message;
        });
    },
    loadMore: function() {
      if (this.isDevelopment) console.log("load more");

      var include = "?";
      if (this.optAllEntries) {
        include += "&includeall=1";
      }
      if (this.optIncludeRereleased) {
        include += "&includerereleases=1";
      }
      if (this.optIncludeAllSteps) {
        include += "&includeallsteps=1";
      }

      axios
        .get("https://api.zxinfo.dk/api/graph/path/" + this.name1 + "/" + this.name2 + include, {
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
  mounted() {
    if (this.$route.params.name1) this.name1 = this.$route.params.name1;
    if (this.$route.params.name2) this.name2 = this.$route.params.name2;
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
