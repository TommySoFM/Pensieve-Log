<template>
  <div class="col-8 col-lg-4 col-xl-3 mx-auto mx-lg-0 form-border">
    <b-form class="form-login">
      <div class="oauth-container" @click="oauthLogin('github')">
        <div class="oauth-button">
          <svg class="oauth-icon" viewBox="-10 -10 320 320"><github-icon/></svg>
        </div>
        <h5 class="ml-2 mt-2">Login with Github</h5>
      </div>
      <div class="oauth-container" @click="oauthLogin('google')">
        <div class="oauth-button">
          <svg class="oauth-icon" viewBox="-12 -12 310 310"><google-icon/></svg>
        </div>
        <h5 class="ml-2 mt-2">Login with Google</h5>
      </div>
      <div class="col-12 d-flex align-items-center my-4 px-2">
        <span style="border: 2px solid #dcdcdc; width: 50%"></span>
        <span class="mx-3" style="color: #c3c3c3">OR</span>
        <span style="border: 2px solid #dcdcdc; width: 50%"></span>
      </div>
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
import facebookIcon from '../assets/facebook.svg'
import githubIcon from '../assets/github.svg'
import googleIcon from '../assets/google.svg'
export default {
  data () {
    return {
      username: '',
      password: '',
      windowObjectReference: null,
      previousUrl: null,
      oauthStatus: null
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
  components: {
    // eslint-disable-next-line vue/no-unused-components
    facebookIcon,
    githubIcon,
    googleIcon
  },
  watch: {
    oauthStatus () {
      if (this.oauthStatus === 'Login Success') {
        this.$router.push('/post/1')
        window.scrollTo(0, 0)
      }
    }
  },
  methods: {
    login () {
      this.mixinLogin(this.username, this.password)
    },
    reset () {
      this.username = ''
      this.password = ''
    },
    openSigninWindow (url, name) {
      const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100'
      if (this.windowObjectReference == null || this.windowObjectReference.closed) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures)
      } else if (this.previousUrl !== url) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures)
        this.windowObjectReference.focus()
      } else {
        this.windowObjectReference.focus()
      }
      window.addEventListener('message', event => this.receiveMessage(event), false)
      this.previousUrl = url
    },
    oauthLogin (platform) {
      const targetUrl = this.getServerUrl + '/oauth2/authorization/' + platform
      this.openSigninWindow(targetUrl, 'OAuthLoginPage')
    },
    receiveMessage (event) {
      this.oauthStatus = event.data
    }
  }
}
</script>
<style>
  .oauth-container{
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    border: 2px solid #e6e6dd;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }
  .oauth-container:hover,
  .oauth-container:active{
    border: 3px solid #004662;
    background-color: #f7f7ee;
    color: #004662;
  }
  .oauth-button{
    width: 60px;
    margin-left: 8px;
  }
  .oauth-icon{
    height: 50px;
    width: 50px;
  }
</style>
