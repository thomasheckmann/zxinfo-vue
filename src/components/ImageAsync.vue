<template>
  <v-img :src="src" class="white--text align-end" lazy-src="https://zxinfo.dk/media/images/empty.png" aspect-ratio="1.33">
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
      </v-row> </template
  ></v-img>
</template>
<script>
import axios from "axios";
import imageHelper from "@/helpers/image-helper";

export default {
  name: "ImageContainer",
  props: ["entry"],
  data() {
    return {
      // FORM
      loading: false,
      src: "",
    };
  },
  methods: {
    getCoverImage: imageHelper.getCoverImage,
    loadMore: function() {
      this.loading = true;
      if (this.isDevelopment) console.log("CALLING ZXINFO API...()");
      axios
        .get("https://api.zxinfo.dk/api/zxinfo/games/" + this.entry + "?mode=tiny", {
          timeout: 5000,
        })
        .then((response) => {
          var gamedata = response.data;
          var entry = {};
          entry.coverimage = this.getCoverImage(gamedata);
          this.src = entry.coverimage;
          this.loading = false;
          if (this.isDevelopment) console.log("...DONE!");
        })
        .catch((error) => {
          this.loading = false;
          this.src = "https://zxinfo.dk/media/images/empty.png";
          console.error(error);
        })
        .finally(() => {});
    },
  },
  mounted() {
    this.loadMore();
  },
};
</script>
<style scoped></style>
