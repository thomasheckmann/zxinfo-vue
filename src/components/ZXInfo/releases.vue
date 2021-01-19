<template>
  <v-expansion-panels class="pa-0" multiple>
    <!-- * RELEASES * -->
    <v-expansion-panel :hidden="!entry.releases.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.releases.length ? 'font-weight-bold' : 'font-weight-light'"
        >Releases</v-expansion-panel-header
      >
      <v-expansion-panel-content class="pa-0">
        <v-data-table
          class="pl-0"
          :headers="entry.releases.headers"
          :items="entry.releases"
          disable-sort
          hide-default-footer
          dense
          :mobile-breakpoint="0"
          ><template v-slot:item.publishers="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1">/ </span></span
            > </template
          ><template v-slot:item.asTitle="{ item }">
            <span v-for="(asTitle, i) in item.releaseTitles" :key="i"
              >{{ asTitle }} <span v-if="i != Object.keys(item.releaseTitles).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content> </v-expansion-panel
    ><!-- * AVAILABLE FORMATS * -->
    <v-expansion-panel :hidden="!entry.availableformat.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.availableformat.length ? 'font-weight-bold' : 'font-weight-light'"
        >Available formats</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip v-for="(format, i) in entry.availableformat" :key="i" class="ma-1" color="black" small outlined label>
              {{ format.format }} <v-icon small right>{{ getIconForDownload(format.type) }}</v-icon></v-chip
            ></v-row
          ></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * PROTECTION SCHEMES * -->
    <v-expansion-panel :hidden="!entry.protectionscheme.length && !$isDevelopment">
      <v-expansion-panel-header
        class="px-4 py-0"
        :class="entry.protectionscheme.length ? 'font-weight-bold' : 'font-weight-light'"
        >Protection schemes</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip v-for="(format, i) in entry.protectionscheme" :key="i" class="ma-1" small label> {{ format }}</v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "ReleasesView",
  props: ["entry"],
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
    getIconForDownload: function(file_type) {
      switch (file_type) {
        case "Snapshot image":
        case "Computer/ZX Interface 2 cartridge ROM image dump":
        case "DOCK cartridge ROM image dump":
          return "mdi-archive";
        case "Tape image":
        case "Archive file":
        case "Covertape version":
        case "BUGFIX tape image":
          return "mdi-cassette";
        case "Disk image":
          return "mdi-floppy";
        case "Complete book":
          return "mid-book-open-page-variant";
        case "Electronic magazine":
          return "mid-book-open";
        default:
          return "mdi-archive";
      }
    },
  },
  components: {},
  computed: {},
};
</script>
