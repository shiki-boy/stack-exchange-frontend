<template>
  <div>
    <div class="ui modal" id="signup-modal">
      <i class="close icon"></i>
      <div class="header">Sign Up
        <div class="ui animated fade blue inverted button right floated" @click="openLoginModal()">
          <div class="visible content">Already have a account ?</div>
          <div class="hidden content">Log In</div>
        </div>
      </div>
      <div class="content">
        <div class="ui hidden divider"></div>
        <div class="ui grid">
          <div class="row">
            <div class="four wide column">
              <ul>
                <template v-if="currentV == 'vemail'">
                  <li v-if="!$v.email.required">email is required</li>
                  <li v-if="!$v.email.email">invalid email</li>
                  <li v-if="!$v.email.unique">email already taken</li>
                </template>
                <template v-if="currentV == 'vusername'">
                  <li v-if="!$v.username.required">username is required</li>
                  <li v-if="!$v.username.unique">username already taken</li>
                </template>
                <template v-if="currentV == 'vpwd'">
                  <li v-if="!$v.password.required">Password required</li>
                  <li v-if="!$v.password.minLength">Min len = 8</li>
                  <li v-if="!$v.password.needDigit">need digit</li>
                  <li v-if="!$v.password.needLower">need lower</li>
                  <li v-if="!$v.password.needUpper">need upper</li>
                  <li v-if="!$v.password.needSpecial">need special</li>
                </template>
                <template v-if="currentV == 'vcpwd'">
                  <li v-if="!$v.confirmPassword.sameAs">Passwords dont match</li>
                </template>
              </ul>
            </div>

            <form class="ui large form">
              <div class="ten wide column">
                <div class="fields">
                  <div class="field" :class="{'error':$v.email.$error}">
                    <label>Email</label>
                    <input
                      type="email"
                      v-model.trim="email"
                      @input="$v.email.$touch()"
                      @focus="currentV = 'vemail'"
                      placeholder="Enter email"
                    >
                  </div>
                  <div class="field" :class="{'error':$v.username.$error}">
                    <label>Username</label>
                    <input
                      type="text"
                      v-model.trim="username"
                      @input="$v.username.$touch()"
                      @click="currentV = 'vusername'"
                      placeholder="Enter Username"
                    >
                  </div>
                </div>
              </div>

              <div class="ui hidden divider"></div>

              <div class="fields">
                <div class="field" :class="{'error' : $v.password.$error}">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    v-model.trim="password"
                    @input="$v.password.$touch()"
                    @click="currentV = 'vpwd'"
                    placeholder="Enter password"
                  >
                </div>

                <div class="field" :class="{'error' : $v.confirmPassword.$error}">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    v-model.trim="confirmPassword"
                    placeholder="Confirm password"
                    @input="$v.confirmPassword.$touch()"
                    @click="currentV = 'vcpwd'"
                  >
                </div>
              </div>
            </form>
          </div>
          <div class="ui hidden divider"></div>
        </div>
        <div class="ui horizontal divider _text">Or Sign Up using</div>
        <div class="g-signin2" id="g-signin2"></div>
      </div>
      <div class="actions">
        <div class="ui green button" @click="createUser()">
          <i class="icon check"></i>Submit
        </div>
        <div class="ui red cancel button">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import jQuery from "jquery";
import semantic from "semantic-ui-css";
import Api from "../../services/Api.js";

const needDigit = helpers.regex("digit", /[0-9]+/),
  needLower = helpers.regex("needLower", /[a-z]+/),
  needUpper = helpers.regex("needLower", /[A-Z]+/),
  needSpecial = helpers.regex("needSpecial", /[@#_<>\[\]\$\*]+/);

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      currentV: "",
      modalActive: this.signupModalActive
    };
  },
  props: ["signupModalActive"],
  mounted() {
    jQuery("#signup-modal").modal({ allowMultiple: false });
  },
  created() {
    let Gscript = document.createElement("script");
    Gscript.setAttribute("src", "https://apis.google.com/js/platform.js?");
    document.head.appendChild(Gscript);

    let Gmeta = document.createElement("meta");
    Gmeta.setAttribute("name", "google-signin-client_id");
    Gmeta.setAttribute(
      "content",
      "1030991878062-p4makopstk5jtdobiv2umqr61rmgtpo3.apps.googleusercontent.com"
    );
    document.head.appendChild(Gmeta);
  },
  methods: {
    openLoginModal: function() {
      jQuery("#login-modal")
        .modal("setting", "transition", "horizontal flip")
        .modal("show");
    },
    createUser: function() {
      Api()
        .post("/user/signup", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(response => console.log(response.data));
    },
    onSignIn: function(googleUser) {
      console.log("onsignin");
      var profile = googleUser.getBasicProfile();
      // console.log("Name: " + profile.getName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail());

      let id_token = googleUser.getAuthResponse().id_token;

      Api()
        .post("user/gapi/verify", { id_token })
        .then(response => {
          if (response.data.msg === "logged in") {
            console.log(123);
            console.log(this.$store.state);
            this.$store.commit("setUser", { username: profile.getName() , token:id_token});
            return;
          } else {
            this.$store.commit("setUser", { username: profile.getName() , token:id_token});
            return;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    signupModalActive: function(val) {
      if (val) {
        console.log("makk");
        gapi.signin2.render("g-signin2", {
          scope: "profile email",
          width: 240,
          height: 50,
          longtitle: true,
          theme: "dark",
          onsuccess: this.onSignIn,
          onfailure() {
            console.log("error gapi");
          }
        });
      }
    }
  },
  validations: {
    email: {
      required,
      email,
      async unique(val) {
        if (val === "") return true;
        const response = await Api().get(`/user/isUnique/e/${val}`);
        return Boolean(response.data);
      }
    },
    username: {
      required,
      async unique(val) {
        if (val === "") return true;
        const response = await Api().get(`/user/isUnique/u/${val}`);
        return Boolean(response.data);
      }
    },
    password: {
      required,
      minLength: minLength(8),
      needLower,
      needDigit,
      needUpper,
      needSpecial
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
