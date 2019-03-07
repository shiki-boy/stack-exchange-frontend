<template>
  <div class="ui grid">
    <div class="row">
      <voter-button v-on:upvote="upvote" :votes="answer.votes"></voter-button>
      <div class="fourteen wide column">
        <p class="ui green large tag label">Answered</p>
        <h3>{{answer.answer}}</h3>
        <p class="_creator">
          <i class="minus green icon"></i>
          answered by {{answer.creator}}
        </p>
        <br>
        <p class="_timestamp">
          <i class="minus green icon"></i>some time ago
        </p>
      </div>
    </div>
    <div class="ui divider"></div>
  </div>
</template>

<script>
import Api from '../../services/Api'
import voterButton from "./voterButton";
export default {
  data() {
    return {};
  },
  props: ["answer"],
  methods:{
    async upvote(){
      let id = this.answer._id
      let headers = {'x-auth':this.$store.getters.getToken}
      Api().patch(`upvote/${id}`,null,{headers})
      .then(response => {
        console.log(response.data)
        this.$store.dispatch('setMsg',response.data)
      }).catch(e=>{
        this.$store.dispatch('setMsg',"Not logged in")
      })
    }
  },
  components: {
    voterButton
  }
};
</script>

<style scoped>
._creator {
  float: right;
  margin: 0;
}
._timestamp {
  float: right;
}
</style>
