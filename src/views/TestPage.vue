<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
        <v-card flat>
          <v-card-text>
            <div>
              <div>
                <v-quagga :onDetected="onBarcodeScanned" :readerSize="readerSize" :readerTypes="['ean_reader']"></v-quagga>
              </div>
              <p></p>
              <p class="text-center .caption .font-weight-thin	">ZXDB update 15.05.2020</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "VueBarcodeTest",
  data() {
    return {
      readerSize: {
        width: 640,
        height: 480,
      },
      detecteds: [],
    };
  },
  created() {
    // Add barcode scan listener and pass the callback function
    this.$barcodeScanner.init(this.onBarcodeScanned);
  },
  destroyed() {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy();
  },
  methods: {
    onBarcodeScanned(barcode) {
      console.log(barcode);
      // do something...
    },
    // Reset to the last barcode before hitting enter (whatever anything in the input box)
    resetBarcode() {
      //let barcode = this.$barcodeScanner.getPreviousCode();
      // do something...
    },
  },
};
</script>
