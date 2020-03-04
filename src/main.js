import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import sweetalert2 from './plugins/vue-sweetalert2';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  sweetalert2,
  render: h => h(App)
}).$mount('#app')
