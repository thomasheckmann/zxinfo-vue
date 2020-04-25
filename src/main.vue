<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left dark color="black">
      <v-app-bar-nav-icon />
      <v-toolbar-title>
        <router-link to="/"> <v-img src="@/assets/ZXInfo_25.png"></v-img> </router-link
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.xs">XS</div>
      <div v-if="$vuetify.breakpoint.sm">SM</div>
      <div v-if="$vuetify.breakpoint.md">MD</div>
      <div v-if="$vuetify.breakpoint.lg">LG</div>
      <div v-if="$vuetify.breakpoint.xl">XL</div>
    </v-app-bar>

    <v-content>
      <router-view class="view"></router-view>
    </v-content>

    <v-footer app padless class="caption .font-weight-thin">
      <v-row justify="space-between" align="center" class="px-4">
        <span>&copy; 2020 info@zxinfo.dk</span>
        <span class="text-center"><a href="https://api.zxinfo.dk/doc/">Public API</a></span
        ><span
          ><a href="https://github.com/thomasheckmann/zxinfo-vue">GitHub<v-icon small>mdi-share</v-icon></a></span
        >
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
<style scoped>
a:hover,
a:link,
a:visited,
a.router-link-active,
a.router-link-exact-active {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
</style>
