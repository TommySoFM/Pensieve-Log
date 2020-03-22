<template>
  <div class="user-page-container col-lg-8 col-12 offset-lg-2 mt-n5">
    <div class="user-page-option">
      <h4 class="user-page-text">Post Created</h4>
    </div>
    <div class="user-page-option">
      <h4 class="user-page-text">Post Liked</h4>
    </div>
    <div class="user-page-option">
      <h4 class="user-page-text">Setting</h4>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
  .user-page-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }
  .user-page-option{
    padding-bottom: 10px;
    margin: 30px 0px;
    width: 40%;
    border-bottom: 2px solid rgba(0, 70, 98, 0.51);
    cursor: pointer;
  }
  .user-page-option::after{
    display: block;
    content: '';
    height: 50px;
    width: 39%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.31), rgba(169, 169, 169, 0.29));
    position: absolute;
    transform: translateY(-40px);
    filter: opacity(0%);
    transition: filter 250ms ease-in-out;
    z-index: -1;
  }
  .user-page-option:hover::after{
    filter: opacity(100%);
  }
  .user-page-text{
    font-size: 40px;
    text-align: center;
  }
</style>
