<template>
  <v-img
    :src="entry.coverimage"
    class="white--text align-end"
    lazy-src="https://zxinfo.dk/media/images/empty.png"
    aspect-ratio="1.33"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
      </v-row> </template
  ></v-img>
</template>
<script>
export default {
  name: "ImageContainer",
  props: ["entry"],
};
</script>
