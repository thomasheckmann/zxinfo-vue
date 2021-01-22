<template>
  <v-expansion-panels class="pa-0" multiple>
    <!-- * Part of book  * -->
    <v-expansion-panel :hidden="!entry.inBook.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.inBook.length ? 'font-weight-bold' : 'font-weight-light'"
        >From this book</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.inBook"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(entry.originalPublishers).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Book content * -->
    <v-expansion-panel :hidden="!entry.bookContent.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.bookContent.length ? 'font-weight-bold' : 'font-weight-light'"
        >Book content</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.bookContent"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link v-if="item.entry_id" :to="'/details/' + item.id">{{ item.title }}</router-link>
            <span v-else>{{ item.title }}</span> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(entry.originalPublishers).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "BookInfoView",
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
