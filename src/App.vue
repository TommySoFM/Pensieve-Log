<template>
  <div>
    <div class="web-header sticky-top d-flex flex-column flex-sm-row align-items-center px-sm-4 px-3 pt-3 border-bottom shadow">
      <div class="d-flex align-items-center mr-sm-auto">
      <svg class="logo-pic py-0" viewBox="-200 -40 650 650">
        <logo-pic/>
      </svg>
      <h3 class="ml-3">Pensieve Log</h3>
      </div>
      <nav class="nav-indication col-2 mr-5 d-none d-lg-inline-block">
        <router-link tag="h5" to="/" class="text-center border-left border-right" style="cursor: pointer" v-if="this.isLoginPage">Login</router-link>
        <router-link tag="h5" to="/" class="text-center border-left border-right" style="cursor: pointer" v-if="this.isSignupPage">Sign-up</router-link>
        <router-link tag="h5" to="/" class="text-center border-left border-right" style="cursor: pointer" v-if="this.isHomePage">Logout</router-link>
      </nav>
      <div class="col-1 d-none d-lg-inline-block"></div>
      <nav class="nav-selection col-12 col-sm-4 d-flex mr-md-4 d-lg-none mb-2 my-sm-0" @click="scrollToBottom">
        <router-link tag="div" to="/home" class="nav-header flex-grow-1 text-center" v-if="!isHomePage">
          Home
        </router-link>
        <div class="border-left"></div>
        <router-link tag="div" to="/" class="nav-header flex-grow-1 text-center" v-if="isHomePage">
          Logout
        </router-link>
        <router-link tag="div" to="/login" class="nav-header flex-grow-1 text-center" v-if="isFrontPage || isLoginPage || isSignupPage">
          Log-in
        </router-link>
        <div class="border-left"></div>
        <router-link tag="div" to="/signup" class="nav-header flex-grow-1 text-center" v-if="isFrontPage || isLoginPage || isSignupPage">
          Sign-up
        </router-link>
      </nav>
    </div>
    <div class="web-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { BIconAlertTriangle, BIconCheckCircle } from 'bootstrap-vue';
  import frontMixin from "./mixins/frontMixin";
  import logoPic from './assets/logo-pic.svg'
  import {mapGetters} from "vuex";

export default {
  data(){
    return{
      currentPage: this.$route.path
    }
  },
  computed:{
      ...mapGetters([
        'getCurrentPathName',
        'isFrontPage',
        'isLoginPage',
        'isSignupPage',
        'isHomePage'
      ])
  },
  mixins:[
    frontMixin
  ],
  components: {
    logoPic,
    BIconAlertTriangle,
    BIconCheckCircle,
  },
  created() {
    this.$store.dispatch('setCurrentPathName', this.$route.name)
  },
  watch: {
    $route(to, from){
      this.$store.dispatch('setCurrentPathName', this.$route.name)
    }
  },
  methods: {
    scrollToBottom(){
      let container = document.querySelector('html');
      let scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    logout() {
      this.mixinLogout();
    }
  }
}
</script>
<style>
  * {
    border: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }
  .web-header{
    background-color: rgba(255, 255, 255, 0.95);
    background-image: linear-gradient(to right , rgba(138, 126, 112, 0.12), #fff);
  }
  .logo-pic{
    height: 8vh;
  }
  .form-login{
    height: 90vh;
    padding-top: 30vh;
  }
  .form-signup{
    height: 90vh;
    padding-top: 25vh;
  }
  .button {
    font-weight: 700;
    cursor: pointer;
    border-radius: 100px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    transition: color 1s ease, background-color .5s ease;
  }
  .button-login:hover,
  .button-login:active,
  .button-signup:hover,
  .button-signup:active {
    border: 6px solid #004662;
    background-color: #fcfff2;
    color: #004662;
  }
  .button-confirm:hover,
  .button-confirm:active{
    border: 3px solid #004662;
    background-color: #fcfff2;
    color: #004662;
  }
  .button-reset:hover,
  .button-reset:active{
    border: 3px solid #E32A3A;
    background-color: rgba(251, 222, 225, 0.5) ;
    color: #E32A3A;
  }
  .button-disabled{
    color: rgba(119, 119, 119, 0.6);
    cursor: default;
  }
  .button-action :hover{
    transition: all .2s;
    transform: translateY(-3px);
  }
  .button-action :active{
    transition: all .1s;
    transform: translateY(-1px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }

  .nav-header{
    cursor: pointer;
  }
  .nav-header::after{
    display: block;
    content: '';
    padding-bottom: 4px;
    border-bottom: 2px solid #004662;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  .nav-header:hover::after {
    transform: scaleX(0.6);
  }
  .page-redir{
    cursor: pointer;
    font-weight: 500;
    font-size: 110%;
    color: #004662;
    border-bottom: 3px solid #004662;
  }
  .page-redir:hover{
    color: rgba(0, 70, 98, 0.67);
    border-bottom: 3px solid rgba(0, 70, 98, 0.67);
  }

  /* Apply to xs-size */
  @media screen and (max-width: 768px){
    .line-top{
      font-size: 3.5rem;
    }
    .line-bottom{
      font-size: 2.5rem;
    }
  }
  /* Apply to md-size or below */
  @media screen and (max-width: 992px){
    .form-login{
      height: 90vh;
      padding-top: 20vh;
    }
    .form-signup{
      height: 90vh;
      padding-top: 15vh;
    }
    .form-bg-color{
      border-top: 3px groove #004662;
      background-image: linear-gradient(to top, rgba(138, 126, 112, 0.12), #fafafa);
    }
  }

  /* Notification Style */
  .custom-template {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;
    height: 8vh;
    margin: 10px 5px 0px 5px;
    align-items: center;
    background: #E8F9F0;
    border: 2px solid #1abc9c;
  }

  .notice-error-container {
    background: #fad7d3;
    border: 2px solid #e74c3c;
  }

  .custom-template,
  .custom-template > div {
    box-sizing: border-box;
    border-radius: 20px;
  }
  .custom-template-icon {
    flex: 0 1 10%;
    color: #15C371;
    font-size: 45px;
    font-weight: 600;
    padding: 0 10px !important;
  }
  .notice-error-icon {
    color: #f29f97;
  }
  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
  }
  .custom-template-close:hover {
    opacity: 0.8;
  }
  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
  }
  .custom-template-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #90f0dd;
    letter-spacing: +2.3px;
    text-shadow: +2.3px 0 #1abc9c, -2.3px 0 #1abc9c, 0 +2.3px #1abc9c, 0 -2.3px #1abc9c;
  }
  .notice-error-title{
    color: rgba(251, 222, 225, 0.62);
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: +2.3px;
    text-shadow: +2px 0 #e32a3a, -2px 0 #e32a3a, 0 +2px #e32a3a, 0 -2px #e32a3a;
  }
  .custom-template-text {
    font-size: 0.95rem;
    font-weight: 400;
    letter-spacing: +0.5px;
  }

  .v-fade-left-enter-active,
  .v-fade-left-leave-active,
  .v-fade-left-move {
    transition: all .5s;
  }
  .v-fade-left-enter,
  .v-fade-left-leave-to {
    opacity: 0;
    transform: translateX(-500px) scale(0.2);
  }
</style>
