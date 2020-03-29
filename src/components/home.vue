<template>
  <transition name="panelAnimation">
    <div class="home-panel mr-auto d-flex" v-if="isPanelOpened">
      <div class="col-12" style="background: rgba(241,241,241,0.96); border-right: 8px groove #adb7bf">
        <h2 class="mt-sm-5 mt-4 text-center"> Control Panel </h2>
        <div class="post-divider col-6 mx-auto mt-sm-3 mt-sm-4 mt-2"/>
        <b-form class="col-10 ml-4 my-4">
          <div class="textbox-heading">
            <p class="font-weight-bolder m-0">New Thought:</p>
          </div>
          <b-form-textarea class="textbox p-3" v-model="postText" placeholder="Type to Share" rows="4" max-rows="6"/>
        </b-form>
        <div class="clearfix text-center font-weight-bolder">
          <span class="button-action">
            <h5 class="button button-confirm float-left col-4 py-2 ml-5" @click="newPost">Post</h5>
          </span>
          <span :class="{'button-action': this.postText!=='' }">
           <h5 class="button float-left offset-1 col-4 py-2" :class="[this.postText!=='' ? 'button-reset' : 'button-disabled']" @click="reset">Reset</h5>
          </span>
        </div>
        <div class="d-flex align-items-center mt-sm-5 mt-4 mb-2">
          <svg v-if="isFirstPage" class="col-4 nav-arrow p-0 ml-4" viewBox="0 -35 230 230">
            <arrow-left-disabled/>
          </svg>
          <router-link tag="svg" :to="previous" v-else class="nav-arrow nav-arrow-active col-4 p-0 ml-4" viewBox="0 -35 230 230">
            <arrow-left/>
          </router-link>
          <b-form-select class="page-selector col-2" v-model="selectedPage" @change="changePage(selectedPage)">
            <b-form-select-option :value="null" disabled>Page</b-form-select-option>
            <option v-for="page in getTotalPages" :key="page" :value="page">{{page}}</option>
          </b-form-select>
          <svg v-if="isLastPage" class="nav-arrow col-4 p-0" viewBox="0 -35 230 230">
           <arrow-right-disabled/>
          </svg>
          <router-link tag="svg" :to="next" v-else class="nav-arrow nav-arrow-active col-4 p-0" viewBox="0 -35 230 230">
            <arrow-right/>
          </router-link>
        </div>
        <div class="col-8 offset-2 pl-5 font-weight-bolder">
          <h4>Page: {{getCurrentPage + 1}}/{{getTotalPages}} </h4>
        </div>
        <div class="panel-off-button" @click="panelOff">
          <BIconXCircleFill/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import homeMixin from '../mixins/homeMixin'
import { mapGetters } from 'vuex'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'
import arrowLeftDisabled from '../assets/arrow-left-disabled.svg'
import arrowRightDisabled from '../assets/arrow-right-disabled.svg'
import { BIconXCircleFill } from 'bootstrap-vue'

export default {
  data: function () {
    return {
      postText: '',
      currentTime: new Date(),
      selectedPage: this.$route.params.page
    }
  },
  props: [
    'isPanelOpened',
    'panelOff'
  ],
  computed: {
    ...mapGetters([
      'getUserData',
      'getTotalPages',
      'getCurrentPage',
      'next',
      'previous',
      'isFirstPage',
      'isLastPage'
    ])
  },
  mixins: [
    homeMixin
  ],
  components: {
    arrowLeft,
    arrowRight,
    arrowLeftDisabled,
    arrowRightDisabled,
    BIconXCircleFill
  },
  watch: {
    $route (to, from) {
      this.selectedPage = this.$route.params.page
    }
  },
  methods: {
    newPost () {
      if (RegExp('(?=.*?[a-zA-Z0-9\\W]).+').test(this.postText)) {
        this.mixinNewPost(this.postText)
        this.postText = ''
      } else {
        this.$notify({
          group: 'notice-app',
          type: 'error',
          title: 'Failed!',
          duration: 3000,
          text: 'Post should contain at least one word!'
        })
        this.postText = ''
      }
    },
    changePage (page) {
      this.$router.push('/post/' + page)
    },
    reset () {
      this.postText = ''
    }
  }
}
</script>
<style scoped>
  .home-panel{
    height: 100vh;
    width: 400px;
    position: fixed;
    left: 0;
    z-index: 2;
  }
  .textbox-heading{
    margin-top: 30px;
    margin-bottom: 0;
    padding: 10px 20px;
    border-radius: 20px 20px 2px 2px;
    background-color: rgba(0, 70, 98, 0.21);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
  .textbox{
    background-color: #f9f9f9;
    border-color: #fcfff2 ;
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
  .textbox:focus{
    background-color: white;
    border-color: white;
    box-shadow: 0px 3px 10px rgba(107, 107, 107, 0.2);
    -webkit-box-shadow: 0px 3px 10px rgba(107, 107, 107, 0.2);
  }
  .nav-arrow{
    height: 11vh;
    width: auto;
  }
  .nav-arrow{
    transition: transform .1s ease;
  }
  .nav-arrow-active:hover{
    transform: translateY(-3.5px);
    transition: transform .1s ease;
  }
  .nav-arrow-active:active{
    transform: translateY(-0.5px);
  }
  .page-selector{
    font-size: 1.3rem;
    font-weight: 600;
    background-color: #fcfff2;
    border: 4px solid #004662;
    border-radius: .5rem;
    vertical-align: center;
    padding-right: 10px;
  }
  .page-selector:focus{
    border: 4px solid #004662;
    box-shadow: 0 0 0 0.2rem #fcfff2;
  }
  .button-reset,
  .button-confirm{
    background-color: white;
  }
  .panel-off-button{
    position: absolute;
    top: 4%;
    right: 30px;
    transform: scale(2);
    color: rgba(99,122,129,100);
  }
  .panelAnimation-enter-active{
    animation: panelIn .3s ease-out;
  }
  .panelAnimation-leave-active{
    animation: panelOut .3s ease-in;
  }
  @keyframes panelIn {
    0% {transform: translateX(-300px); opacity: 0}
    50% {transform: translateX(-100px); opacity: 70}
    100% {transform: translateX(0px); opacity: 100}
  }
  @keyframes panelOut {
    0% {transform: translateX(0px); opacity: 100}
    50% {transform: translateX(-100px); opacity: 30}
    100% {transform: translateX(-300px); opacity: 0}
  }
</style>
