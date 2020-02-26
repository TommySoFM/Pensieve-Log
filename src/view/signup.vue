<template>
  <div class="col-8 col-lg-4 col-xl-3 mx-auto mx-lg-0">
    <b-form class="form-signup">
      <div class="mb-3">
        <b-form-group label="Username" description="*Length 6-20 characters long.">
          <b-input></b-input>
        </b-form-group>
      </div>
      <div class="mb-3">
        <b-form-group label="Password"
                      description="*Length 8-25 characters long with at least 1 lowercase, 1 uppercase and 1 special unit.">
          <b-input type="password"></b-input>
        </b-form-group>
      </div>
      <div class="mb-5">
        <b-form-group label="Re-enter Password">
          <b-input type="password"></b-input>
        </b-form-group>
      </div>
      <div class="button-action clearfix text-center font-weight-bolder">
        <h5 class="button button-confirm float-left col-5 py-2 ml-3">Submit</h5>
        <h5 class="button button-reset float-left offset-1 col-5 py-2">Reset</h5>
      </div>
    </b-form>
  </div>
</template>
