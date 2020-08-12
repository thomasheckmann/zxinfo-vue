<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        ZX81 Screen Converter.<br />
        Takes as input: .BMP <br />
        ...and generates the following files: .SCR, .A81, .TXT &amp; .PNG
        <v-card>
          <v-card-text>
            <div>
              <!-- -->
              <div v-if="currentFile">
                <div>
                  <v-progress-linear v-model="progress" color="grey" height="25" reactive>
                    <strong>{{ progress }} %</strong>
                  </v-progress-linear>
                </div>
              </div>

              <v-row no-gutters justify="center" align="center">
                <v-col cols="8">
                  <v-file-input show-size label="File input" @change="selectFile"></v-file-input>
                </v-col>

                <v-col cols="4" class="pl-2">
                  <v-btn :disabled="!this.currentFile" dark small @click="upload">
                    Upload
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <v-alert v-if="message" border="left" color="blue-grey" dark>
                {{ message }}
              </v-alert>

              <v-card v-if="image"
                ><v-img v-if="image" max-width="320" :src="image.base64"></v-img> WxH: {{ image.img_width }}x{{
                  image.img_height
                }}
                <br />
                <ul>
                  <li><a :href="this.$api_base_url + '/scr/files/' + filename + '.png'">PNG</a></li>
                  <li><a :href="this.$api_base_url + '/scr/files/' + filename + '.a81'">A81</a></li>
                  <li><a :href="this.$api_base_url + '/scr/files/' + filename + '.scr'">SCR</a></li>
                  <li><a :href="this.$api_base_url + '/scr/files/' + filename + '.txt'">TXT</a></li>
                </ul>
              </v-card>
              <!-- -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadService from "../services/UploadFilesService";

export default {
  name: "zx81-convert-scr",
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: "",
      file: undefined,
      filename: undefined,
      image: undefined,
    };
  },
  methods: {
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }

      this.message = "";

      UploadService.upload(this.currentFile, this.$api_base_url, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          this.file = response.data.file;
          this.image = response.data.image;
          this.filename = this.file.originalname
            .split(".")
            .slice(0, -1)
            .join(".");
          return;
        })
        .catch((e) => {
          this.progress = 0;
          this.message = e;
          this.currentFile = undefined;
        });
    },
    selectFile(file) {
      const allowedTypes = ["image/bmp"];

      this.message = "";
      this.progress = 0;
      this.currentFile = file;

      if (!file) return;
      if (file.size > 1000000) {
        this.message = "Too large, max size allowed is 1000000KB";
        this.currentFile = undefined;
      }
      if (!allowedTypes.includes(file.type)) {
        this.message = "Invalid file type: " + file.type;
        this.currentFile = undefined;
      }
    },
  },
  mounted() {},
};
</script>