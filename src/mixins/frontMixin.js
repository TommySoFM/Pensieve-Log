import {mapGetters} from "vuex";
import axios from "axios";

export default {
  computed:{
    ...mapGetters([
      'getServerUrl'
    ])
  },
  methods:{
    mixinLogin(username,password){
      let targetUrl = this.getServerUrl+"/authenticateUser";
      const formData = new FormData;
      formData.append('username', username);
      formData.append('password', password);
      axios.post(targetUrl, formData)
        .then( response => {
          if(response.status === 200){
            this.$router.push("/home")
          }
        }).catch( error => {
            console.log(error);
            this.password = '';
            this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
              text: 'Incorrect Password! Please try again!'});
        });
    },
    mixinAddUser(username, password) {
      let targetUrl = this.getServerUrl+'/user/add';
      const formData = new FormData;
      formData.append('username',username);
      formData.append('password',password);
      axios.post(targetUrl, formData)
        .then(resource => {
          this.$notify({group: 'notice-app', type:'success', title: 'Success!' , duration: 2250,
            text: 'Redirect to Login Page in 3 Second...'});
          setTimeout(()=>{this.$router.push('/log_in')}, 3000);
        })
        .catch(error => {
          console.log(error.response.data.message);
          this.$notify({group: 'notice-app', type:'error', title: 'Failed!' , duration: 3000,
            text: 'Error in creating new user.'});
        });
    },
    mixinIsNameAvailable(username){
      let targetUrl = this.getServerUrl+'/user/isNameUsed';
      let formData = new FormData;
      formData.append("username", username);
      axios.post(targetUrl, formData)
        .then(response => {
          if (response.data){
            return false;
          } else{
            return true;
          }
        }).catch(error => {console.log(error)});
    }
  }
}
