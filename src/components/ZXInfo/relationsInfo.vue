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
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
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
            <router-link v-if="item.entry_id" :to="'/details/' + item.entry_id">{{ item.title }}</router-link>
            <span v-else>{{ item.title }}</span> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Requires Hardware/Interface  * -->
    <v-expansion-panel :hidden="!entry.requiresHardware.length && !$isDevelopment">
      <v-expansion-panel-header
        class="px-4 py-0"
        :class="entry.requiresHardware.length ? 'font-weight-bold' : 'font-weight-light'"
        >Requires hardware</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.requiresHardware"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.requiredByHardware.length && !$isDevelopment">
      <v-expansion-panel-header
        class="px-4 py-0"
        :class="entry.requiredByHardware.length ? 'font-weight-bold' : 'font-weight-light'"
        >Hardware required by</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.requiredByHardware"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * Inspiration  * -->
    <v-expansion-panel :hidden="!entry.inspiredBy.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.inspiredBy.length ? 'font-weight-bold' : 'font-weight-light'"
        >Inspired by</v-expansion-panel-header
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
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.inspirationFor.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.inspirationFor.length ? 'font-weight-bold' : 'font-weight-light'"
        >Inspiration for</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.inspirationFor"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- * add-on pack that depends on  * -->
    <v-expansion-panel :hidden="!entry.addOnDependsOn.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.addOnDependsOn.length ? 'font-weight-bold' : 'font-weight-light'"
        >Add-on requires</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.addOnDependsOn"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.addOnAvailable.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.addOnAvailable.length ? 'font-weight-bold' : 'font-weight-light'"
        >Available Add-on(s)</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.addOnAvailable"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- Modified by -->
    <v-expansion-panel :hidden="!entry.modificationOf.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.modificationOf.length ? 'font-weight-bold' : 'font-weight-light'"
        >Modification of</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.modificationOf"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.modifiedBy.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.modifiedBy.length ? 'font-weight-bold' : 'font-weight-light'"
        >Modified by</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.modifiedBy"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- Other platform -->
    <v-expansion-panel :hidden="!entry.otherPlatform.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.otherPlatform.length ? 'font-weight-bold' : 'font-weight-light'"
        >Platform</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.otherPlatform"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- Runs with -->
    <v-expansion-panel :hidden="!entry.runsWith.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.runsWith.length ? 'font-weight-bold' : 'font-weight-light'"
        >Runs with</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.runsWith"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.requiredToRun.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.requiredToRun.length ? 'font-weight-bold' : 'font-weight-light'"
        >Required by</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.requiredToRun"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- Derived -->
    <v-expansion-panel :hidden="!entry.derivedFrom.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.derivedFrom.length ? 'font-weight-bold' : 'font-weight-light'"
        >Derived from</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.derivedFrom"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.originOf.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.originOf.length ? 'font-weight-bold' : 'font-weight-light'"
        >Origin of</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.originOf"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- bundle -->
    <v-expansion-panel :hidden="!entry.bundledWith.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.bundledWith.length ? 'font-weight-bold' : 'font-weight-light'"
        >Came bundled with</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.bundledWith"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.bundleContent.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.bundleContent.length ? 'font-weight-bold' : 'font-weight-light'"
        >Bundle content</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.bundleContent"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- duplicates -->
    <v-expansion-panel :hidden="!entry.duplicateOf.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.duplicateOf.length ? 'font-weight-bold' : 'font-weight-light'"
        >Duplicate of(same as)</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.duplicateOf"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
          ><template v-slot:item.publisher="{ item }">
            <span v-for="(orgpub, i) in item.publishers" :key="i"
              >{{ orgpub.name }} <span v-if="i != Object.keys(item.publishers).length - 1"> / </span></span
            >
          </template></v-data-table
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :hidden="!entry.duplicatedBy.length && !$isDevelopment">
      <v-expansion-panel-header class="px-4 py-0" :class="entry.duplicatedBy.length ? 'font-weight-bold' : 'font-weight-light'"
        >Duplicated by</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-data-table
          class="pa-0"
          :headers="entry.item_short_headers"
          :items="entry.duplicatedBy"
          disable-sort
          dense
          flat
          :mobile-breakpoint="0"
          ><template v-slot:item.title="{ item }">
            <router-link :to="'/details/' + item.entry_id">{{ item.title }}</router-link> </template
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
  name: "RelationsInfoView",
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
