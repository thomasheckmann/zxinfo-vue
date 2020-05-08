<template>
  <v-container class="fill-height" fluid>
    <v-row align="start">
      <v-col cols="6">
        <v-sheet tile>
          <v-carousel :continuous="false" :show-arrows="true" height="100%" hide-delimiters>
            <v-carousel-item v-for="(item, i) in animatedscreens" :key="i" :src="item.src">
              <v-row class="fill-height" align="end" justify="center">
                <v-system-bar v-if="item.caption" lights-out dark width="100%"
                  ><span class="white--text">{{ item.caption }}</span></v-system-bar
                >
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
      <v-col cols="6"
        ><v-card flat><v-card-title>Animated loading screens</v-card-title><v-card-text><p>We celebrate the era of blocky 8-bit artwork, with a look back at the ZX Spectrum’s most amazing loading screens… that was animated or even contained a small mini-game.

		Some of the most used effects:
		<ul>
		<li>Animations</li>
		<li>Counters</li>
		<li>Different color scheme</li>
		<li>Mini games</li>
		<li>Story telling</li>
		</ul>

		</p></v-card-text></v-card></v-col
      >
    </v-row></v-container
  >
</template>
<script>
let media_url = "https://zxinfo.dk/media";

export default {
  name: "AnimatedLoadingScreens",
  data() {
    return {
      animatedscreens: [
        {
          src: media_url + "/new/sinclair/screens/load/animated/295-1-load-ani.gif",
          caption: "Astro Marine Corps, Dinamic Software",
        },
        { src: media_url + "/new/sinclair/screens/load/animated/720-1-load-ani.gif", caption: "720 Degrees, US Gold Ltd" },
        { src: media_url + "/new/sinclair/screens/load/animated/996-1-load-ani.gif", caption: "Cobra, Ocean Software Ltd" },
        { src: media_url + "/new/sinclair/screens/load/animated/1347-1-load-ani.gif", caption: "Denizen, Players Software" },
        {
          src: media_url + "/new/sinclair/screens/load/animated/2274-1-load-ani.gif",
          caption: "Heavy on the Magick, Gargoyle Games",
        },
        { src: media_url + "/new/sinclair/screens/load/animated/2580-1-load-ani.gif", caption: "Jasper!, Micromega" },
        { src: media_url + "/new/sinclair/screens/load/animated/2623-1-load-ani.gif", caption: "Joe Blade II, Players Software" },
        { src: media_url + "/new/sinclair/screens/load/animated/3268-1-load-ani.gif", caption: "Moon Strike, Mirrorsoft Ltd" },
        {
          src: media_url + "/new/sinclair/screens/load/animated/4100-1-load-ani.gif",
          caption: "Rescate Atlantida, Dinamic Software",
        },
        { src: media_url + "/new/sinclair/screens/load/animated/5156-1-load-ani.gif", caption: "Academy, CRL Group PLC" },
        {
          src: media_url + "/new/sinclair/screens/load/animated/5160-1-load-ani.gif",
          caption: "Technician Ted, Hewson Consultants Ltd",
        },
        {
          src: media_url + "/new/sinclair/screens/load/animated/5198-1-load-ani.gif",
          caption: "Terror of the Deep, Mirrorsoft Ltd",
        },
        {
          src: media_url + "/new/sinclair/screens/load/animated/5317-1-load-ani.gif",
          caption: "Tomahawk, Digital Integratiion Ltd",
        },
        {
          src: media_url + "/new/sinclair/screens/load/animated/5525-1-load-ani.gif",
          caption: "Uridium, Hewson Consultants Ltd",
        },
        { src: media_url + "/new/sinclair/screens/load/animated/5795-1-load-ani.gif", caption: "Xevious, US Gold Ltd" },
        { src: media_url + "/new/sinclair/screens/load/animated/14431-1-load-ani.gif", caption: "Vega Solaris, Eclipse" },
      ],
    };
  },
};
</script>
