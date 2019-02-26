<template>
  <div>
    <!-- // * first grid -->
    <div class="ui grid">
      <div class="row">
        <!--//  ! first  -->
        <div class="left floated six wide column">
          <h2>Explore Our Questions</h2>
        </div>
        <div class="right floated four wide column">
          <router-link to="/ask" tag="button" class="ui blue button">Ask a question</router-link>
        </div>
      </div>
      <div class="row">
        <!--  // ! second tags -->
        <div class="left floated column">
          <div class="ui teal labels">
            <home-tag v-for="(tag,i) in HomeTags" :key="'tag'+i" :tag="tag"></home-tag>
            <router-link to="/tags">more tags</router-link>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <question-sorter @data="Questions = $event"></question-sorter>
    </div>
    <question-info v-for="question in Questions" :key="question.id" :question="question"></question-info>
  </div>
</template>

<script>
import HomeTag from "./HomeTag.vue";
import Question from "./Question.vue";
import SortQuestions from "../SortQuestions.vue";
import Api from '../../services/Api.js'

export default {
  data() {
    return {
      HomeTags: [
        { id: 1, name: "laptop" },
        { id: 2, name: "laptop" },
        { id: 3, name: "laptop" },
        { id: 4, name: "mobile" },
        { id: 5, name: "mobile" },
        { id: 6, name: "mobile" },
        { id: 7, name: "camera" },
        { id: 8, name: "camera" },
        { id: 9, name: "camera" }
      ],
      Questions: [
        {
          id: "f7e57567d6787d68d",
          q_h: "Best way to launch 100 identical Docker machines on AWS?",
          votes: 10,
          answers: 3,
          tags: ["tag1", "tag2", "tag3"],
          date: "654"
        }
      ],
      currentTab: "recent",
      user:this.$store.state.user
    };
  },
  mounted(){
    Api().get('questions')
    .then(response=>{
      this.Questions = response.data
    }).catch(e=>console.log(e))
  },
  components: {
    // ? the home tag is not a global component we register it locally
    homeTag: HomeTag,
    questionInfo: Question,
    questionSorter: SortQuestions
  },
  watch: {
    $route() {
      this.currentTab = this.$route.query.tab;
    }
  }
};
</script>

<style scoped>
</style>
