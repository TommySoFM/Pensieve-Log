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

router.beforeEach((to, from, next) => {
  if (to.path === '/' ||to.path === '/login' || to.path === '/signup'){
    next();
  } else {
    let targetUrl = store.getters.getServerUrl + '/isSessionValid';

    axios.get(targetUrl)
      .then(response => {
        if (response.status === 202) {
          store.dispatch('setUserData',response.data);
          next();
        }
      }).catch(error => {
      console.log(error);
      if (error.response.status === 401) {
        window.alert("Please Login");
        next("/")
      }
    })
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
