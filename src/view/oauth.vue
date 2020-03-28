<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 70vh">
    <h4>{{ message }}</h4>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    if (window.opener) {
      window.opener.postMessage('Login Success')
      this.message = 'Login Success! Redirecting...'
    } else {
      this.message = 'Error - No Parent Window Opener'
    }
    window.close()
  }
}
</script>
