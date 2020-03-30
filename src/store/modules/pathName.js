const state = {
  currentPathName: '',
  scrollTop: true
}

const getters = {
  getCurrentPathName: (state) => {
    return state.currentPathName
  },
  isFrontPage: (state) => {
    return state.currentPathName === 'front'
  },
  isLoginPage: (state) => {
    return state.currentPathName === 'login'
  },
  isSignupPage: (state) => {
    return state.currentPathName === 'signup'
  },
  isUserPage: (state) => {
    return state.currentPathName === 'user'
  },
  scrollTop: (state) => {
    return state.scrollTop
  }
}

const mutations = {
  setCurrentPathName: (state, payload) => {
    state.currentPathName = payload
  },
  setScrollTop: (state, payload) => {
    state.scrollTop = payload
  }
}

const actions = {
  setCurrentPathName: ({ commit }, payload) => {
    commit('setCurrentPathName', payload)
  },
  setScrollTop: ({ commit }, payload) => {
    commit('setScrollTop', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
