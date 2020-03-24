<template>
  <div>
    <b-table striped hover outlined :fields="fields" :items="items"></b-table>
    <b-button class="offset-lg-11 offset-10" @click="reset"> Back </b-button>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      fields: [],
      items: [],
      date: ''
    }
  },
  computed: {
    ...mapGetters([
      'getServerUrl'
    ])
  },
  props: [
    'reset',
    'isPostCreated'
  ],
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let endPoint
      if (this.isPostCreated) {
        this.fields = ['#', 'Latest Post', 'Like', 'Comment', 'Date']
        endPoint = '/post/self'
      } else {
        this.fields = ['#', 'Author', 'Latest Post', 'Like', 'Comment', 'Date']
        endPoint = '/post/liked/self'
      }
      axios.get(this.getServerUrl + endPoint)
        .then(response => {
          for (let i = 0; i < response.data.length && i < 7; i++) {
            const table = {
              '#': i + 1,
              'Latest Post': this.chopOutWords(response.data[i].postTitle, 50),
              Author: response.data[i].author,
              Like: response.data[i].likeCount,
              Comment: response.data[i].commentCount,
              Date: response.data[i].postDate
            }
            this.items.push(table)
          }
        })
    },
    chopOutWords (words, wordCount) {
      if (words.length < wordCount) {
        return words
      } else {
        return words.substring(0, wordCount) + '...'
      }
    }
  }
}
</script>
