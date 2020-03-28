import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters([
      'getServerUrl'
    ])
  },
  methods: {
    mixinLogin (username, password) {
      const targetUrl = this.getServerUrl + '/authenticateUser'
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      axios.post(targetUrl, formData)
        .then(response => {
          if (response.status === 200) {
            this.$router.push('/post/1')
          }
          // eslint-disable-next-line handle-callback-err
        }).catch(error => {
          this.password = ''
          this.$notify({
            group: 'notice-app',
            type: 'error',
            title: 'Failed!',
            duration: 3000,
            text: 'Incorrect Password! Please try again!'
          })
        })
    },
    mixinAddUser (username, password) {
      const targetUrl = this.getServerUrl + '/user/add'
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      axios.post(targetUrl, formData)
        .then(resource => {
          this.$notify({
            group: 'notice-app',
            type: 'success',
            title: 'Success!',
            duration: 2250,
            text: 'Redirect to Login Page in 3 Second...'
          })
          setTimeout(() => { this.$router.push('/login') }, 3000)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$notify({
            group: 'notice-app',
            type: 'error',
            title: 'Failed!',
            duration: 3000,
            text: 'Error in creating new user.'
          })
        })
    },
    mixinIsNameAvailable (username) {
      const targetUrl = this.getServerUrl + '/user/isNameUsed'
      const formData = new FormData()
      formData.append('username', username)
      axios.post(targetUrl, formData)
        .then(response => {
          return !response.data
        })
    }
  }
}
