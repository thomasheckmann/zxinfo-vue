<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
<v-col
            cols="12"
            sm="8"
            md="4"
          >        <v-card>
          <v-card-text>
                    <div>
						<p>Try search <router-link to="/search">here:</router-link></p>
            <p>Special thanks goes to:
                <ul>
                    <li>Einar Saukas, the creator of ZXDB.</li>
					<li>The team maintaining ZXDB.</li>
                    <li><a href="http://spectrumcomputing.co.uk/">Spectrum Computing</a> the official ZXDB frontend.</li>
                </ul>
            </p>
            <p>Source code on <a href="https://github.com/thomasheckmann/zxinfo-vue">github.</a> - You can contact me: <i>info(a)zxinfo(dot)dk</i></p>
    <p>Remember to check out <a href="https://api.zxinfo.dk/doc/">the API behind ZXInfo</a></p>
    <p>ZXDB update 25.03.2020</p>
        </div>
</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container></template
>

<script>
export default {
  name: "Home",
};
</script>
