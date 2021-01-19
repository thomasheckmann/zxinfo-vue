<template>
  <v-expansion-panels class="pa-0" multiple>
    <!-- * Modification of  * -->
    <v-expansion-panel :hidden="!entry.modFrom.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.modFrom.length ? 'font-weight-bold' : 'font-weight-light'"
        >Mod from</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.modFrom"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publisher" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publisher).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Inspired by  * -->
    <v-expansion-panel :hidden="!entry.inspiredBy.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.inspiredBy.length ? 'font-weight-bold' : 'font-weight-light'"
        >Inspiration for</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.inspiredBy"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }}X <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "ModificationInfoView",
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
