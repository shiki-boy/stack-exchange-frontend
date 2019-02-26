<template>
  <div class="ui grid">
    <div class="centered row">
      <div class="four wide column">
        <div class="ui tiny teal statistics">
          <div class="statistic">
            <div class="value">{{question.votes}}</div>
            <div class="label">Votes</div>
          </div>
          <div class="statistic">
            <div class="value">{{question.answers.length}}</div>
            <div class="label">Answers</div>
          </div>
        </div>
      </div>
      <div class="eleven wide column">
        <router-link :to="'/question/'+question._id" tag="a" class="meta">{{question.q_h}}</router-link>
        <br>
        <br>
        <p class="_time">Asked {{question.date | date}}</p>
      </div>
    </div>
    
    <div class="row">
      <div class="column">
        <div class="ui teal labels" style="float:right;">
          <a v-for="(tag,i) in question.tags" :key="i+'tag'" class="ui label">{{tag}}</a>
        </div>
      </div>
    </div>
    <div class="ui section divider"></div>
  </div>
</template>

<script>
import HomeTag from "./HomeTag.vue";

export default {
  props: ["question"],
  components: {
    homeTag: HomeTag
  }
};
</script>

<style scoped>
.meta{
    font-size: 20px;
}
._time {
    color: #666;
    text-align: right;
}

</style>
