<template>
  <v-container justify-start class="scroll-y pa-0">
    <v-row :align="'start'" :justify="'start'" dense>
      <v-col v-for="(card, index) in cards" :key="index" :xl="getXL" :lg="getLG" :md="getMD" :sm="getSM" :xs="getXS">
        <v-responsive :aspect-ratio="1 / 1">
          <GameCard
            v-bind:GameData="card"
            v-bind:imagetype="imagetype"
            :id="index / getPageSize == pageindex - 1 ? pageindex : ''"
          ></GameCard>
        </v-responsive>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn :disabled="allResults" @click="loadMore" color="black" :dark="!allResults">SHOW MORE</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GameCard from "@/components/GameCard";
export default {
  name: "SearchResultGrid",
  props: ["cards", "allResults", "getPageSize", "pageindex", "searchNumberOfResults", "imagetype"],
  computed: {
    getXL() {
      if (this.imagetype == "screen") {
        return 2;
      } else {
        return 4;
      }
    },
    getLG() {
      if (this.imagetype == "screen") {
        return 3;
      } else {
        return 4;
      }
    },
    getMD() {
      if (this.imagetype == "screen") {
        return 4;
      } else {
        return 6;
      }
    },
    getSM() {
      if (this.imagetype == "screen") {
        return 6;
      } else {
        return 6;
      }
    },
    getXS() {
      if (this.imagetype == "screen") {
        return 12;
      } else {
        return 12;
      }
    },
  },
  methods: {
    loadMore: function() {
      this.$emit("loadMore", true);
    },
  },
  components: { GameCard },
};
</script>
