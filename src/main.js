import Vue from "vue";
//import Vuetify from "vuetify";
import Vuetify from "vuetify/lib";

import "vuetify/dist/vuetify.min.css";

import App from "./main.vue";

import router from "./router";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(Vuetify, VueAxios, axios);

Vue.prototype.$api_base_url = "https://api.zxinfo.dk/api/zxinfo";
//Vue.prototype.$api_base_url = "http://localhost:8300/api/zxinfo";
Vue.prototype.$isDevelopment = process.env.NODE_ENV == "development";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
