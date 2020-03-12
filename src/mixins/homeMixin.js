import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters([
      'getServerUrl'
    ])
  },
  methods: {
    ...mapActions([
      'setTargetUrl',
      'getPostsByQuery'
    ]),

    mixinGetPosts (targetPage) {
      const targetUrl = this.getServerUrl + '/post?page=' + targetPage
      this.setTargetUrl(targetUrl)
      this.getPostsByQuery()
    },

    mixinNewPost (postText) {
      const vm = this
      const formData = new FormData()
      const targetUrl = this.getServerUrl + '/post'
      formData.append('postText', postText)
      axios.post(targetUrl, formData)
        .then(response => {
          if (response.status === 201) {
            this.$notify({
              group: 'notice-app',
              type: 'success',
              title: 'Success!',
              duration: 1250,
              text: 'Message is successfully posted!'
            })
            vm.$router.push('/post/1')
            this.mixinGetPosts(0)
          } else {
            this.$notify({
              group: 'notice-app',
              type: 'error',
              title: 'Failed!',
              duration: 1250,
              text: 'Message is failed to post!'
            })
          }
        })
    },

    mixinEditPost (postId, postText) {
      const targetUrl = this.getServerUrl + '/post/' + postId
      const formData = new FormData()
      formData.append('postText', postText)
      axios.put(targetUrl, formData)
        .then(response => {
          this.$notify({
            group: 'notice-app',
            type: 'success',
            title: 'Success!',
            duration: 1250,
            text: response.data
          })
          this.mixinGetPosts(this.$route.params.page - 1)
        }).catch(error => {
          this.$notify({
            group: 'notice-app',
            type: 'error',
            title: 'Failed!',
            duration: 3000,
            text: error.response.data
          })
        })
    },
    mixinDeletePost (postId) {
      const targetUrl = this.getServerUrl + '/post/' + postId
      axios.delete(targetUrl)
        .then(response => {
          this.$notify({
            group: 'notice-app',
            type: 'success',
            title: 'Success!',
            duration: 1250,
            text: response.data
          })
          this.mixinGetPosts(this.$route.params.page - 1)
        }).catch(error => {
          this.$notify({
            group: 'notice-app',
            type: 'error',
            title: 'Failed!',
            duration: 3000,
            text: error.response.data
          })
        })
    },

    mixinNewComment (id, commentText) {
      const formData = new FormData()
      const url = this.getServerUrl + '/post/' + id + '/comment'
      formData.append('commentText', commentText)
      axios.post(url, formData)
        .then(response => {
          if (response.status === 202) {
            this.$notify({
              group: 'notice-app',
              type: 'success',
              title: 'Success!',
              duration: 1250,
              text: 'Comment is successfully posted!'
            })
            this.mixinGetPosts(this.$route.params.page - 1)
          } else {
            this.$notify({
              group: 'notice-app',
              type: 'error',
              title: 'Failed!',
              duration: 1250,
              text: 'Comment is failed to post!'
            })
          }
        })
    },

    mixinLogout () {
      const targetUrl = this.getServerUrl + '/logout'
      axios.get(targetUrl)
        .then(response => {
          if (response.status === 200) {
            this.$notify({
              group: 'notice-app',
              type: 'success',
              title: 'Success!',
              duration: 2250,
              text: 'Logout Success! Redirect to Home Page in 3 Seconds...'
            })
            this.$store.dispatch('setUserData', {})
            setTimeout(() => { this.$router.push('/login') }, 3000)
          }
        })
    }
  }
}
