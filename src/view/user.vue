<template>
  <div class="user-page-container col-lg-8 col-12 offset-lg-2">
    <div class="user-page-title" :class="{ 'page-title-margin': allInactive }">

      <div class="user-page-option" @click="postCreatedActive = true"
           :class="{ 'post-created-selected': !allInactive }"
           v-if="allInactive || postCreatedActive">
        <h4 class="user-page-text">Post Created</h4>
      </div>
      <div class="user-page-option" @click="postLikedActive = true"
           :class="{ 'post-liked-selected': !allInactive }"
           v-if="allInactive || postLikedActive">
        <h4 class="user-page-text">Post Liked</h4>
      </div>
      <div class="user-page-option" @click="settingActive = true"
           :class="{ 'setting-selected': !allInactive }"
           v-if="allInactive || settingActive">
        <h4 class="user-page-text">Setting</h4>
      </div>
    </div>
    <transition name="fade">
      <div v-if="postCreatedActive || postLikedActive" style="margin-top: 20vh">
        <post-table :reset="reset" :isPostCreated="postCreatedActive"/>
      </div>
      <div v-if="settingActive" style="text-align: center; margin-top: 30vh; color: rgba(0, 70, 98, 0.51)">
        <h2 @click="reset" style="cursor: pointer"> Coming Soon </h2>
      </div>
    </transition>
  </div>
</template>
<script>
import postTable from '../components/postTable'
export default {
  data () {
    return {
      postCreatedActive: false,
      postLikedActive: false,
      settingActive: false
    }
  },
  computed: {
    allInactive () {
      return ((this.postCreatedActive === false) && (this.postLikedActive === false) && (this.settingActive === false))
    }
  },
  methods: {
    reset () {
      this.postCreatedActive = false
      this.postLikedActive = false
      this.settingActive = false
    }
  },
  components: {
    postTable: postTable
  }
}
</script>
<style scoped>
  .user-page-container{
    display: flex;
    flex-direction: column;
    height: 90vh;
    position: relative;
    overflow: scroll;
  }
  .user-page-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .page-title-margin{
    margin-top: 20vh;
  }
  .user-page-option{
    padding-bottom: 10px;
    margin: 30px 0px;
    width: 40%;
    border-bottom: 2px solid rgba(0, 70, 98, 0.51);
    cursor: pointer;
  }
  .user-page-text{
    font-size: 40px;
    text-align: center;
  }
  .post-created-selected{
    position: absolute;
    top: 20vh;
    transform: translateY(-20vh) scale(0.7);
    transition: transform .3s ease-out .1s;
    cursor: auto;
  }
  .post-liked-selected{
    position: absolute;
    top: 36.5vh;
    transform: translateY(-36.5vh) scale(0.7);
    transition: transform .4s ease-out .1s;
    cursor: auto;
  }
  .setting-selected{
    position: absolute;
    top: 53.5vh;
    transform: translateY(-53.5vh) scale(0.7);
    transition: transform .5s ease-out .1s;
    cursor: auto;
  }
  .fade-enter-active{
     transition: opacity 1s .5s;
   }
  .fade-enter{
    opacity: 0;
  }
  /* Apply to ms-size */
  @media screen and (max-width: 575px) {
    .user-page-container{
      height: 80vh;
    }
    .user-page-option{
      width: 70%;
    }
    .page-title-margin{
      margin-top: 10vh;
    }
    .user-page-text{
      font-size: 30px;
    }
    .post-created-selected{
      top: 10vh;
      transform: translateY(-10vh) scale(0.7);
    }
    .post-liked-selected{
      top: 26.5vh;
      transform: translateY(-26.5vh) scale(0.7);
    }
    .setting-selected{
      top: 43.5vh;
      transform: translateY(-43.5vh) scale(0.7);
    }
  }
</style>
