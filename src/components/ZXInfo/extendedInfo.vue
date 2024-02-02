<template>
  <v-expansion-panels>
    <!-- * publisher notes  * -->
    <v-expansion-panel :hidden="!entry.publisherNotes.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.publisherNotes.length ? 'font-weight-bold' : 'font-weight-light'"
        >Publisher notes</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center" v-for="(publisher, p) in entry.publisherNotes" :key="p">
            <v-list flat dense class="pa-0" disabled>
              <v-subheader>{{ publisher.name }}</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in publisher.notes" :key="i" dense>
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle style="white-space: normal;">{{ item.text }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * author notes  * -->
    <v-expansion-panel :hidden="!entry.authorNotes.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.authorNotes.length ? 'font-weight-bold' : 'font-weight-light'"
        >Author notes</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center" v-for="(author, p) in entry.authorNotes" :key="p">
            <v-list flat dense class="pa-0" disabled>
              <v-subheader>{{ author.name }}</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in author.notes" :key="i" dense>
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle style="white-space: normal;">{{ item.text }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Competitions * -->
    <v-expansion-panel :hidden="!entry.competitions.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.competitions.length ? 'font-weight-bold' : 'font-weight-light'"
        >Competitions</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-list flat dense class="pa-0">
              <v-list-item
                style="min-height:16px;"
                class="pa-0 ma-0 auto"
                v-for="(competition, i) in entry.competitions"
                :key="i"
              >
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle style="white-space: normal;"
                    ><router-link :to="{ path: '/search', query: { group: 'C', groupname: competition } }">{{
                      competition
                    }}</router-link></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * DEMO PARTY * -->
    <v-expansion-panel :hidden="!entry.demoParty.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.demoParty.length ? 'font-weight-bold' : 'font-weight-light'"
        >Demo Party</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.demoParty"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'D', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * FEATURES * -->
    <v-expansion-panel :hidden="!entry.features.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.features.length ? 'font-weight-bold' : 'font-weight-light'"
        >Features</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.features"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'F', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Graphical View * -->
    <v-expansion-panel :hidden="!entry.graphicalView.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.graphicalView.length ? 'font-weight-bold' : 'font-weight-light'"
        >Graphical Views</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.graphicalView"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'G', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Native Programming Language * -->
    <v-expansion-panel :hidden="!entry.programmingLanguage.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.programmingLanguage.length ? 'font-weight-bold' : 'font-weight-light'"
        >Native Programming Language</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.programmingLanguage"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'L', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Screen Movement * -->
    <v-expansion-panel :hidden="!entry.screenMovement.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.screenMovement.length ? 'font-weight-bold' : 'font-weight-light'"
        >Screen Movement</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.screenMovement"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'M', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Sport * -->
    <v-expansion-panel :hidden="!entry.sport.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.sport.length ? 'font-weight-bold' : 'font-weight-light'"
        >Sport</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.sport"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'P', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Copyright * -->
    <v-expansion-panel :hidden="!entry.copyright.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.copyright.length ? 'font-weight-bold' : 'font-weight-light'"
        >Copyright status</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.copyright"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'R', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Series  * -->
    <v-expansion-panel :hidden="!entry.series.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.series.length ? 'font-weight-bold' : 'font-weight-light'"
        >Series</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.series"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Themed groups * -->
    <v-expansion-panel :hidden="!entry.themedgroups.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.themedgroups.length ? 'font-weight-bold' : 'font-weight-light'"
        >Themes</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(theme, i) in entry.themedgroups"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'T', groupname: theme } })"
            >
              {{ theme }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Unsorted groups * -->
    <v-expansion-panel :hidden="!entry.unsortedgroups.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.unsortedgroups.length ? 'font-weight-bold' : 'font-weight-light'"
        >Groups</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(theme, i) in entry.unsortedgroups"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'U', groupname: theme } })"
            >
              {{ theme }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Cross Platform Tool * -->
    <v-expansion-panel :hidden="!entry.crossPlatform.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.crossPlatform.length ? 'font-weight-bold' : 'font-weight-light'"
        >Cross Platform Tool</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.crossPlatform"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'X', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * ZX81 GFX FEATURES * -->
    <v-expansion-panel :hidden="!entry.featuresZX81.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.featuresZX81.length ? 'font-weight-bold' : 'font-weight-light'"
        >ZX81 Enhanced Graphics</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(feature, i) in entry.featuresZX81"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="$router.push({ path: '/search', query: { group: 'Z', groupname: feature } })"
            >
              {{ feature }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Other systems/platforms * -->
    <v-expansion-panel :hidden="!entry.otherPlatforms.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.otherPlatforms.length ? 'font-weight-bold' : 'font-weight-light'"
        >Other platforms/Systems</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-row justify="start" align="center">
            <v-chip
              v-for="(platform, i) in entry.otherPlatforms"
              :key="i"
              class="ma-1"
              small
              outlined
              label
              @click="openUrl(platform.url)"
              :disabled="platform.url == null"
            >
              {{ platform.name }} <v-icon small right>mdi-link</v-icon>
            </v-chip>
          </v-row></v-container
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Licensed * -->
    <v-expansion-panel :hidden="!entry.licensed && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.licensed ? 'font-weight-bold' : 'font-weight-light'"
        >Tie-in Licence</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-container class="py-0">
          <v-list flat dense class="pa-0">
            <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(license, i) in entry.licensed" :key="i">
              <v-list-item-content class="py-1">
                <v-list-item-subtitle style="white-space: normal;"
                  >{{ license.name }}({{ license.country }}) - {{ license.type }}:
                  {{ license.originalName }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list></v-container
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
  },
  components: {},
  computed: {},
};
</script>
