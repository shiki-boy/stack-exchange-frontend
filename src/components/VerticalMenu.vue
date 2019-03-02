<template>
  <div>
    <div class="ui vertical menu">
      <router-link class="item" to="/home?tab=recent" exact>Home</router-link>
      <router-link class="item" to="/questions?tab=recent">Questions</router-link>
      <router-link class="item" to="/tags">Tags</router-link>
      <router-link class="item" to="/closed">Closed</router-link>
    </div>
    <transition name="fadeRight">
      <div v-show="show" class="ui segment inverted red" id="msg-box">
        <i class="warning icon"></i>
        {{msg}}
      </div>
    </transition>
  </div>
</template>

<script>
import jQuery from "jquery";
import semantic from "semantic-ui-css";

export default {
  data() {
    return {
      msg: "Message",
      show: false
    };
  },
  mounted() {
    jQuery("#msg-box").visibility({
      type: "fixed",
      offset: 250
    });
  },
  computed:{
    newMsg(){
      return this.$store.state.msg
    }
  },
  watch:{
    newMsg:function(a,b){
      this.msg = a
      this.show = true
      setTimeout(()=>{
        this.show = false
        this.$store.dispatch('resetMsg')
      },5000)
    }
  }
};
</script>

<style scoped>
.fadeRight-enter-active, .fadeRight-leave-active {
  transition: all .5s;
}
.fadeRight-enter, .fadeRight-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: all .5s;
  opacity: 0;
}

.ui.vertical.menu {
  /* position: absolute; */
  /* float: left; */
  margin-left: 5px;
}

#msg-box.fixed {
  width: 16%;
}
</style>
