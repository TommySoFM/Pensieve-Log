<template>
  <div class="col-8 col-lg-4 col-xl-3 mx-auto mx-lg-0 form-bg-color">
    <b-form class="form-signup">
      <div class="mb-3">
        <b-form-group label="Username" description="*Length 6-20 characters long.">
          <b-input v-model="entry.username" required :state="validation.isUsernameValid"/>
        </b-form-group>
        <b-form-invalid-feedback :state="validation.isUsernameValid">
          Invalid Username!
        </b-form-invalid-feedback>
        <b-form-invalid-feedback :state="validation.isUsernameAvailable">
          Username is Used!
        </b-form-invalid-feedback>
      </div>
      <div class="mb-3">
        <b-form-group label="Password"
                      description="*Length 8-25 characters long with at least 1 lowercase, 1 uppercase and 1 special unit.">
          <b-input type="password" v-model="entry.password" required :state="validation.isPasswordValid"/>
        </b-form-group>
        <b-form-invalid-feedback :state="validation.isPasswordValid">
          Invalid Password!
          <ol>
            <li v-show="!validation.isPwWithUppercase">At least 1 Upper-cased character</li>
            <li v-if="!validation.isPwWithLowercase">At least 1 Lower-cased character</li>
            <li v-if="!validation.isPwWithSpecialUnit">At least 1 Special unit</li>
            <li v-if="!validation.isPwWithLength">Length between 8-25 units</li>
          </ol>
        </b-form-invalid-feedback>
      </div>
      <div class="mb-5">
        <b-form-group label="Re-enter Password">
          <b-input type="password" v-model="entry.reenter" :state="validation.isPasswordSame && reenter!==''" required/>
        </b-form-group>
        <b-form-invalid-feedback :state="validation.isPasswordSame">
          Passwords Not The Same!
        </b-form-invalid-feedback>
      </div>
      <div class="clearfix text-center font-weight-bolder mb-5">
        <span class="button-action">
          <h5 class="button button-confirm float-left col-5 py-2 ml-3" @click="submit">
            Submit
          </h5>
        </span>
        <span :class="{'button-action': !isAllEmpty}">
          <h5 class="button float-left offset-1 col-5 py-2" :disabled="isAllEmpty"
              :class=" [ isAllEmpty ? 'button-disabled' : ['button-reset'] ] " @click="reset">
            Reset
          </h5>
        </span>
      </div>
      <p>
        *Already registered? &nbsp
        <router-link class="page-redir" tag="span" to="/login">
          Here to Login!
        </router-link>
      </p>
    </b-form>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex'
  import frontMixin from '../mixins/frontMixin';

  export default {
    data () {
      return {
        entry:{
          username: '',
          password: '',
          reenter: ''
        },
        format:{
          username:'(?=.*?[a-zA-Z\\W]).{6,20}',
          password:'(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\\W]).{8,25}',
          pw_Lowercase: '(?=.*?[a-z]).{1,}',
          pw_Uppercase: '(?=.*?[A-Z]).{1,}',
          pw_Special: '(?=.*?[\\W]).{1,}',
          pw_Length: '.{8,25}'
        },
        validation:{
          isUsernameAvailable: null,
          isUsernameValid: null,
          isPasswordValid: null,
          isPwWithLowercase: null,
          isPwWithUppercase: null,
          isPwWithSpecialUnit: null,
          isPwWithLength: null,
          isPasswordSame: null
        },
      }
    },
    mixins:[
      frontMixin
    ],
    computed:{
      username(){return this.entry.username},
      password(){return this.entry.password},
      reenter(){return this.entry.reenter},
      isAllValid(){
        return Object.keys(this.validation).every((key)=>{return this.validation[key]===true})
      },
      isAllEmpty(){
        return Object.keys(this.entry).every((key)=>{return this.entry[key]===''})
      },
      ...mapGetters(['getServerUrl'])
    },
    watch:{
      username(){
        setTimeout(this.checkIsNameUsed, 300);
      }
    },
    methods:{
      submit() {
        this.checkAllEntryFormat();
        if(this.isAllValid){
          this.mixinAddUser(this.entry.username, this.entry.password);
          this.reset()
        }
      },
      checkIsNameUsed(){
        let targetUrl = this.getServerUrl+'/user/isNameUsed';
        let formData = new FormData;
        formData.append("username", this.entry.username);
        axios.post(targetUrl, formData)
          .then(response => {
            if (response.data){
              this.validation.isUsernameAvailable = false;
            } else{
              this.validation.isUsernameAvailable = true;
            }
          }).catch(error => {console.log(error)});
      },
      reset(){
        Object.keys(this.entry).forEach((key)=>{
          this.entry[key]='';
        });
        Object.keys(this.validation).forEach((key)=>{
          this.validation[key]=null;
        })
      },
      isFormatCorrect(entry,format,key,mode){
        let qualifier;
        let targetKey = Object.keys(this.validation)[key];

        if(mode === 'match'){
          qualifier = RegExp(format).test(entry);
        } else if (mode === 'equals'){
          qualifier = (entry === format);
        }

        if(qualifier === true){
          setTimeout(()=>{this.validation[targetKey] = true}, 300);
        }
        else {
          setTimeout(()=>{this.validation[targetKey] = false}, 300);
        };
      },
      checkAllEntryFormat(){
        this.isFormatCorrect(this.username,this.format.username, 1, 'match');
        this.isFormatCorrect(this.password,this.format.password,2, 'match');
        this.isFormatCorrect(this.password,this.format.pw_Lowercase,3, 'match');
        this.isFormatCorrect(this.password,this.format.pw_Uppercase,4, 'match');
        this.isFormatCorrect(this.password,this.format.pw_Special,5, 'match');
        this.isFormatCorrect(this.password,this.format.pw_Length,6, 'match');
        this.isFormatCorrect(this.reenter,this.password,7, 'equals');
      }
    }
  }
</script>
