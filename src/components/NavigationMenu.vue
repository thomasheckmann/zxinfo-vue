<template>
  <v-navigation-drawer v-model="navdrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          Browse by
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title><a class="plain" href="/search/">All</a></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group v-model="entrytypes.active" v-if="!isLoading" nav>
        <template v-slot:activator>
          <v-list-item-title>Entry type</v-list-item-title>
        </template>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><a class="plain" href="/search?contenttype=SOFTWARE">Software</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><a class="plain" href="/search?contenttype=HARDWARE">Hardware</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><a class="plain" href="/search?contenttype=BOOK">Books</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><a class="plain" href="/search/?machinetype=ZXSPECTRUM">ZX Spectrum</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><a class="plain" href="/search/?machinetype=ZX81">ZX81</a></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- MACHINE TYPES -->
      <v-list-group v-model="machinetypes.active" v-if="!isLoading">
        <template v-slot:activator>
          <v-list-item-title>Machine type</v-list-item-title>
        </template>
        <v-list-item v-for="(mt, i) in metadata.machinetypes.values" :key="i">
          <v-list-item-content>
            <v-list-item-title
              ><a class="plain" :href="'/search?' + metadata.machinetypes.parameter + '=' + encodeURIComponent(mt.value)">{{
                mt.value
              }}</a></v-list-item-title
            >
          </v-list-item-content>
          <span class="text-right caption">{{ mt.doc_count }}</span>
        </v-list-item>
      </v-list-group>
      <!-- MACHINE TYPES -->
      <!-- ENTRY GENRES -->
      <v-list-group v-model="genretypes.active" v-if="!isLoading">
        <template v-slot:activator>
          <v-list-item-title>Genre type</v-list-item-title>
        </template>
        <v-list-item v-for="(gt, i) in metadata.genretypes.values" :key="i">
          <v-list-item-content>
            <v-list-item-title
              ><a class="plain" :href="'/search?genretype=' + encodeURIComponent(gt.value)">{{ gt.value }}</a></v-list-item-title
            >
          </v-list-item-content>
          <span class="text-right caption">{{ gt.doc_count }}</span>
        </v-list-item>
      </v-list-group>
      <!-- ENTRY GENRES -->
      <!-- FEATURES -->
      <v-list-group v-model="features.active" v-if="!isLoading">
        <template v-slot:activator>
          <v-list-item-title>Features</v-list-item-title>
        </template>
        <v-list-item v-for="(ft, i) in metadata.features.values" :key="i">
          <v-list-item-content>
            <v-list-item-title
              ><a
                class="plain"
                :href="
                  '/search?group=' +
                    encodeURIComponent(metadata.features.group) +
                    '&groupname=' +
                    encodeURIComponent(ft.groupname)
                "
                >{{ ft.groupname }}</a
              ></v-list-item-title
            >
          </v-list-item-content>
          <span class="text-right caption">{{ ft.doc_count }}</span>
        </v-list-item>
      </v-list-group>
      <!-- FEATURES -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/search/?availability=MIA">MIA</router-link></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/search/?xrated=1">X-Rated</router-link></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/magazines">Magazine Info</router-link></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle
            ><router-link class="plain" to="/animated">Animated Loading Screens</router-link></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/scr">ZX81 Screen Converter</router-link></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item disabled>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/graph">Six degrees (soon)</router-link></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Credits</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import axios from "axios";

export default {
  name: "NavigationMenu",
  props: ["value"],
  watch: {
    value(v) {
      // change in v-model from parent
      this.navdrawer = v;
    },
    navdrawer(v) {
      // notify parent of change
      this.navdrawer = v;
      this.$emit("input", v);
    },
  },
  data() {
    return {
      navdrawer: true,
      isLoading: false,
      errormessage: "",
      metadata: [],
      entrytypes: {},
      machinetypes: {},
      genretypes: {},
      features: {},
    };
  },
  computed: {},
  created() {
    if (this.$isDevelopment) console.log(`NavigationMenu.vue - created()`);
    this.navdrawer = this.value;
    this.isLoading = true;
    this.allResults = true;
    this.errormessage = "";

    var dataURL = this.$api_base_url + "/metadata";
    if (this.$isDevelopment) console.log(`NavigationMenu.vue - created(): calling ZXInfo API ${dataURL}`);
    axios
      .get(dataURL, { timeout: 5000 })
      .then((response) => {
        this.metadata = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errormessage = error.code + ": " + error.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
<style>
a.plain:link,
a.plain:visited,
a.router-link,
a.router-link-visited,
a.router-link-active,
a.router-link-exact-active {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
</style>
