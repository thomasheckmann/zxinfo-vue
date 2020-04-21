<template>
  <v-dialog @input="closeHandler" :value="showdialog" scrollable :fullscreen="false" max-width="80%">
    <v-card class="pa-0">
      <v-app-bar absolute dark>
        <v-btn icon>
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <v-toolbar-title v-if="isLoaded">{{ entry._source.fulltitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeHandler()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <GameCard v-if="isLoaded" v-bind:GameData="entry" class="pa-0"></GameCard>
    </v-card>
  </v-dialog>
</template>
<script>
import GameCard from "@/components/GameCard";
import axios from "axios";

export default {
  name: "GameInfoDialog",
  data() {
    return {
      isLoaded: false,
      id: 0,
      entry: Object,
    };
  },
  props: ["show", "entryid"],
  watch: {
    entryid: function(val) {
      this.id = val;
      this.loadentry();
    },
  },
  methods: {
    closeHandler() {
      this.$emit("close");
    },
    loadentry() {
      this.isLoaded = false;
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/games/" + this.id + "?mode=full")
        .then((response) => {
          this.entry = response.data;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.isLoaded = false;
          console.log(error);
        })
        .finally(() => {});
    },
  },
  computed: {
    bgHeight() {
      return this.$vuetify.breakpoint.height - 147;
    },
    showdialog() {
      return this.show;
    },
  },
  components: {
    GameCard,
  },
};
</script>
