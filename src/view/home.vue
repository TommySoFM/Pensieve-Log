<template>
  <div class="container-fluid d-flex">
    <div class="home-panel col-4 mr-auto" style="border-right: 3px solid #777777">
      <h2 class="mt-5 text-center">Hello Banaji</h2>

      <b-form class="col-10 ml-4 my-5">
        <div class="textbox-heading">
          <p class="font-weight-bolder m-0">New Thought:</p>
        </div>
        <b-form-textarea class="textbox p-3" placeholder="Type to Share Your Thought" rows="4" max-rows="6"/>
      </b-form>
      <div class="clearfix text-center font-weight-bolder">
        <span class="button-action">
          <h5 class="button button-confirm float-left col-4 py-2 ml-5">Post</h5>
        </span>
        <span class="button-action">
         <h5 class="button button-reset float-left offset-1 col-4 py-2">Reset</h5>
        </span>
      </div>
      <div class="d-flex align-items-center mt-5 mb-2 ml-5">
        <svg class="col-3 nav-arrow p-0" viewBox="0 -35 230 230">
          <arrow-left/>
        </svg>
        <div>
          <b-dropdown class="col-6" text="Page" v-model="selectedPage" @change="changePage(selectedPage)">
            <b-dropdown-header>Select Page</b-dropdown-header>
            <b-dropdown-divider/>
            <template v-for="page in getTotalPages" >
              <b-dropdown-item :value="page" >{{page}}</b-dropdown-item>
            </template>
          </b-dropdown>
        </div>
        <svg class="col-3 nav-arrow p-0" viewBox="0 -35 230 230">
          <arrow-right/>
        </svg>
      </div>
      <div class="col-8 offset-3 pl-5 font-weight-bolder">
        <h4>Page: 3/4 </h4>
<!--        <p>Page:  {{getCurrentPage + 1}}/{{getTotalPages}} </p>-->
      </div>
    </div>

    <div class="col-8">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import frontMixin from "../mixins/frontMixin";
  import {mapGetters} from "vuex";
  import arrowLeft from "../assets/arrow-left.svg";
  import arrowRight from "../assets/arrow-right.svg";

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
      arrowRight
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
    height: 8vh;
    width: auto;
  }
</style>
