<template>
  <div class="ui grid">
    <div class="row">
      <voter-button :votes="answer.votes"></voter-button>
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
import voterButton from "./voterButton";
export default {
  data() {
    return {};
  },
  props: ["answer"],
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
