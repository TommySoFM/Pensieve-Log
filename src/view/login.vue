<template>
  <div class="col-8 col-lg-4 col-xl-3 mx-auto mx-lg-0 form-border">
    <b-form class="form-login">
      <div class="mb-4">
        <b-form-group label="Username">
          <b-input name="username" v-model="username" required/>
        </b-form-group>
      </div>
      <div class="mb-5">
        <b-form-group label="Password">
          <b-input type="password" name="password" v-model="password" required @keyup.enter="login"/>
        </b-form-group>
      </div>
      <div class="clearfix text-center font-weight-bolder mb-5">
        <span class="button-action">
          <h5 class="button button-confirm float-left col-5 py-2 ml-3" @click="login">Enter</h5>
        </span>
        <span :class="{'button-action': !isAllEmpty }">
         <h5 class="button float-left offset-1 col-5 py-2"
             :class=" [ isAllEmpty ? 'button-disabled' : 'button-reset' ] "
             :disabled="isAllEmpty" @click="reset">Reset</h5>
        </span>
      </div>
      <p>
        *Not registered?
        <router-link class="page-redir" tag="span" to="/signup">
          Click Here!
        </router-link>
      </p>
    </b-form>
  </div>
</template>
<script>
import frontMixin from '../mixins/frontMixin'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    // To inactivate buttons when blank
    isAllEmpty () {
      return (this.username === '' && this.password === '')
    },
    ...mapGetters([
      'getServerUrl',
      'getUserData'
    ])
  },
  mixins: [
    frontMixin
  ],
  methods: {
    login () {
      this.mixinLogin(this.username, this.password)
    },
    reset () {
      this.username = ''
      this.password = ''
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log(this.getUserData.sessionId)
  //   if (this.getUserData.sessionId !== null) {
  //     this.$notify({
  //       group: 'notice-app',
  //       type: 'error',
  //       title: 'Failed!',
  //       duration: 3000,
  //       text: 'You have already logged in!'
  //     })
  //     this.$route.go(-1)
  //   }
  // }
}
</script>
