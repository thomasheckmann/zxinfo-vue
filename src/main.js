import Vue from 'vue'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Vuetify, VueAxios, axios);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
