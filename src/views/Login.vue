<template>
  <div class="login-page">
    <div class="page-section">
      <h1>Join our stock community!</h1>
      <h3>Download free photos and videos powered by the best photographers.</h3>

      <form @submit="login" class="login-form" action="">
        <div class="form-group">
          <label for="username">USERNAME</label>
          <div class="form-input">
            <input v-model="username" type="text" id="username" placeholder="Enter username here...">
            <p class="validation" v-show="!validForm && !isValidUsername">The username field is required</p>
          </div>
        </div>

        <div class="form-group">
          <label for="password">PASSWORD</label>
          <input v-model="password" type="text" id="password" placeholder="Enter password here...">
          <p class="validation" v-show="!validForm && !isValidPassword">The password field is required and has to be at least 7 characters</p>
        </div>

        <button>LOG IN</button>

        <div class="footer-section">
          <img src="../assets/images/login.svg" alt="">
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      username: null,
      password: null,
      validForm: true,
    }
  },
  computed:{
    isValidUsername() {
      return this.username !== null;
    },

    isValidPassword() {
      return this.password !== null && this.password.length >= 7;
    }
  },
  methods: {
    login(event) {
      event.preventDefault();

      //Validate form fakeDatabase
      if (!this.isValidUsername || !this.isValidPassword) {
        this.validForm = false;
        return;
      }

      alert("");
    }
  }
}
</script>

