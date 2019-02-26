<template>
  <div>
    <div class="ui modal" id="login-modal">
      <i class="close icon"></i>
      <div class="header">Log In
        <div class="ui animated fade blue inverted button right floated" @click="openSignupModal()">
          <div class="visible content">Don't have a account ?</div>
          <div class="hidden content">Sign Up</div>
        </div>
      </div>
      <div class="content">
        <div class="ui hidden divider"></div>
        <div class="ui centered grid">
          <form class="ui large form">
            <div class="row">
              <div class="field" :class="{'error' : $v.query.$error}">
                <label>Username or Email</label>
                <input
                  type="text"
                  v-model.trim="query"
                  @input="$v.query.$touch()"
                  placeholder="Enter email or username"
                >
              </div>
            </div>

            <div class="ui hidden divider"></div>

            <div class="row">
              <div class="field" :class="{'error' : $v.password.$error}">
                <label>Password</label>
                <input
                  type="password"
                  v-model.trim="password"
                  @input="$v.password.$touch()"
                  placeholder="Enter password"
                >
              </div>
            </div>
          </form>
        </div>
        <div class="ui hidden divider"></div>
        <div class="ui horizontal divider _text">Or Log In using</div>
        <div class="g-signin2" id="g-signin3"></div>
      </div>
      <div class="actions">
        <button class="ui green button" :disabled="$v.$invalid" @click="findUser()">
          <i class="icon check"></i>Submit
        </button>
        <div class="ui red cancel button">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";
import semantic from "semantic-ui-css";
import { required } from "vuelidate/lib/validators";
import Api from "../../services/Api";

export default {
  data() {
    return {
      query: "",
      password: "",
      modalActive: this.loginModalActive
    };
  },
  props: ["loginModalActive"],
  mounted() {
    jQuery("#login-modal").modal({ allowMultiple: false });
  },
  methods: {
    openSignupModal: function() {
      $("#signup-modal")
        .modal("setting", "transition", "horizontal flip")
        .modal("show");
    },
    findUser: function() {
      let password = this.password;
      let query = this.query;
      var patt = new RegExp("^\\w+@[a-zA-Z0-9]+\\.[a-zA-Z]{1,4}$");
      let isEmail = patt.test(this.query);

      Api()
        .post("/user/findUser", { query, password, isEmail })
        .then(response => {
          if(response.data.error){
            console.log(response.data.msg);
          }
          else{
            let username = response.data.user.username
            let token = response.headers['x-auth']
            this.$store.commit("setUser", {
              username,
              token
            });
          }
        })
        .catch(e => console.log(e));
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
            this.$store.commit("setUser", {
              username: profile.getName(),
              token: id_token
            });
            return;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    loginModalActive: function(val) {
      if (val) {
        console.log("makk");
        gapi.signin2.render("g-signin3", {
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
    query: {
      required
    },
    password: {
      required
    }
  }
};
</script>

<style scoped>
</style>
