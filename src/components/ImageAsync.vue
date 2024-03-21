<template>
  <v-img :src="src" class="white--text align-end" :lazy-src="getDefaultImageSrc" aspect-ratio="1.33">
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
  name: "ImageContainerAsync",
  props: ["entry"],
  data() {
    return {
      isLoading: false,
      src: "",
    };
  },
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_SRC;
    },
  },
  methods: {
    loadMore: function() {
      this.isLoading = true;
      if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);
      axios
        .get(this.$api_base_url + "/entries/" + this.entry + "?mode=tiny", {
          timeout: 5000,
        })
        .then((response) => {
          var gamedata = response.data;
          var entry = {};
          entry.coverimage = imageHelper.getCoverImage(gamedata);
          this.src = entry.coverimage;
          this.isLoading = false;
          if (this.$isDevelopment) console.log("...DONE!");
        })
        .catch((error) => {
          this.isLoading = false;
          this.src = imageHelper.DEFAULT_SRC;
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.loadMore();
  },
};
</script>
