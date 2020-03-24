import Vue from 'vue'
import Vuex from 'vuex'
import userdata from './modules/userdata'
import posts from './modules/post'
import modal from './modules/modal'
import pathName from './modules/pathName'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // serverUrl: 'https://tomiakis.tommyfms.com'
    // serverUrl: 'https://tomiakis.com'
    serverUrl: 'http://localhost:8080'
  },
  getters: {
    getServerUrl: (state) => {
      return state.serverUrl
    }
  },
  modules: {
    userdata,
    posts,
    modal,
    pathName
  }
})
