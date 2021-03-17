<template>
  <v-expansion-panels class="pa-0" multiple>
    <!-- * IN COMPILATIONS  * -->
    <v-expansion-panel :hidden="!entry.inCompilations.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.inCompilations.length ? 'font-weight-bold' : 'font-weight-light'"
        >In compilations</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.inCompilations"
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
    <!-- * COMPILATION CONTENT  * -->
    <v-expansion-panel :hidden="!entry.compilationContent.length && !$isDevelopment">
      <v-expansion-panel-header
        class="px-4 py-0"
        :class="entry.compilationContent.length ? 'font-weight-bold' : 'font-weight-light'"
        >Compilation content</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.compilationContent_headers"
          :items="entry.compilationContent"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link v-if="item.entry_id" :to="'/details/' + item.id">{{ item.title }} ({{ item.variation }})</router-link>
            <span v-else>{{ item.title }}</span> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1">/ </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "CompilationInfoView",
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
