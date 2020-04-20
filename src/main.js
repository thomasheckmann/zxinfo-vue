import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./main.vue";

import router from "./router";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(Vuetify, VueAxios, axios);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
