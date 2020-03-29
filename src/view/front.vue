<template>
  <div class="container-fluid d-flex flex-lg-row flex-column border-bottom-3">
    <div class="col-lg-8 my-3">
      <div class="col-lg-12 my-4 d-flex flex-column mx-3">
        <h1 class="line-top display-3 font-weight-bolder">Thought?</h1>
        <h3 class="line-bottom mr-xl-5 display-4 text-right">Share with everyone!</h3>
      </div>
      <svg class="col-lg-10 align-self-end ml-md-5" viewBox="100 20 1150 900"  preserveAspectRatio="xMidYMid meet">
        <main-pic class="main-pic"/>
      </svg>
    </div>
    <div class="button-action col-3 d-none d-lg-block text-center my-auto" v-if="this.isFrontPage">
      <router-link tag="h3" to="/login" class="button button-login py-4 my-5" data-e2e="login-button">Log-in</router-link>
      <router-link tag="h3" to="/signup" class="button button-signup py-4 " data-e2e="signup-button">Sign-up</router-link>
    </div>
    <template v-if="this.isLoginPage || this.isSignupPage">
      <router-view/>
    </template>
  </div>
</template>
<script>
import mainPic from '../assets/main-pic.svg'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isFrontPage',
      'isLoginPage',
      'isSignupPage'
    ])
  },
  components: {
    mainPic
  }
}
</script>
