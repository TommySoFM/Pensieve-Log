<template>
  <div class="col-8 col-lg-4 col-xl-3 mx-auto mx-lg-0">
    <b-form class="form-login">
      <div class="mb-4">
        <b-form-group label="Username">
          <b-input></b-input>
        </b-form-group>
      </div>
      <div class="mb-5">
        <b-form-group label="Password">
          <b-input type="password"></b-input>
        </b-form-group>
      </div>
      <div class="button-action clearfix text-center font-weight-bolder mb-5">
        <h5 class="button button-confirm float-left col-5 py-2 ml-3">Confirm</h5>
        <h5 class="button button-reset float-left offset-1 col-5 py-2">Reset</h5>
      </div>
      <p>
        *Have not registered? &nbsp
        <router-link class="page-redir" tag="span" to="/signup">
          Click Here!
        </router-link>
      </p>
    </b-form>
  </div>
</template>
<style>
  .page-redir{
    cursor: pointer;
    font-weight: 500;
    font-size: 110%;
    color: #004662;
    border-bottom: 3px solid #004662;
  }
  .page-redir:hover{
    color: rgba(0, 70, 98, 0.67);
    border-bottom: 3px solid rgba(0, 70, 98, 0.67);
  }
</style>
