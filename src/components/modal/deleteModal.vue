<template>
  <div v-if="getDeleteModalSwitch">
    <div class="custom-modal-background" @click="modalOff"></div>
    <div class="custom-modal-box">

      <div class="custom-modal-container">
        <div class="custom-modal-header">
          <BIconQuestionFill style="transform: scale(1.3)"/>
        </div>
        <div class="custom-modal-body">
          <div class="custom-modal-title">
               <p style="margin-bottom: 5px">Are You Sure?</p>
          </div>

          <div class="custom-modal-text">
            {{modalMessage}}
          </div>
        </div>
        <div class="custom-modal-footer" @click="modalOff">
          <span class="modal-footer-check" @click="modalAction(getModalId)">
            <BIconCheckCircle/>
          </span>
          <span class="modal-footer-x">
            <BIconXCircle />
          </span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {BIconQuestionFill,BIconXCircle, BIconCheckCircle} from 'bootstrap-vue'
  export default {
    props:[
      'modalMessage',
      'modalAction',
    ],
    computed:{
      ...mapGetters([
        'getDeleteModalSwitch',
        'getModalId'
      ])
    },
    methods:{
      ...mapActions([
        'modalOff'
      ])
    },
    components:{
      BIconQuestionFill,
      BIconXCircle,
      BIconCheckCircle
    }
  }
</script>
<style>
  .custom-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
    /*animation: onShow .3s ease-in-out;*/
  }

  .custom-modal-box {
    position: absolute;
    top: 10vh;
    left: 50vh;
    z-index: 3;

    height:100px;
    width: 600px;
  }

  .custom-modal-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;
    height: 100%;
    margin: 0px;
    align-items: center;
    justify-content: center;
    background: #fce6c4;
    /*#fce6c4*/
    border: 3px solid #e67e22;
  }

  .custom-modal-container,
  .custom-modal-container > div {
    box-sizing: border-box;
    border-radius: 20px;
  }

  .custom-modal-header {
    flex: 0 1 auto;
    color: #ffa76d;
    font-size: 45px;
    font-weight: 600;
    padding: 0 3% 0 5%;
  }

  .custom-modal-body {
    padding: 10px;
    flex: 1 0 40%;
  }

  .custom-modal-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #fad8a4;
    letter-spacing: +2.3px;
    text-shadow: +2.3px 0 #e67e22, -2.3px 0 #e67e22, 0 +2.3px #e67e22, 0 -2.3px #e67e22;
  }

  .custom-modal-text {
    font-size: 0.95rem;
    font-weight: 400;
    letter-spacing: +0.5px;
  }

  .custom-modal-footer {
    flex: 0 1 auto;
    padding: 0 20px;
    opacity: 0.7;
    cursor: pointer;

    display: flex;
    align-items: center;
  }
  .modal-footer-check{
    font-size: 3.5rem;
    color: #1abc9c;
  }
  .modal-footer-x{
    font-size: 3.2rem;
    color: #eb685a;
  }
  .modal-footer-check:hover,
  .modal-footer-x:hover{
    filter: brightness(130%) saturate(80%);
  }


  @keyframes onShow {
    0% {opacity: 0%}
    100% {opacity: 100%}
  }

  @media only screen and (max-width: 1130px) and (min-width: 661px){
    .custom-modal-box{
      left: 0 !important;
    }
  }

  @media only screen and (max-width:660px){
    .custom-modal-background{
      height: 400vh;
      z-index: 5;
    }
    .custom-modal-box{
      position: fixed;
      z-index: 6;
      top: 20%;
      left: -30%;
      transform: scale(0.55);
    }
  }
  @media only screen and (max-width:353px){
    .custom-modal-box{
      left: -43%;
      transform: scale(0.5);
    }
  }
</style>
