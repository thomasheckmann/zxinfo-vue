<template>
  <v-expansion-panels
    ><!-- * VIDEO LINKS * -->
    <v-expansion-panel :hidden="!entry.youtubelinks.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.youtubelinks.length ? 'font-weight-bold' : 'font-weight-light'"
        >Video(s)</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-btn
              class="ma-1"
              v-for="(link, i) in entry.youtubelinks"
              :key="i"
              @click="openUrl(link.url)"
              :disabled="link.url == null"
              small
              >{{ link.siteName }}<v-icon small right>mdi-link</v-icon></v-btn
            >
          </v-row>
        </v-container>
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * Download info * -->
    <v-expansion-panel :hidden="!entry.downloads.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.downloads.length ? 'font-weight-bold' : 'font-weight-light'"
        >Download info</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.downloads.headers"
          :items="entry.downloads"
          disable-sort
          hide-default-footer
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.origin="{ item }">
            <v-simple-checkbox disabled v-bind:value="item.origin == 'Original release (O)'"></v-simple-checkbox> </template
        ></v-data-table>
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * Additional downloads  * -->
    <v-expansion-panel :hidden="!entry.additionals.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.additionals.length ? 'font-weight-bold' : 'font-weight-light'"
        >Additional Download</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :items-per-page="-1"
          :headers="entry.additionals_headers"
          :items="entry.additionals"
          disable-sort
          hide-default-footer
          dense
          flat
          :mobile-breakpoint="0"
        >
          ><template v-slot:item.actions="{ item }">
            <v-icon small right @click="openUrl(item.url)">mdi-download</v-icon></template
          >
          <template v-slot:item.type="{ item }">
            {{ item.type }}<span :hidden="!item.language">({{ item.language }})</span></template
          ></v-data-table
        >
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * TOSEC * -->
    <v-expansion-panel :hidden="!entry.tosec.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.tosec.length ? 'font-weight-bold' : 'font-weight-light'"
        >TOSEC Info</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-list flat dense class="pa-0">
          <v-list-item style="min-height:16px;" class="pa-0 ma-0" v-for="(tosec, i) in entry.tosec" :key="i" two-line>
            <v-list-item-subtitle class="py-1 word-wrap" style="white-space: normal;">
              {{ tosec.path.replace("Sinclair ZX Spectrum/", "") }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * Related links  * -->
    <v-expansion-panel :hidden="!entry.relatedlinks.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.relatedlinks.length ? 'font-weight-bold' : 'font-weight-light'"
        >Related links</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-btn
              class="ma-1"
              v-for="(link, i) in entry.relatedlinks"
              :key="i"
              @click="openUrl(link.url)"
              :disabled="link.url == null"
              small
              >{{ link.siteName }}<v-icon small right>mdi-link</v-icon></v-btn
            >
          </v-row>
        </v-container>
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * Related sites  * -->
    <v-expansion-panel :hidden="!entry.relatedsites.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.relatedsites.length ? 'font-weight-bold' : 'font-weight-light'"
        >Related sites</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-btn
              class="ma-1"
              v-for="(link, i) in entry.relatedsites"
              :key="i"
              @click="openUrl(link.url)"
              :disabled="link.url == null"
              small
              >{{ link.siteName }}<v-icon small right>mdi-link</v-icon></v-btn
            >
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel></v-expansion-panels
  >
</template>
<script>
export default {
  name: "LinksInfoView",
  props: ["entry"],
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
  },
  components: {},
  computed: {},
};
</script>
