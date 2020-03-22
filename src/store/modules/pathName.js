const state = {
  currentPathName: ''
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
  }
}

const mutations = {
  setCurrentPathName: (state, payload) => {
    state.currentPathName = payload
  }
}

const actions = {
  setCurrentPathName: ({ commit }, payload) => {
    commit('setCurrentPathName', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
