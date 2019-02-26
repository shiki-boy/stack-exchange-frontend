<template>
  <div>
    <div class="ui top huge inverted attached menu">
      <div class="header item">
        <i class="wrench icon"></i>
        Our Company
      </div>

      <div class="right menu">
        <div class="ui category search item">
          <div class="ui inverted transparent icon input">
            <input class="prompt" type="text" placeholder="Search tags...">
            <i class="search link icon"></i>
          </div>
          <div class="results"></div>
        </div>
        <template v-if="!isAuth">
          <div class="item">
            <div class="ui primary button" @click="openSignup()">Sign up</div>
          </div>
          <div class="item">
            <div class="ui button" @click="openLogin()">Log-in</div>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <div class="ui primary button">Profile</div>
          </div>
          <div class="item">
            <div class="ui button" @click="logOut">Log Out</div>
          </div>
        </template>
      </div>
    </div>
    <sign-up-modal v-bind:signupModalActive="signupModalActive"></sign-up-modal>
    <log-in-modal v-bind:loginModalActive="loginModalActive"></log-in-modal>
  </div>
</template>

<script>
import jQuery from "jquery";
import semantic from "semantic-ui-css";
import signupmodal from "./modals/signupmodal.vue";
import loginmodal from "./modals/loginmodal.vue";

export default {
  data() {
    return {
      signupModalActive: false,
      loginModalActive:false
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  mounted: function() {},
  methods: {
    openSignup: function() {
      this.signupModalActive = true;
      jQuery("#signup-modal").modal("show");
    },
    openLogin: function() {
      this.loginModalActive = true;
      jQuery("#login-modal").modal("show");
    },
    logOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(()=> {
        console.log("User signed out.");
        this.$store.commit("logOutUser");
      });
    }
  },
  components: {
    signUpModal: signupmodal,
    logInModal: loginmodal
  }
};
</script>

<style scoped>
</style>
