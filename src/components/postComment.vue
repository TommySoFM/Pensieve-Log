<template>
  <div class="my-5">
    <div class="d-flex flex-column-reverse" >
      <div class="mx-5 mb-4 d-flex flex-column" v-for="comment in selectedComments">
        <div class="d-flex">
          <div class=" font-weight-bolder"> {{comment.username}} : </div>
          <div class="post-time ml-auto">{{comment.creation_timestamp | moment("from", "now", true)}} ago </div>
        </div>
        <div class="comment-box mr-2 align-self-end" >
          <p class="my-2 ml-4 mr-auto"> {{comment.commentText}} </p>
        </div>
      </div>
    </div>

    <div class="d-flex px-5 mb-n3">
      <p class="mx-auto mb-0" v-show="!isLastPage" @click="loadOption(3)" style="cursor: pointer">Show More</p>
      <div class="border-left" v-show="!isLastPage && commentSelector !== -3"/>
      <p class="mx-auto  mb-0" v-show="commentSelector !== -3" @click="loadOption(-3)" style="cursor: pointer">Show Less</p>
    </div>
    <div class="post-divider col-7 mx-auto my-4"/>

    <div v-if="selectedComments.length === 0">
      <p class="text-center" style="letter-spacing: .3px; word-spacing: 4px; color: rgba(0,70,98,0.5)">
        Drop The First Comment !
      </p>
      <div class="post-divider col-7 mx-auto my-4"/>
    </div>

    <div class="d-flex align-items-center mx-5 my-4">
      <textarea class="comment-form ml-auto" rows="1" max-rows="1"
                v-model="newCommentText" placeholder="Type to Reply"/>
      <input class="comment-button" type="button" value="Submit" @click="newComment">
    </div>

  </div>
</template>
<script>
  import homeMixin from "../mixins/homeMixin";
  import {BIconChevronRight} from 'bootstrap-vue';

  export default {
    data(){
      return{
        commentSelector: -3,
        newCommentText:'',
        isLastPage: false,
        isFirstPage: true
      }
    },
    computed:{
      commentsCount(){
        return this.postData.postComments.length;
      },
      totalPage(){
        return Math.floor(this.commentsCount/3)
      },
      selectedComments(){
        if(this.commentsCount > 3){
          return this.postData.postComments.slice(this.commentSelector);
        } else{
          this.isLastPage = true;
          return this.postData.postComments;
        }
      }
    },
    props:[
      'postData',
      'currentPage'
    ],
    mixins:[
      homeMixin
    ],
    watch:{
      commentSelector(){
        this.isLastPage = this.commentsCount + this.commentSelector <= 0;
      },
      postData(){
        this.isLastPage = this.commentsCount + this.commentSelector <= 0;
      }
    },
    methods:{
      loadOption(val){
        this.commentSelector -= val;
      },
      newComment(){
        if (RegExp('(?=.*?[a-zA-Z0-9]).+').test(this.newCommentText)) {
          this.mixinNewComment(this.postData.id, this.newCommentText, this.currentPage);
        } else {
          this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
            text: "Comment should contain at least one word!"});
          document.getElementById('textarea').focus();
        }
      }
    },
    components:{
      BIconChevronRight
    }
  }
</script>
<style>
  .comment-box{
    width: 95%;
    background: rgba(235, 235, 235, 0.30);
    border: 1px groove rgba(0,70,98,0.5);
    border-radius: 50px;
  }

  /*<-----------------Comment Textarea----------------->*/

  /*Textbox*/
  .comment-form {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    box-shadow: 0 0 0 0.2rem #adb7bf;
    border-radius: 50px 20px 20px 50px;
    resize: none;
  }
  .comment-form:focus{
    outline: 0;
    border-color: white;
    box-shadow: 0 0 0 0.2rem rgba(0, 150, 205, 0.2);
  }
  .comment-form::placeholder{
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(0,70,98,0.5);
  }

  /*Button*/
  .comment-button{
    outline: 0;
    font-weight: 700;
    border: 3px solid #004662;
    color: #004662;
    background-color: #fcfff2 ;
    border-radius: 20px 40px 40px 20px;
    margin-left: 5px;
    transition: all .2s;
    transform: scale(1.08);
    box-shadow: 2px 2px 4px 0px rgba(143, 143, 143, 0.56);
  }
  .comment-button:hover{
    transform: translateY(-2px) scale(1.08);
    box-shadow: 3px 3px 10px 0px rgba(143, 143, 143, 0.56);
  }
  .comment-button:active{
    transform: translateY(1px) scale(1.08);
    box-shadow: 1px 1px 2px 0px rgba(143, 143, 143, 0.56);
  }

</style>
