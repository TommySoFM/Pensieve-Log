<template>
  <div class="d-flex flex-wrap justify-content-around align-items-start mx-5" @click.self="panelOff">
    <div class="col-12">
      <home :isPanelOpened="isPanelOpened" :panelOff="panelOff"/>
    </div>
    <div class="panel-on-button mt-5 mt-sm-0" @click="panelOn">
      <BIconList :class="{'icon-upshift': !scrollTop}"/>
    </div>
    <router-link tag="div" class="page-chevron-left" :to="previous" v-if="isLastPage">
      <BIconChevronLeft v-if="!hoverToPrevious" @mouseenter="hoverToPrevious=true"/>
      <div class="page-index-left" v-if="hoverToPrevious" @mouseleave="hoverToPrevious=false"> Page {{ getCurrentPage }}</div>
    </router-link>
    <router-link tag="div" class="page-chevron-right" :to="next" v-if="isFirstPage">
      <BIconChevronRight v-if="!hoverToNext" @mouseenter="hoverToNext=true"/>
      <div class="page-index-right" v-if="hoverToNext" @mouseleave="hoverToNext=false"> Page {{ getCurrentPage+2 }}</div>
    </router-link>
    <div class="my-4 post-container ml-md-4" v-for="post in getPosts" :key="post.id" @click="panelOff">
      <div class="post-header d-flex">
        <p class="ml-3 mr-1 mb-0">
          <span>#</span>
          {{post.id}}
        </p>
        <h4 class="ml-1 mr-auto">{{post.username}}</h4>

        <div class="post-ctrl-icons mr-5" v-if="getUserData.username === post.username">
          <BIconCheckCircle class="icon-check" v-if="editPostId === post.id" @click="openModal(post.id, 'edit')"/>
          <BIconTerminalFill class="icon-terminal" v-else @click="clickEdit(post.id,post.postText)" />
          <BIconXCircle class="icon-x ml-2" v-if="editPostId === post.id" @click="editPostId=0"/>
          <BIconXCircleFill class="icon-xcirclefill ml-2" v-else @click="openModal(post.id, 'delete')" />
        </div>
      </div>
      <div class="post-divider col-9 mx-auto"/>
      <div class="post-time d-flex justify-content-end">
        <p class="mr-5 mb-2">{{ post.creationTimestamp | moment("from", "now", true)}} ago</p>
      </div>

      <div class="post-body post-body-edit mx-3" v-if="editPostId === post.id">
        <b-form-textarea class="pl-3" rows="3" max-rows="5" v-model="editPostText"/>
      </div>
      <div class="post-body post-body-display mx-3" v-else>
        <b-form-textarea class="pl-3" ows="3" max-rows="5" plaintext :value="post.postText"/>
      </div>
      <div class="post-divider col-10 mx-auto my-3"/>

      <div class="d-flex">
        <div class="post-like-button flex-grow-1 text-center ml-sm-5 ml-3">
          <post-like :postData="post"/>
        </div>
        <div style="border-right: 2px solid rgba(158,158,158,0.4)"/>
        <div class="post-comment-button flex-grow-1 text-center mr-sm-5 mr-3">
          <p class="mx-auto my-1 font-weight-bolder">{{post.postComments.length}} Comment<span v-if="post.postComments.length>1">s</span></p>
        </div>
      </div>
      <post-comment :postData="post" :currentPage="currentPage"/>
    </div>
    <delete-confirm class="col-12" :modal-message="'You are going to delete this post'" :modal-action="deletePost"/>
    <edit-confirm class="col-12" :modal-message="'You are going to make change to the post'" :modal-action="editPost"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import homeMixin from '../mixins/homeMixin'
import home from '../components/home'

import postLike from '../components/postLike'
import postComment from '../components/postComment'
import editModal from '../components/modal/editModal'
import deleteModal from '../components/modal/deleteModal'

import {
  BIconXCircleFill, BIconTerminalFill,
  BIconXCircle, BIconCheckCircle,
  BIconChevronLeft, BIconChevronRight,
  BIconList
} from 'bootstrap-vue'

export default {
  data () {
    return {
      currentPage: this.$route.params.page,
      editPostId: 0,
      editPostText: '',
      isPanelOpened: false,
      hoverToPrevious: false,
      hoverToNext: false
    }
  },
  computed: {
    ...mapGetters([
      'getUserData',
      'getPosts',
      'getCurrentPage',
      'getTotalPages',
      'next',
      'previous',
      'isFirstPage',
      'isLastPage',
      'scrollTop'
    ])
  },
  mixins: [
    homeMixin
  ],
  created () {
    this.mixinGetPosts(this.currentPage - 1)
  },
  watch: {
    $route (to, from) {
      this.mixinGetPosts(to.params.page - 1)
    }
  },
  methods: {
    editPost (id) {
      this.mixinEditPost(id, this.editPostText)
      this.editPostId = 0
    },
    deletePost (id) {
      this.mixinDeletePost(id)
    },
    clickEdit (postId, postText) {
      this.editPostId = postId
      this.editPostText = postText
    },
    openModal (id, mode) {
      this.$store.dispatch('setModal', { id: id, mode: mode })
      this.$store.dispatch('modalOn')
    },
    panelOn () {
      this.isPanelOpened = true
    },
    panelOff () {
      this.isPanelOpened = false
    }
  },
  components: {
    home: home,
    postLike: postLike,
    postComment: postComment,
    deleteConfirm: deleteModal,
    editConfirm: editModal,
    BIconXCircleFill,
    BIconTerminalFill,
    BIconXCircle,
    BIconCheckCircle,
    BIconChevronLeft,
    BIconChevronRight,
    BIconList
  }
}
</script>
<style>
  .post-container{
    width: 350px;
    border-radius: 50px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    padding-top: 30px;
    padding-bottom: 10px;
  }
  .post-divider{
    border-bottom: 2px solid rgba(158,158,158,0.4)
  }
  .post-header>span{
    font-size: 1.1em
  }
  .post-header>p{
    font-size: 80%;
    font-weight: 600;
    letter-spacing: -1px;
    color: rgba(0,70,98,0.73);
    transform: translateY(-5px)
  }

  .post-time{
    font-size: 80%;
    font-weight: 600;
    color: rgba(0,70,98,0.5);
  }

  .post-ctrl-icons {
    font-size: 1.3rem;
  }

  .icon-terminal:hover{
    transition: all .2s;
    transform: scale(1.5);
    color: #6184a8;
  }
  .icon-xcirclefill:hover{
    transition: all .2s;
    transform: scale(1.5);
    color: rgba(231, 76, 60, 0.88);
  }

  .icon-check{
    transform: scale(1.4);
    color: #88f900;
  }
  .icon-x{
    transform: scale(1.4);
    color: #dc0ebc;
  }

  .icon-check:hover,
  .icon-x:hover{
    transition: all .2s;
    transform: scale(1.5);
  }

  .icon-terminal:active,
  .icon-xcirclefill:active,
  .icon-check:active,
  .icon-x:active{
    transform: translateY(-1px);
    transition: all .2s;
  }

  .post-body {
    padding: 3px 20px;
    border-width: 0px 5px;
    border-style: solid;
    border-color: #adb7bf;
    border-radius: 10px ;
  }
  .post-body>textarea{
    font-size: 120% ;
    border-radius: 10px;
    background: rgba(235, 235, 235, 0.30);
  }
  .post-body>textarea:focus{
    outline: 0;
    box-shadow: none;
  }

  .post-body-edit{
    border-radius: 10px;
    box-shadow: 0 0 20px 5px rgba(192, 202, 210, 0.36);
  }
  .post-body-edit>textarea{
    border: white;
    box-shadow: none;
    padding: 6px 0;
    background: white;
  }
  .post-like-button{
    height: 30px;
    border-radius: 4px;
    border-left: 2px solid #adb7bf;
    cursor: pointer;
  }
  .post-comment-button{
    height: 30px;
    border-radius: 4px;
    border-right: 2px solid #adb7bf;
  }
  .panel-on-button{
    position: fixed;
    top: 18vh;
    left: 30px;
    transform: scale(3);
    cursor: pointer;
  }
  .page-chevron-left{
    position: fixed;
    top: 50vh;
    left: 20px;
    transform: scale(2.5);
    cursor: pointer;
    color: rgba(99,122,129,100);
  }
  .page-index-left{
    font-size: 50%;
    padding: 5px 10px;
    background-image: linear-gradient(to left, rgba(235, 235, 235, 0.36), white);
    animation: slideInLeft 0.2s ease-in ;
  }
  .page-chevron-right{
    position: fixed;
    top: 50vh;
    right: 20px;
    transform: scale(2.5);
    cursor: pointer;
    color: rgba(99,122,129,100);
  }
  .page-index-right{
    font-size: 50%;
    padding: 5px 10px;
    background-image: linear-gradient(to left, rgba(235, 235, 235, 0.36), white);
    animation: slideInRight 0.2s ease-in ;
  }
  @keyframes slideInLeft {
    0% {transform: translateX(-20px)}
    100% {transform: translateX(0px)}
  }
  @keyframes slideInRight {
    0% {transform: translateX(+20px)}
    100% {transform: translateX(0px)}
  }
</style>
