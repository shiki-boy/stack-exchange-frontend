<template>
  <div>
    <div class="row">
      <div class="ui five buttons">
        <router-link
          to="?tab=recent"
          exact
          tag="button"
          class="ui button"
          @click.native="GET_data('send')"
        >Acitve</router-link>
        <router-link to="?tab=hot" exact tag="button" class="ui button">Hot</router-link>
        <router-link to="?tab=week" exact tag="button" class="ui button">Week</router-link>
        <router-link to="?tab=month" exact tag="button" class="ui button">Month</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Api from '../services/Api'

export default {
  data() {
    return {
      g: "recent"
    };
  },
  methods: {
    GET_data(msg){
        Api().get('questions')
        .then((response)=>{
            console.log(response.data);
            this.$emit('data',response.data);
        })
    }
  }
};
</script>

<style >
</style>