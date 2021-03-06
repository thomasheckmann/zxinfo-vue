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
            <div v-for="(link, i) in entry.youtubelinks" :key="i">
              <youtube
                host="https://www.youtube-nocookie.com"
                :mute="true"
                player-height="200"
                player-width="320"
                :video-id="$youtube.getIdFromURL(link.url)"
              ></youtube>
            </div>
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
        >
          <template v-slot:item.url="{ item }">
            <div @dblclick="openDownloadUrl(item.url)">{{ item.url }}</div></template
          >

          <template v-slot:item.origin="{ item }">
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
    ><!-- * MagazineReferences  * -->
    <v-expansion-panel :hidden="!entry.magazineRefs.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.magazineRefs.length ? 'font-weight-bold' : 'font-weight-light'"
        >Magazine References (total: {{ entry.magazineRefs.length }})</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :items-per-page="-1"
          :headers="entry.magrefs_headers"
          :items="entry.magazineRefs"
          disable-sort
          hide-default-footer
          dense
          flat
          :mobile-breakpoint="0"
        >
          ><template v-slot:item.magazineName="{ item }"
            ><router-link :to="{ path: '/magazines/' + item.magazineName }">{{ item.magazineName }}</router-link></template
          >
          <template v-slot:item.issue="{ item }"
            ><router-link :to="{ path: '/magazines/' + item.magazineName + '/issues/' + item.issueId }"
              >{{ item.number }} - {{ item.dateYear }}/{{ item.dateMonth }}</router-link
            ></template
          >
          <template v-slot:item.type="{ item }">
            {{ item.type }}<span :hidden="!item.featureName"> - {{ item.featureName }}</span></template
          >
          <template v-slot:item.typeMed="{ item }"> {{ item.type }}</template></v-data-table
        >
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
import Vue from "vue";
import VueYouTubeEmbed from "vue-youtube-embed";

Vue.use(VueYouTubeEmbed);

export default {
  name: "LinksInfoView",
  props: ["entry"],
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
    openDownloadUrl: function(url) {
      if (url.startsWith("/pub/sinclair")) {
        url = url.replace("/pub/sinclair/", "");
        url =
          "https://archive.org/download/World_of_Spectrum_June_2017_Mirror/World%20of%20Spectrum%20June%202017%20Mirror.zip/World%20of%20Spectrum%20June%202017%20Mirror/sinclair/" +
          url;
      } else if (url.startsWith("/zxdb")) {
        url = url.replace("/zxdb/sinclair/", "");
        url = "https://spectrumcomputing.co.uk/zxdb/sinclair/" + url;
      }
      window.open(url);
    },
  },
  components: {},
  computed: {},
};
</script>
