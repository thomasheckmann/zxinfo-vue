<template>
  <v-container class="ma-0 pa-0"
    ><v-card max-width="100%" flat>
      <v-card-title>ZX81 Screen Converter</v-card-title>
      <v-card-text
        ><div v-if="!r">
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
        </div>
        <v-row no-gutters justify="center" align="center">
          <v-col cols="12" v-if="this.currentFile">
            <v-progress-linear v-model="progress" color="grey" height="25">
              <strong>{{ progress }} %</strong>
            </v-progress-linear></v-col
          >
          <v-col cols="12"> <v-file-input show-size label="File input" @change="selectFile"></v-file-input> </v-col>
          <v-col v-if="message" cols="12">
            <v-alert v-if="message" border="left" color="blue-grey" dark> {{ message }} </v-alert>
          </v-col>
          <v-col cols="6" sm="4" class="pl-2"
            ><v-text-field v-if="input_is_image" label="Offset X" outlined v-model="offsetx" dense></v-text-field> </v-col
          ><v-col cols="6" sm="4" class="pl-2"
            ><v-text-field v-if="input_is_image" label="Offset Y" outlined v-model="offsety" dense></v-text-field></v-col
          ><v-col cols="12" sm="4" class="pl-2" align-self="start"
            ><v-btn width="100%" :disabled="!this.currentFile" dark small @click="upload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn></v-col
          ></v-row
        >
      </v-card-text></v-card
    >
    <v-card v-if="r" max-width="100%"
      ><v-slide-group :show-arrows="true" :center-active="true">
        <v-slide-item v-slot:default="{ active, toggle }"
          ><v-card :color="active ? 'white' : 'white'" class="ma-4" :width="cardwidth" @click="toggle">
            <v-img class="black--text align-end" :max-width="r.png.width" :src="r.png.base64"></v-img
            ><v-card-subtitle>{{ r.png.filename }} ({{ r.png.width }}x{{ r.png.height }})</v-card-subtitle>
            <v-card-text class="caption"
              >Original image copied pixel-by-pixel and saved as PNG. Cleaned for e.g. TV artefacts added by
              EightyOne.</v-card-text
            >
            <v-card-actions>
              <v-btn icon :href="$api_base_url + '/scr/files/' + r.png.filename">
                <v-icon>mdi-download</v-icon>
              </v-btn></v-card-actions
            ></v-card
          >
        </v-slide-item>
        <v-slide-item v-slot:default="{ active, toggle }"
          ><v-card :color="active ? 'white' : 'white'" class="ma-4" :width="cardwidth" @click="toggle">
            <v-img
              class="black--text align-end"
              max-width="320"
              :src="$api_base_url + '/scr/files/' + encodeURIComponent(r.ovr.filename) + '?t=' + new Date().getTime()"
            ></v-img
            ><v-card-subtitle>{{ r.ovr.filename }}</v-card-subtitle>
            <v-card-text class="caption"
              >Used offset: (x,y) = ({{ r.used_offsetx }}x{{ r.used_offsety }}) <br />Original image with marked center of screen.
              Use to adjust offsetx and offsety.
            </v-card-text>
            <v-card-actions>
              <v-btn icon :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.ovr.filename)">
                <v-icon>mdi-download</v-icon>
              </v-btn></v-card-actions
            ></v-card
          >
        </v-slide-item>
        <v-slide-item v-slot:default="{ active, toggle }"
          ><v-card :color="active ? 'white' : 'white'" class="ma-4" :width="cardwidth" @click="toggle">
            <v-card-text
              ><pre
                style="font-family: 'Courier New', Courier, monospace; font-size: 9px; line-height: 90%;"
                v-html="r.txt.data"
              ></pre
            ></v-card-text>
            <v-card-subtitle>{{ r.txt.filename }}</v-card-subtitle>
            <v-card-text class="caption"
              >ASCII version of S81 file. Use to check correct offset in order to match characters.</v-card-text
            >
            <v-card-actions>
              <v-btn icon :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.txt.filename)">
                <v-icon>mdi-download</v-icon>
              </v-btn></v-card-actions
            ></v-card
          >
        </v-slide-item>
        <v-slide-item v-slot:default="{ active, toggle }"
          ><v-card :color="active ? 'white' : 'white'" class="ma-4" :width="cardwidth" @click="toggle">
            <v-card-title>DOWNLOADS</v-card-title>
            <v-card-text>
              <ul>
                <li>
                  <a :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.png.filename)">{{ r.png.filename }}</a>
                </li>
                <li>
                  <a :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.s81.filename)">{{ r.s81.filename }}</a>
                </li>
                <li>
                  <a :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.scr.filename)">{{ r.scr.filename }}</a>
                </li>
                <li>
                  <a :href="$api_base_url + '/scr/files/' + encodeURIComponent(r.txt.filename)">{{ r.txt.filename }}</a>
                </li>
              </ul>
            </v-card-text></v-card
          >
        </v-slide-item>
      </v-slide-group></v-card
    >
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
  computed: {
    cardwidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "250";
        case "sm":
        case "md":
        case "lg":
        case "xl":
          return "320";
      }
      return "320";
    },
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
      const allowedTypes = ["bmp", "png", "s81", "scr"];

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
      if (extension === "bmp" || extension === "png") {
        this.input_is_image = true;
      } else {
        this.input_is_image = false;
      }
    },
  },
  mounted() {},
};
</script>
