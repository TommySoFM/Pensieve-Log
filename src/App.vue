<template>
  <div>
    <div class="web-header d-flex flex-column flex-sm-row align-items-center px-sm-4 p-3 border-bottom shadow">
      <h3 class="ml-sm-5 mr-sm-auto">Forum</h3>
      <nav class="col-12 col-sm-4 d-flex mr-md-4">
        <div class="flex-grow-1 text-center "><span>Log-in</span></div>
        <div class="border-left"></div>
        <div class="flex-grow-1 text-center"><span>Sign-up</span></div>
      </nav>
    </div>
    <div class="container">
      <div class="col-sm-8">
        <div></div>
        <div><main-pic /></div>
      </div>
      <div class="col-sm-4">
      </div>
    </div>
  </div>
</template>

<script>
  import mainPic from './assets/main-pic.svg'
export default {
  components: {
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
    background-image: linear-gradient(to right , rgba(138, 126, 112, 0.12), #fff);
  }
</style>
