<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-subheader>Browse by</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><router-link to="/search/">All</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="account_circle" value="true">
          <template v-slot:activator>
            <v-list-item-title>Entry type</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><router-link to="/search?contenttype=SOFTWARE">Only software</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><router-link to="/search?contenttype=HARDWARE">Only hardware</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><router-link to="/search?contenttype=BOOK">Only books</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isDevelopment() {
      return process.env.NODE_ENV == "development";
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
  text-decoration: none;
}
</style>
