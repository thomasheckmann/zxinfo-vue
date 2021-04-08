<template>
  <v-img
    :src="imagetype == 'screen' ? entry.coverimage : entry.inlayimage"
    class="white--text align-end"
    :lazy-src="getDefaultImageSrc"
    :aspect-ratio="imagetype == 'screen' ? 1.33 : 1.33"
  >
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
  props: ["entry", "imagetype"],
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
  },
};
</script>
<style scoped></style>
