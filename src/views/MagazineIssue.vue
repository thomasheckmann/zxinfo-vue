<template>
  <v-container v-if="!loading" justify-start class="scroll-y pa-0" fluid>
    <v-row
      ><v-col cols="12" justify="center" class="py-0 ma-0">
        <v-card dark flat>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">{{ issue.name }}</v-card-title>

              <v-card-subtitle>Year: {{ issue.issue.date_year }}, Month: {{ issue.issue.date_month }}</v-card-subtitle>
              <v-card-text
                >Publisher: {{ issue.publisher }}<br />
                Country: {{ issue.country }}<br />Language: {{ issue.language }}, type: {{ issue.type }}</v-card-text
              >
            </div>

            <v-avatar class="ma-1" size="200" tile>
              <v-img :src="getScreenUrl(issue.issue.cover_image)"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col> </v-row
  ></v-container>
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
      loading: true,
    };
  },
  computed: {},
  methods: { getScreenUrl: imageHelper.getScreenUrl },
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
