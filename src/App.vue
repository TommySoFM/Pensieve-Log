<template>
  <div>
    <div class="web-header sticky-top d-flex flex-column flex-sm-row align-items-center px-sm-4 px-3 pt-3 border-bottom shadow">
      <div class="d-flex align-items-center mr-sm-auto">
      <svg class="logo-pic py-0" viewBox="-200 -40 650 650">
        <logo-pic></logo-pic>
      </svg>
      <h3 class="ml-3">Pensieve Log</h3>
      </div>
<!--      <h3 class="mr-sm-auto ml-sm-5">Pensieve Log</h3>-->
      <nav class="nav-indication col-2 mr-5 d-none d-lg-inline-block">
                <h5 class="text-center border-left border-right" v-if="this.isLoginPage">Login</h5>
                <h5 class="text-center border-left border-right" v-if="this.isSignupPage">Sign-up</h5>
      </nav>
      <div class="col-1 d-none d-lg-inline-block"></div>
      <nav class="nav-selection col-12 col-sm-4 d-flex mr-md-4 d-lg-none mb-2 my-sm-0" @click="scrollToBottom">
        <router-link tag="div" to="/login" class="nav-header flex-grow-1 text-center">
          Log-in
        </router-link>
        <div class="border-left"></div>
        <router-link tag="div" to="/signup" class="nav-header flex-grow-1 text-center" @click="scrollToBottom">
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
        'isFrontPage',
        'isLoginPage',
        'isSignupPage'
      ])
  },
  components: {
    logoPic
  },
  methods: {
    scrollToBottom(){
      let container = document.querySelector('html');
      let scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
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
    background-color: white;
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
    border: 3px solid rgba(18, 128, 106, 0.65);
    background-color: rgba(174, 244, 230, 0.50);
    color: #1abc9c;
  }
  .button-reset:hover,
  .button-reset:active{
    border: 3px solid rgba(227, 42, 58, 0.60);
    background-color: rgba(251, 222, 225, 0.5) ;
    color: #eb685a;
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
  }
</style>
