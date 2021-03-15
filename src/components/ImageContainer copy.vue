<template>
  <v-img :src="getScreenUrl(item.url)" class="white--text align-end" :lazy-src="getDefaultImageSrc" :aspect-ratio="1.33">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
      </v-row> </template
  ></v-img>
</template>
<script>
import imageHelper from "@/helpers/image-helper";
import axios from "axios";

export default {
  name: "ImageContainer",
  props: ["item"],
  data() {
    return {
      scrData: [],
      attrData: [],
    };
  },
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
  },
  methods: { getScreenUrl: imageHelper.getScreenUrl },
  mounted() {
    if (this.$isDevelopment) console.log("ImageContainer - mounted():");

    if (this.item.scrUrl) {
      if (this.$isDevelopment) console.log(`ImageContainer - .SCR found: ${this.item.scrUrl}`);
      // load .SCR file into scrdata;
      axios.get(`https://zxinfo.dk/media${this.item.scrUrl}`).then((response) => {
        this.scrData = response.data.slice(0, 6144);
        this.attrData = response.data.slice(6144, 6912);
      });
    }
  },
};
</script>
<style scoped></style>
