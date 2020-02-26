import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueRouter from "vue-router"
import { routes } from './router/routes'
import store from "./store/store"
import VueMoment from 'vue-moment'
import Notifications from 'vue-notification'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(Notifications);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 216000000;

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
