<template>
  <v-container class="ma-0 pa-0" fluid
    ><v-card v-if="!data" max-width="100%" flat>
      <v-card-title>Tape Browser</v-card-title>
      <v-card-text
        ><div>
          Upload a TZX file - and see what it contains
        </div>
        <v-row no-gutters justify="center" align="center">
          <v-col cols="12"> <v-file-input show-size label="File input" @change="selectFile"></v-file-input> </v-col>
          <v-col v-if="message" cols="12">
            <v-alert v-if="message" border="left" color="blue-grey" dark> {{ message }} </v-alert>
          </v-col>
          <v-col cols="12" sm="4" class="pl-2" align-self="start"
            ><v-btn width="100%" :disabled="!currentFile" dark small @click="upload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn></v-col
          ></v-row
        >
      </v-card-text></v-card
    >

    <!-- TZX Details -->

    <v-card v-if="entry" max-width="100%" flat>
      <v-card-title class="black--text headline"> TZX Content </v-card-title
      ><v-row class="pa-0 ma-0" justify="space-between" align="start">
        <v-col cols="3" class="pa-0">
          <GameCard v-if="entry" v-bind:GameData="entry" v-bind:imagetype="imagetype"></GameCard>
        </v-col>

        <v-divider vertical></v-divider>
        <v-col cols="5" class="pa-0"
          ><v-list dense max-height="500px" class="overflow-y-auto"
            ><v-list-item-group v-model="selectedItem" color="primary"
              ><v-list-item v-for="(item, i) in blocks" :key="i">
                <v-list-item-content>
                  <v-list-item-title>#: {{ i }}, ID: 0x{{ item.id.toString(16) }}, type: {{ item.blockName }}</v-list-item-title
                  ><v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item></v-list-item-group
            ></v-list
          ></v-col
        >
        <v-divider vertical></v-divider>
        <v-col>
          <v-scroll-y-transition mode="out-in"
            ><div>
              <component v-bind:is="UIComponents[selectedItem]" v-model="blocks[selectedItem]" :key="selectedItem"></component>
            </div>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import crypto from "crypto";
import axios from "axios";

import GameCard from "@/components/GameCardSmall";
import tape from "@/helpers/tapebrowser";

import TextDescription from "@/components/TZXComponents/TextDescription";
import StandardSpeedDataBlock from "@/components/TZXComponents/StandardSpeedDataBlock";
import GroupStart from "@/components/TZXComponents/GroupStart";
import GroupEnd from "@/components/TZXComponents/GroupEnd";
import LoopStart from "@/components/TZXComponents/LoopStart";
import LoopEnd from "@/components/TZXComponents/LoopEnd";
import PureTone from "@/components/TZXComponents/PureTone";
import PulseSequence from "@/components/TZXComponents/PulseSequence";
import PureDataBlock from "@/components/TZXComponents/PureDataBlock";
import PauseStopTape from "@/components/TZXComponents/PauseStopTape";

export default {
  name: "TapeBrowser",
  data() {
    return {
      imagetype: "screen",
      currentFile: undefined,
      message: "",
      data: null,
      sha512: null,
      entry: null,
      UIComponents: [],
      blocks: [],
      selectedItem: null,
    };
  },
  computed: {},
  components: { GameCard },
  methods: {
    loadTape() {
      this.selectedItem = null;
      this.UIComponents = [];
      this.blocks = [];
      const tzxTape = tape.readTape(this.data);
      tzxTape.blocks.forEach((block) => {
        const blockName = block.constructor.name;
        switch (blockName) {
          case "TextDescription":
            this.UIComponents.push(TextDescription);
            this.blocks.push(block);
            break;
          case "PureTone":
            this.UIComponents.push(PureTone);
            this.blocks.push(block);
            break;
          case "PureDataBlock":
            this.UIComponents.push(PureDataBlock);
            this.blocks.push(block);
            break;
          case "PulseSequence":
            this.UIComponents.push(PulseSequence);
            this.blocks.push(block);
            break;
          case "GroupStart":
            this.UIComponents.push(GroupStart);
            this.blocks.push(block);
            break;
          case "PauseStopTape":
            this.UIComponents.push(PauseStopTape);
            this.blocks.push(block);
            break;
          case "GroupEnd":
            this.UIComponents.push(GroupEnd);
            this.blocks.push(block);
            break;
          case "LoopStart":
            this.UIComponents.push(LoopStart);
            this.blocks.push(block);
            break;
          case "LoopEnd":
            this.UIComponents.push(LoopEnd);
            this.blocks.push(block);
            break;
          case "StandardSpeedDataBlock":
            this.UIComponents.push(StandardSpeedDataBlock);
            this.blocks.push(block);
            break;
          default:
            console.log("UNKNOWN block: " + block.constructor.name);

            break;
        }
      });
    },

    loadEntry(entryId) {
      var dataURL = this.$api_base_url + "/games/" + entryId + "?mode=tiny";
      if (this.$isDevelopment) console.log(`TapeBrowser.vue - loadEntry(): calling ZXInfo API ${dataURL}`);
      axios
        .get(dataURL)
        .then((response) => {
          this.entry = response.data;
          this.loadTape();
        })
        .catch((error) => {
          if (error.response) this.entry = null; // TODO: Handle NOT found better
        })
        .finally(() => {});
    },
    upload() {
      this.message = "";
      this.data = null;
      this.sha512 = null;
      this.entry = null;

      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }
      var reader = new FileReader();
      var shasum = crypto.createHash("sha512");
      reader.readAsArrayBuffer(this.currentFile);
      reader.onload = () => {
        this.data = reader.result;
        shasum.update(new Uint8Array(this.data));
      };
      reader.onloadend = () => {
        this.sha512 = shasum.digest("hex");

        var dataURL = this.$api_base_url + `/filecheck/${this.sha512}`;
        if (this.$isDevelopment) console.log(`TapeBrowser.vue - upload(): calling ZXInfo API ${dataURL}`);
        axios
          .get(dataURL, { timeout: 500 })
          .then((response) => {
            const entryId = response.data.entry_id;
            this.loadEntry(entryId);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.message = `File not found in ZXDB: ${this.sha512}`;
            } else {
              this.message = error.code + ": " + error.message;
            }
          })
          .finally(() => {
            //this.isLoading = false;
          });
      };
    },
    selectFile(file) {
      const allowedTypes = ["tzx"];

      this.message = "";
      this.currentFile = file;

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
    },
  },
  mounted() {},
};
</script>
