<template>
  <div class="container-fluid d-flex">
    <div class="home-panel col-4 mr-auto" style="border-right: 3px solid #777777;
    background-image: linear-gradient(to left , rgba(175,175,175,0.16), #fff)">
      <h2 class="mt-5 text-center">Hello {{ getUserData.username }} </h2>

      <b-form class="col-10 ml-4 my-5">
        <div class="textbox-heading">
          <p class="font-weight-bolder m-0">New Thought:</p>
        </div>
        <b-form-textarea class="textbox p-3" v-model="postText" placeholder="Type to Share Your Thought" rows="4" max-rows="6"/>
      </b-form>
      <div class="clearfix text-center font-weight-bolder">
        <span class="button-action">
          <h5 class="button button-confirm float-left col-4 py-2 ml-5" @click="newPost">Post</h5>
        </span>
        <span :class="{'button-action': this.postText!=='' }">
         <h5 class="button float-left offset-1 col-4 py-2" :class="[this.postText!=='' ? 'button-reset' : 'button-disabled']" @click="reset">Reset</h5>
        </span>
      </div>
      <div class="d-flex align-items-center mt-5 mb-2">
        <svg v-if="isFirstPage" class="col-4 nav-arrow p-0 ml-4" viewBox="0 -35 230 230">
          <arrow-left-disabled/>
        </svg>
        <router-link tag="svg" :to="previous" v-else class="nav-arrow nav-arrow-active col-4 p-0 ml-4" viewBox="0 -35 230 230">
          <arrow-left/>
        </router-link>
        <b-form-select class="page-selector col-2" v-model="selectedPage" @change="changePage(selectedPage)">
          <b-form-select-option :value="null" disabled>Page</b-form-select-option>
          <template v-for="page in getTotalPages" >
            <option :value="page">{{page}}</option>
          </template>
        </b-form-select>
        <svg v-if="isLastPage" class="nav-arrow col-4 p-0" viewBox="0 -35 230 230">
         <arrow-right-disabled/>
        </svg>
        <router-link tag="svg" :to="next" v-else class="nav-arrow nav-arrow-active col-4 p-0" viewBox="0 -35 230 230">
          <arrow-right/>
        </router-link>
      </div>
      <div class="col-8 offset-3 pl-5 font-weight-bolder">
        <h4>Page: {{getCurrentPage + 1}}/{{getTotalPages}} </h4>
      </div>
    </div>

    <div class="col-8">
      <router-view/>
    </div>

    <!--Pop-up Notice-->
    <notifications group="notice-app"
                   :width="500"
                   animation-name="v-fade-left"
                   position="center left">
      <template slot="body" slot-scope="props">
        <div class="custom-template"
             :class="{ 'notice-error-container' : props.item.type === 'error'}">
          <div class="custom-template-icon"
               :class="{ 'notice-error-icon' : props.item.type === 'error'}">
            <b-icon-check-circle v-if="props.item.type === 'success'"/>
            <b-icon-alert-triangle v-if="props.item.type === 'error'"/>
          </div>
          <div class="custom-template-content">
            <div class="custom-template-title"
                 :class="{ 'notice-error-title' : props.item.type === 'error'}">
              {{props.item.title}}
            </div>

            <div class="custom-template-text">
              {{props.item.text}}
            </div>
          </div>
          <div class="custom-template-close"> </div>
        </div>
      </template>
    </notifications>
  </div>
</template>
<script>
  import frontMixin from "../mixins/frontMixin";
  import {mapGetters} from "vuex";
  import arrowLeft from "../assets/arrow-left.svg";
  import arrowRight from "../assets/arrow-right.svg";
  import arrowLeftDisabled from "../assets/arrow-left-disabled.svg"
  import arrowRightDisabled from "../assets/arrow-right-disabled.svg"

  export default{
    data: function () {
      return {
        postText: '',
        currentTime: new Date(),
        selectedPage:this.$route.params.page
      }
    },
    computed: {
      ...mapGetters([
        "getUserData",
        "getTotalPages",
        "getCurrentPage",
        "getRandomId"
      ]),
      next() {
        let targetPage = '/home/post/' + (this.getCurrentPage + 2).toString();
        return targetPage;
      },
      previous() {
        let targetPage = '/home/post/' + (this.getCurrentPage).toString();
        return targetPage;
      },
      isFirstPage(){
        return this.getCurrentPage == 0;
      },
      isLastPage(){
        return this.getCurrentPage + 1 === this.getTotalPages;
      }
    },
    mixins:[
      frontMixin
    ],
    components: {
      arrowLeft,
      arrowRight,
      arrowLeftDisabled,
      arrowRightDisabled
    },
    watch: {
      $route(to,from){
        this.selectedPage = this.$route.params.page;
      }
    },
    methods: {
      newPost() {
        if (this.postText.match('(?=.*?[a-zA-Z0-9\\W]).{1,}')) {
          this.mixinNewPost(this.postText);
        } else {
          this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
            text: 'Post should contain at least one word!'});
        }
      },
      changePage(page){
        this.$router.push('/home/post/'+page)
      },
      reset(){
        this.postText = '';
      }
    }
  }
</script>
<style>
  .home-panel{
    height: 90vh;
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
    background-color: rgba(252, 255, 242, 0.2);
    border-color: #fcfff2 ;
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
  .textbox:focus{
    background-color: rgba(252, 255, 242, 0.2);
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
  }
  .page-selector:focus{
    border: 4px solid #004662;
    box-shadow: 0 0 0 0.2rem #fcfff2;
  }
</style>
