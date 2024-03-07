<template>
  <v-img
    :src="imagetype == 'screen' ? entry.coverimage : entry.inlayimage"
    class="box white--text align-end"
    :lazy-src="getDefaultImageSrc"
    :aspect-ratio="imagetype == 'screen' ? 1.33 : 1.33"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
      </v-row> </template
  ><div v-if="entry.xrated" class="ribbon-wrapper">
    <div class="ribbon">X-RATED</div>
  </div></v-img>
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
<style scoped>
.ribbon-wrapper {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  left: -3px;}
  .ribbon {
    font: bold 15px sans-serif;
    color: #333;
    text-align: center;
    transform: rotate(-45deg);
    position: relative;
    padding: 7px 0;
    top: 15px;
    left: -30px;
    width: 120px;
    background-color: #91000084;
    color: #fff;
  }
</style>
