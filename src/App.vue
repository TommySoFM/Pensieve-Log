<template>
  <div>
    <div class="web-header sticky-top d-flex flex-column flex-sm-row align-items-center px-sm-4 px-3 pt-3 border-bottom shadow">
      <div class="d-flex align-items-center mr-sm-auto">
      <svg class="logo-pic py-0" viewBox="-200 -40 650 650">
        <logo-pic></logo-pic>
      </svg>
      <h3 class="ml-3">Pensieve Log</h3>
      </div>
<!--      <h3 class="mr-sm-auto ml-sm-5">Pensieve Log</h3>-->
      <nav class="nav-indication col-2 mr-5 d-none d-lg-inline-block">
        <!--        <h5 class="text-center border-left border-right">Login</h5>-->
                <h5 class="text-center border-left border-right">Sign-up</h5>
      </nav>
      <div class="col-1 d-none d-lg-inline-block"></div>
      <nav class="nav-selection col-12 col-sm-4 d-flex mr-md-4 d-lg-none">
        <div class="flex-grow-1 text-center"><span>Log-in</span></div>
        <div class="border-left"></div>
        <div class="flex-grow-1 text-center"><span>Sign-up</span></div>
      </nav>
    </div>
    <div class="container-fluid d-flex flex-lg-row flex-column border-bottom-3">
      <div class="col-lg-8 my-3">
        <div class="col-lg-12 my-4 d-flex flex-column mx-3">
         <h1 class="line-top display-3 font-weight-bolder">Thought?</h1>
         <h3 class="line-bottom mr-xl-5 display-4 text-right">Share with everyone!</h3>
        </div>
        <svg class="col-lg-10 align-self-end ml-md-5" viewBox="100 20 1150 900"  preserveAspectRatio="xMidYMid meet">
          <main-pic class="main-pic"/>
        </svg>
      </div>
      <div class="button-action col-3 d-none d-lg-block text-center my-auto">
        <h3 class="button button-login py-4 my-5">Log-in</h3>
        <h3 class="button button-signup py-4 ">Sign-up</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import logoPic from './assets/logo-pic.svg'
  import mainPic from './assets/main-pic.svg'
export default {
  components: {
    logoPic,
    mainPic
  }
}
</script>
<style>
  * {
    border: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }
  .web-header{
    background-color: white;
    background-image: linear-gradient(to right , rgba(138, 126, 112, 0.12), #fff);
  }
  .logo-pic{
    height: 8vh;
  }
  .form-login{
    height: 90vh;
    padding-top: 40vh;
  }
  .form-signup{
    height: 90vh;
    padding-top: 35vh;
  }
  .button {
    font-weight: 700;
    cursor: pointer;
    border-radius: 100px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    transition: color 1s ease, background-color .5s ease;
  }
  .button-login:hover,
  .button-login:active,
  .button-signup:hover,
  .button-signup:active {
    border: 6px solid #004662;
    background-color: #fcfff2;
    color: #004662;
  }
  .button-confirm:hover,
  .button-confirm:active{
    border: 3px solid rgba(18, 128, 106, 0.65);
    background-color: rgba(174, 244, 230, 0.50);
    color: #1abc9c;
  }
  .button-reset:hover,
  .button-reset:active{
    border: 3px solid rgba(227, 42, 58, 0.60);
    background-color: rgba(251, 222, 225, 0.5) ;
    color: #eb685a;
  }
  .button-action :hover{
    transition: all .2s;
    transform: translateY(-3px);
  }
  .button-action :active{
    transition: all .1s;
    transform: translateY(-1px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }

  /* Apply to xs-size */
  @media screen and (max-width: 768px){
    .line-top{
      font-size: 3.5rem;
    }
    .line-bottom{
      font-size: 2.5rem;
    }
  }
  /* Apply to md-size or below */
  @media screen and (max-width: 992px){
    .form-login{
      height: 90vh;
      padding-top: 20vh;
    }
    .form-signup{
      height: 90vh;
      padding-top: 15vh;
    }
  }
</style>
