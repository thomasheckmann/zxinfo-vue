<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <v-card-title></v-card-title>
            <div>
              <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
              <p></p>
              <p class="text-center .caption .font-weight-thin	">ZXDB update 29.04.2020</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  name: "TestPage",
  metaInfo() {
    return {
      title: "ZXInfo - The open source ZXDB frontend",
    };
  },
  data() {
    return {};
  },
  components: {
    StreamBarcodeReader: StreamBarcodeReader,
  },
  methods: {
    onDecode(result) {
      console.log(result);
    },
  },
  watch: {},
  mounted() {},
};
</script>
