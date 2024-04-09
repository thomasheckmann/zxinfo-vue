import Vue from "vue";
import "vuetify/dist/vuetify.min.css";

import App from "./main.vue";

import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.prototype.$isDevelopment = process.env.NODE_ENV == "development";

if (Vue.prototype.$isDevelopment) {
  Vue.prototype.$api_base_url = "http://localhost:8300/v4";
} else {
  Vue.prototype.$api_base_url = "https://api.zxinfo.dk/v4";
  Vue.prototype.$api_base_url3 = "https://api.zxinfo.dk/v3";
}

console.log("##############################################");
console.log("## NODE_ENV: " + process.env.NODE_ENV);
console.log("## $api_base_url: " + Vue.prototype.$api_base_url);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
