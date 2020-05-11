<template>
  <v-navigation-drawer v-model="navdrawer" app>
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
            <v-list-item-title
              ><a
                class="plain"
                href="/search/?machinetype=ZX-Spectrum%20128%20%2B2&machinetype=ZX-Spectrum%20128%20%2B2A%2F%2B3&machinetype=ZX-Spectrum%20128%20%2B2B&machinetype=ZX-Spectrum%20128%20%2B3&machinetype=ZX-Spectrum%20128K&machinetype=ZX-Spectrum%20128K%20%28load%20in%20USR0%20mode%29&machinetype=ZX-Spectrum%2016K&machinetype=ZX-Spectrum%2016K%2F48K&machinetype=ZX-Spectrum%2048K&machinetype=ZX-Spectrum%2048K%2F128K"
                >ZX Spectrum</a
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              ><a
                class="plain"
                href="/search/?machinetype=ZX81%2064K&machinetype=ZX81%2032K&machinetype=ZX81%202K&machinetype=ZX81%201K&machinetype=ZX81%2016K"
                >ZX81</a
              ></v-list-item-title
            >
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
              ><a class="plain" :href="'/search?type=' + encodeURIComponent(gt.value)">{{ gt.value }}</a></v-list-item-title
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
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle
            ><router-link class="plain" to="/animated">Animated Loading Screens</router-link></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle><router-link class="plain" to="/graph">Six degrees</router-link></v-list-item-subtitle>
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
    if (this.$isDevelopment) console.log("created()");
    this.navdrawer = this.value;
    this.isLoading = true;
    this.allResults = true;
    this.errormessage = "";
    if (this.$isDevelopment) console.log("CALLING ZXINFO API...(): " + this.$api_base_url);
    axios
      .get(this.$api_base_url + "/v2/metadata", { timeout: 5000 })
      .then((response) => {
        this.metadata = response.data;
        this.isLoading = false;
        if (this.$isDevelopment) console.log("...DONE!");
      })
      .catch((error) => {
        this.isLoading = false;
        this.errormessage = error.code + ": " + error.message;
      })
      .finally(() => {
        this.v = false;
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
