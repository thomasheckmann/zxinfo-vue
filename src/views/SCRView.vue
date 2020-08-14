<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col :xl="8" :lg="8" :md="10" :sm="8" :xs="12">
        <v-card max-width="100%" flat>
          <v-card-title>ZX81 Screen Converter</v-card-title>
          <v-card-text>
            Take as input a screen dump file and converts to different formats. Allowed input formats:
            <ul>
              <li>.bmp as produced by various emulators (e.g. EightyOne and SZ81)</li>
              <li>.s81 for standard non-hires ZX81 screens (a sequence of 768 character codes from the ZX81 charset)</li>
              <li>.scr Widely used screen format used for ZX Spectrum (ZX81 hi-res)</li>
            </ul>
            Creates the following output for downloads:
            <ul>
              <li>.s81 for standard non-hires ZX81 screens (a sequence of 768 character codes from the ZX81 charset)</li>
              <li>.scr for hires screens with regular size (in ZX Spectrum display format)</li>
              <li>.png for big screens, that goes beyond the 256x192 size</li>
              <li>.txt for printing in console - mostly for fun (ANSI control codes to implement inverse print)</li>
            </ul>
            <div v-if="currentFile">
              <div>
                <v-progress-linear v-model="progress" color="grey" height="25" reactive>
                  <strong>{{ progress }} %</strong>
                </v-progress-linear>
              </div>
            </div>
            <v-row no-gutters justify="center" align="center">
              <v-col cols="10">
                <v-file-input show-size label="File input" @change="selectFile"></v-file-input>
              </v-col>
              <v-col cols="2" class="pl-2">
                <v-btn :disabled="!this.currentFile" dark small @click="upload">
                  Upload
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="input_is_image" no-gutters justify="center" align="center">
              <v-text-field label="Offset X" outlined v-model="offsetx"></v-text-field>
              <v-col cols="6" class="pl-2">
                <v-text-field label="Offset Y" outlined v-model="offsety"></v-text-field>
              </v-col>
            </v-row>
            <v-alert v-if="message" border="left" color="blue-grey" dark> {{ message }} </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense v-if="r" align="start" justify="center">
      <v-col cols="3">
        <v-card max-width="320">
          <v-img class="black--text align-end" :max-width="r.png.width" :src="r.png.base64"></v-img
          ><v-card-subtitle>{{ r.png.filename }} ({{ r.png.width }}x{{ r.png.height }})</v-card-subtitle>
          <v-card-actions>
            <v-btn icon :href="this.$api_base_url + '/scr/files/' + r.png.filename">
              <v-icon>mdi-download</v-icon>
            </v-btn></v-card-actions
          ></v-card
        >
      </v-col>
      <v-col cols="3">
        <v-card max-width="320">
          <v-img
            class="black--text align-end"
            max-width="320"
            :src="this.$api_base_url + '/scr/files/' + r.ovr.filename + '?t=' + new Date().getTime()"
          ></v-img
          ><v-card-subtitle>{{ r.ovr.filename }}</v-card-subtitle>
          <v-card-text>Used offset: (x,y) = ({{ r.used_offsetx }}x{{ r.used_offsety }})</v-card-text>
          <v-card-actions>
            <v-btn icon :href="this.$api_base_url + '/scr/files/' + r.ovr.filename">
              <v-icon>mdi-download</v-icon>
            </v-btn></v-card-actions
          ></v-card
        >
      </v-col>
      <v-col cols="3">
        <v-card max-width="320">
          <v-card-text
            ><pre
              style="font-family: 'Courier New', Courier, monospace; font-size: 9px; line-height: 90%;"
              v-html="r.txt.data"
            ></pre
          ></v-card-text>
          <v-card-subtitle>{{ r.txt.filename }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon :href="this.$api_base_url + '/scr/files/' + r.txt.filename">
              <v-icon>mdi-download</v-icon>
            </v-btn></v-card-actions
          ></v-card
        >
      </v-col>
      <v-col cols="3">
        <v-card max-width="320">
          <v-card-title>DOWNLOADS</v-card-title>
          <v-card-text>
            <ul>
              <li>
                <a :href="this.$api_base_url + '/scr/files/' + r.png.filename">{{ r.png.filename }}</a>
              </li>
              <li>
                <a :href="this.$api_base_url + '/scr/files/' + r.s81.filename">{{ r.s81.filename }}</a>
              </li>
              <li>
                <a :href="this.$api_base_url + '/scr/files/' + r.scr.filename">{{ r.scr.filename }}</a>
              </li>
              <li>
                <a :href="this.$api_base_url + '/scr/files/' + r.txt.filename">{{ r.txt.filename }}</a>
              </li>
            </ul>
          </v-card-text></v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadService from "../services/UploadFilesService";
import AnsiUp from "ansi_up";

export default {
  name: "zx81-convert-scr",
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: "",
      file: undefined,
      r: undefined,
      input_is_image: false,
      offsetx: -1,
      offsety: -1,
    };
  },
  methods: {
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }

      this.message = "";
      this.r = undefined;

      UploadService.upload(this.currentFile, this.$api_base_url, this.offsetx, this.offsety, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          this.file = response.data.file;
          this.r = response.data.output;
          this.offsetx = this.r.used_offsetx;
          this.offsety = this.r.used_offsety;
          const ansi_up = new AnsiUp();
          this.r.txt.data = ansi_up.ansi_to_html(this.r.txt.data);
          return;
        })
        .catch((e) => {
          this.progress = 0;
          this.message = e;
          this.currentFile = undefined;
        });
    },
    selectFile(file) {
      const allowedTypes = ["bmp", "s81", "scr"];

      this.message = "";
      this.progress = 0;
      this.currentFile = file;
      this.offsetx = -1;
      this.offsety = -1;

      if (!file) return;
      var extension = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();

      if (file.size > 1000000) {
        this.message = "Too large, max size allowed is 1000000KB";
        this.currentFile = undefined;
      }
      if (!allowedTypes.includes(extension)) {
        this.message = "Invalid file type: " + file.type;
        this.currentFile = undefined;
      }
      if (extension === "bmp") {
        this.input_is_image = true;
      } else {
        this.input_is_image = false;
      }
    },
  },
  mounted() {},
};
</script>
