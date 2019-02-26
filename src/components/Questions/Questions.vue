<template>
  <div>
    <div class="ui grid">
      <div class="row">
        <!--//  ! first  -->
        <div class="left floated six wide column">
          <h2>All Questions</h2>
          <p class="_totalq">2217 questions</p>
        </div>
        <div class="right floated four wide column">
          <router-link to="/ask" tag="button" class="ui blue button">Ask a question</router-link>
        </div>
      </div>
      <div class="ui section divider"></div>
      <question-sorter @data="Questions = $event"></question-sorter>
    </div>
    <question-info v-for="question in Questions" :key="question.id" :question="question"></question-info>
  </div>
</template>

<script>
import Question from "../Home/Question.vue";
import SortQuestions from "../SortQuestions.vue";
import Api from '../../services/Api'
export default {
  data() {
    return {
      Questions: [
        {
          id: 1,
          question: "Best way to launch 100 identical Docker machines on AWS?",
          votes: 10,
          answers: 3,
          tags: ["tag1", "tag2", "tag3"],
          time: "654"
        }
      ]
    };
  },
  mounted(){
    Api().get('questions')
    .then(res=>this.Questions = res.data)
    .catch(e=>console.log(e))
  },
  components: {
    questionInfo: Question,
    questionSorter: SortQuestions
  }
};
</script>

<style scoped>
div.ui.container {
  margin-left: 10px;
}
._totalq {
  font-size: 18px;
}
</style>
