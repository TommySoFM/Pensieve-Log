import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  computed:{
    ...mapGetters([
      'getServerUrl'
    ])
  },
  methods:{
    ...mapActions([
      'setTargetUrl',
      'getPostsByQuery'
    ]),

    mixinGetPosts(targetPage) {
      let targetUrl = this.getServerUrl + "/post?page="+ targetPage;
      this.setTargetUrl(targetUrl);
      this.getPostsByQuery();
    },

    mixinNewPost(postText) {
      const vm = this;
      const formData = new FormData;
      let targetUrl = this.getServerUrl+"/post";
      formData.append('postText', postText);
      axios.post(targetUrl, formData)
        .then(response => {
          if (response.status == 201) {
            this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 1250,
              text: "Message is successfully posted!"});
               setTimeout(()=>{vm.$router.push('/home/post/1')},2000);
               setTimeout(()=>{vm.$router.go(0)},2100);
          } else {
            this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 1250,
              text: "Message is failed to post!"});
          }
        })
        .then(error => {
          console.log(error)
        })
    },

    mixinEditPost(postId, postText){
      let targetUrl = this.getServerUrl + '/post/' + postId;
      const formData = new FormData;
      formData.append("postText", postText);
      axios.put(targetUrl, formData)
        .then(response => {
          this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 1250,
            text: response.data});
          setTimeout(()=>{this.$router.go(0)},2000);
        }).catch(error => {
        this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
          text: error.response.data})
      })
    },
    mixinDeletePost(postId){
      let targetUrl = this.getServerUrl + '/post/' + postId;
      axios.delete(targetUrl)
        .then(response => {
          this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 1250,
            text: response.data});
          setTimeout(()=>{this.$router.go(0)},2000);
        }).catch(error => {
        this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
          text: error.response.data});
      })
    },

    mixinNewComment(id, commentText) {
      const vm = this;
      const formData = new FormData;
      let url = this.getServerUrl + '/post/' +id + '/comment';
      formData.append('commentText', commentText);
      axios.post(url, formData)
        .then(response => {
          if (response.status == 202) {
            this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 1250,
              text: "Comment is successfully posted!"});
          } else {
            this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 1250,
              text: "Comment is failed to post!"});
          }
          setTimeout(()=>{this.$router.go(0)},2000);
        })
        .then(error => {
          console.log(error)
        })
    },

    mixinLogout() {
      let targetUrl = this.getServerUrl + '/logout';
      axios.get(targetUrl)
        .then(response => {
          if (response.status === 200) {
            this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 2250,
              text: 'Logout Success! Redirect to Home Page in 3 Seconds...'});
            setTimeout(()=>{this.$router.push('/login')},3000);
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
