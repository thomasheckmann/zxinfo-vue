<template>
  <v-card class="ma-0 pa-0">
    <v-app-bar color="grey" dense flat
      ><v-toolbar-title>ID: 0x{{ value.id.toString(16) }} - LoopEnd</v-toolbar-title> <v-spacer></v-spacer
    ></v-app-bar>
  </v-card>
</template>
<script>
export default {
  name: "LoopEndView",
  props: ["value"],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
};
</script>
