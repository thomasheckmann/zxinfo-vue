<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left dark color="black">
      <v-app-bar-nav-icon />
      <v-toolbar-title>ZXInfo v2</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.xs">XS</div>
      <div v-if="$vuetify.breakpoint.sm">SM</div>
      <div v-if="$vuetify.breakpoint.md">MD</div>
      <div v-if="$vuetify.breakpoint.lg">LG</div>
      <div v-if="$vuetify.breakpoint.xl">XL</div>
    </v-app-bar>

    <v-content>
      <GamesListCards />
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>
<script>
import GamesListCards from "@/components/GamesListCards";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    GamesListCards,
  },
};
</script>
