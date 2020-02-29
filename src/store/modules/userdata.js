const state = {
  userdata: {
    sessionId: null,
    userId: null,
    username: null
  }
}

const getters = {
  getUserData: state => {
    return state.userdata
  }
}

const mutations = {
  setUserData: (state, payload) => {
    state.userdata = payload
  }
}

const actions = {
  setUserData: ({ commit }, payload) => {
    commit('setUserData', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
