<template>
  <v-container v-if="!loading" justify-start class="scroll-y pa-0" fluid>
    <v-row
      ><v-col cols="12" justify="center" class="py-0 ma-0">
        <v-card dark tile class="pa-2">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">{{ issue.name }}</v-card-title>

              <v-card-subtitle>Year: {{ issue.issue.date_year }}, Month: {{ issue.issue.date_month }}</v-card-subtitle>
              <v-card-text
                >Publisher: {{ issue.publisher }}<br />
                Country: {{ issue.country }}<br />Language: {{ issue.language }}, type: {{ issue.type }}</v-card-text
              >
            </div>

            <v-img
              :lazy-src="getDefaultImageSrc"
              :aspect-ratio="9 / 16"
              max-height="300"
              max-width="200"
              :src="getScreenUrl(issue.issue.cover_image)"
            ></v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Type
                </th>
                <th class="text-left">
                  Page
                </th>
                <th class="text-left">
                  Topic
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in getTitlesReferenced" :key="i">
                <td>
                  <router-link :to="{ path: '/details/' + item.entry_id }">{{ item.entry_title }}</router-link>
                </td>
                <td>{{ item.type }}</td>
                <td>{{ item.page }}</td>
                <td>{{ item.featurename }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row></v-container
  >
</template>

<script>
import axios from "axios";
import imageHelper from "@/helpers/image-helper";

export default {
  name: "Magazines",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {
      issue: {},
      titles: [],
      loading: true,
    };
  },
  computed: {
    getDefaultImageSrc() {
      return imageHelper.DEFAULT_PAPER_SRC;
    },
    getTitlesReferenced() {
      return this.issue.issue.references
        .filter((item) => item.entry_id !== null)
        .sort((a, b) => (a.entry_title > b.entry_title ? 1 : b.entry_title > a.entry_title ? -1 : 0));
    },
  },
  methods: {
    getScreenUrl: imageHelper.getScreenUrl,
  },
  mounted() {
    this.isLoading = true;

    var dataURL = this.$api_base_url + `/magazines/${this.$route.params.name}/issues/${this.$route.params.issueid}`;
    if (this.$isDevelopment) console.log(`MagazineIssue.vue - loadentry(): calling ZXInfo API ${dataURL}`);
    axios
      .get(dataURL)
      .then((response) => {
        this.issue = response.data;
        console.log(this.issue);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.completeOptions = [];
        this.errormessage = error.code + ": " + error.message;
        this.loading = false;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
<style scoped></style>
