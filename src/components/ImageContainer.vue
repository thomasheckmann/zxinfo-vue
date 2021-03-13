<template>
  <v-img :src="src" class="white--text align-end" :lazy-src="getDefaultImageSrc" :aspect-ratio="1.33">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
      </v-row> </template
  ></v-img>
</template>
<script>
import imageHelper from "@/helpers/image-helper";

export default {
  name: "ImageContainer",
  props: ["src"],
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
  },
};
</script>
<style scoped></style>
