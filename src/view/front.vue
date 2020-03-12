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
    <!--Pop-up Notice-->
    <notifications group="notice-app"
                   :width="500"
                   animation-name="v-fade-left"
                   position="center left">
      <template slot="body" slot-scope="props">
        <div class="custom-container"
             :class="[ props.item.type === 'error' ? 'notice-error-container' : 'notice-success-container' ]">
          <div class="custom-icon"
               :class="[ props.item.type === 'error' ? 'notice-error-icon' : 'notice-success-icon' ]">
            <b-icon-check-circle v-if="props.item.type === 'success'"/>
            <b-icon-alert-triangle v-if="props.item.type === 'error'"/>
          </div>
          <div class="custom-template-content">
            <div :class="[ props.item.type === 'error' ? 'notice-error-title' : 'notice-success-title' ]">
              {{props.item.title}}
            </div>
            <div class="custom-template-text">
              {{props.item.text}}
            </div>
          </div>
        </div>
      </template>
    </notifications>
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
