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
      <span>&copy; 2020 ZXInfo - info@zxinfo.dk</span><v-spacer></v-spacer
      ><span><a href="https://api.zxinfo.dk/doc/">Public API</a></span
      ><v-spacer></v-spacer><span><a href="https://github.com/thomasheckmann/zxinfo-vue">Source code</a></span>
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
