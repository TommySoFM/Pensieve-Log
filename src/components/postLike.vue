<template>
  <div class="d-flex align-items-center justify-content-around" @click="clickLike(postData.id)">
    <svg class="like-icons like-icon ml-auto mr-2" viewBox="0 0 250 250" preserveAspectRatio="xMidYMid meet">
      <like v-if="isLiked"/>
      <like-disabled v-else/>
    </svg>
    <p class="mb-0 mr-auto font-weight-bolder" >{{likeCount}} Like<span v-if="likeCount>1">s</span></p>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import like from '../assets/like.svg'
import likeDisabled from '../assets/like-disabled.svg'

export default {
  data () {
    return {
      likeCount: { type: Number },
      isLiked: { type: Boolean }
    }
  },
  props: [
    'postData'
  ],
  watch: {
    postData () {
      this.isLiked = this.postData.postLike.some(like => {
        return like.username === this.getUserData.username
      })
      this.likeCount = this.postData.postLike.length
    }
  },
  created () {
    this.isLiked = this.postData.postLike.some(like => {
      return like.username === this.getUserData.username
    })
    this.likeCount = this.postData.postLike.length
  },
  computed: {
    ...mapGetters([
      'getUserData', 'getServerUrl'
    ])
  },
  methods: {
    clickLike (postId) {
      const targetUrl = this.getServerUrl + '/post/' + postId + '/like'
      axios.post(targetUrl)
        .then(response => {
          if (response.data === 'liked') {
            this.isLiked = true
            this.likeCount += 1
          } else {
            this.isLiked = false
            this.likeCount -= 1
          }
        }).catch(error => { console.log(error) })
    }
  },
  components: {
    like,
    likeDisabled
  }
}
</script>
<style>
  .like-icons{
    width: 30px;
    height: 30px;
  }
</style>
