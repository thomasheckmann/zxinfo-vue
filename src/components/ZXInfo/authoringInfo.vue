<template>
  <v-expansion-panels class="pa-0" multiple>
    <!-- * Authored with  * -->
    <v-expansion-panel :hidden="!entry.authoredWith.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.authoredWith.length ? 'font-weight-bold' : 'font-weight-light'"
        >Authored/Created with</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.authoredWith"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * PROGRAMS AUTHORED WITH THIS* -->
    <v-expansion-panel :hidden="!entry.authoring.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.authoring.length ? 'font-weight-bold' : 'font-weight-light'"
        >Programs authored/Using</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.authoring"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link v-if="item.entry_id" :to="'/details/' + item.id">{{ item.title }}</router-link>
            <span v-else>{{ item.title }}</span> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "AuthoringInfoView",
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
