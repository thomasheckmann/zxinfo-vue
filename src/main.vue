<template>
  <v-app id="inspire">
    <keep-alive>
      <navigationmenu v-model="drawer"></navigationmenu>
    </keep-alive>
    <!-- top app bar -->
    <v-app-bar app clipped-left dark color="black">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <router-link to="/"> <v-img src="@/assets/ZXInfo_25.png"></v-img> </router-link
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.xs && isDevelopment">XS</div>
      <div v-if="$vuetify.breakpoint.sm && isDevelopment">SM</div>
      <div v-if="$vuetify.breakpoint.md && isDevelopment">MD</div>
      <div v-if="$vuetify.breakpoint.lg && isDevelopment">LG</div>
      <div v-if="$vuetify.breakpoint.xl && isDevelopment">XL</div>
      <v-spacer />
      <v-icon>{{ getContenttypeIcon }}</v-icon>
    </v-app-bar>

    <v-content>
      <router-view @updateContenttype="updateContenttype" class="view"></router-view>
    </v-content>

    <v-footer app padless class="caption .font-weight-thin">
      <v-row justify="space-between" align="center" class="px-4">
        <span>&copy; 2020 info@zxinfo.dk</span>
        <span class="text-center"><a href="https://api.zxinfo.dk/">Public API</a></span
        ><span
          ><a href="https://github.com/thomasheckmann/zxinfo-vue">GitHub<v-icon small>mdi-share</v-icon></a></span
        >
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import navigationmenu from "@/components/NavigationMenu";
export default {
  name: "App",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      contenttype: "",
      drawer: false,
      loading: false,
      errormessage: "",
    };
  },
  methods: {
    updateContenttype(status) {
      this.contenttype = status;
    },
  },
  components: { navigationmenu },
  computed: {
    isDevelopment() {
      return process.env.NODE_ENV == "development";
    },
    getContenttypeIcon() {
      switch (this.contenttype) {
        case "SOFTWARE":
          return "games";
        case "HARDWARE":
          return "mdi-mouse";
        case "BOOK":
          return "book";
        case "PUBLISHER":
          return "mdi-bank";
        default:
          return "";
      }
    },
  },
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
  text-decoration: underline;
}
</style>
