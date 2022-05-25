<template>
  <div class="login-page">
    <div class="page-section">
      <h1>Join our stock community!</h1>
      <h3>Download free photos and videos powered by the best photographers.</h3>

      <form @submit="login" class="login-form" action="">
        <div class="form-group">
          <label for="username">USERNAME</label>
          <div class="form-input">
            <input v-model="username" @input="errorMsg = null" type="text" id="username" placeholder="Enter username here...">
            <p class="validation" v-show="!validForm && !isValidUsername">The username field is required</p>
          </div>
        </div>

        <div class="form-group">
          <label for="password">PASSWORD</label>
          <input v-model="password" @input="errorMsg = null" type="password" id="password" placeholder="Enter password here...">
          <p class="validation" v-show="!validForm && !isValidPassword">The password field is required and has to be at least 7 characters</p>
        </div>

        <button>LOG IN</button>

        <p class="validation mt-3" v-show="errorMsg">The provided credentials are incorrect. Please try again</p>
      </form>
    </div>
  </div>

  <div class="footer-section">
    <img src="../assets/images/login.svg" alt="login-image">
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      username: "user1",
      password: "pass1234567",
      validForm: true,
      errorMsg: null
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
    ...mapActions("authentication", {
      loginUser: "loginUser"
    }),
    async login(event) {
      event.preventDefault();

      //Validate form fakeDatabase
      if (!this.isValidUsername || !this.isValidPassword) {
        this.validForm = false;
        return;
      }

      try{
        await this.loginUser({username: this.username, password: this.password});

        await this.$router.push({name: 'gallery'})

      }catch(error){
        this.errorMsg = error;
      }

    }
  }
}
</script>

