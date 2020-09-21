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

Vue.prototype.$isDevelopment = process.env.NODE_ENV == "development";

if (Vue.prototype.$isDevelopment) {
  Vue.prototype.$api_base_url = "http://localhost:8300/api/zxinfo";
} else {
  Vue.prototype.$api_base_url = "https://api.zxinfo.dk/api/zxinfo";
}

console.log("##############################################");
console.log("## NODE_ENV: " + process.env.NODE_ENV);
console.log("## $api_base_url: " + Vue.prototype.$api_base_url);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
