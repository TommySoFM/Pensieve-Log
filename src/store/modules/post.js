import axios from 'axios'

const state = {
  posts: [],
  totalPages: { type: Number, default: 0 },
  currentPage: { type: Number, default: 0 },
  targetUrl: ''
}

const getters = {
  getPosts: (state) => {
    return state.posts
  },
  getTotalPages: (state) => {
    return state.totalPages
  },
  getCurrentPage: (state) => {
    return state.currentPage
  }
}

const mutations = {
  getPostsByQuery: (state) => {
    axios.get(state.targetUrl)
      .then(response => {
        const data = response.data
        const content = data.content
        state.totalPages = parseInt(data.totalPages)
        state.currentPage = parseInt(data.number)

        const posts = []
        for (const key in content) {
          const post = content[key]
          posts.push(post)
        }
        state.posts = posts
      }).catch(error => {
        console.log(error)
      })
  },

  setTargetUrl: (state, payload) => {
    state.targetUrl = payload
  }
}

const actions = {
  getPostsByQuery: ({ commit }) => {
    commit('getPostsByQuery')
  },
  setTargetUrl: ({ commit }, payload) => {
    commit('setTargetUrl', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
