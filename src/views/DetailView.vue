<template>
  <v-container class="pa-0" fluid>
    <v-img src="@/assets/zx-spectrum-bg.jpg" :height="bgHeight">
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="80%">
          <v-card class="pa-0">
            <v-app-bar absolute dark>
              <v-btn icon>
                <v-icon>mdi-share</v-icon>
              </v-btn>
              <v-toolbar-title v-if="isLoaded">{{ entry._source.fulltitle }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <GameCard v-if="isLoaded" v-bind:GameData="entry" class="pa-0"></GameCard>
          </v-card>
        </v-dialog>
      </v-row>
    </v-img>
  </v-container>
</template>
<script>
import GameCard from "@/components/GameCard";
import axios from "axios";

export default {
  name: "DetailView",
  data() {
    return {
      dialog: true,
      isLoaded: false,
      entry: Object,
    };
  },
  mounted() {
    this.isLoaded = false;
    axios
      .get("https://api.zxinfo.dk/api/zxinfo/games/" + this.$route.params.entryid + "?mode=full")
      .then((response) => {
        this.entry = response.data;
      })
      .catch((error) => {
        this.isLoaded = true;
        console.log(error);
      })
      .finally(() => {
        console.log("DONE");
        this.isLoaded = true;
      });
  },
  computed: {
    bgHeight() {
      return this.$vuetify.breakpoint.height - 147;
    },
  },
  components: {
    GameCard,
  },
};
</script>
