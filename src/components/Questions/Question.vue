<template>
  <div>
    <!-- // ! single Question view -->
    <div class="ui grid">
      <div class="row">
        <!--//  ! first  -->
        <div class="left floadted column">
          <button class="circular ui icon inverted orange button">
            <i class="star icon"></i>
          </button>
        </div>
        <div class="left floated fourteen wide column">
          <h2>{{Question.q_h}}</h2>
          <div class="ui hidden divider"></div>
          <tags-component v-for="tag in Question.tags" :key="tag.name" :tag="tag"></tags-component>
        </div>
      </div>
      <div class="row">
        <div class="right floated four wide column">
          <router-link to="/ask" tag="button" class="ui blue button">Ask a question</router-link>
        </div>
      </div>
      <div class="ui divider"></div>
    </div>
    <div class="ui grid">
      <div class="row">
        <voter-button :votes="Question.votes"></voter-button>
        <div class="fourteen wide column">
          <h3>{{Question.q}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="seven wide column"></div>
        <div class="column">
          <button class="_ans-btn ui red large button">Answer</button>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="row">
        <div class="column">
          <div class="ui floating green message" id="ans-msg">
            <div class="header">{{Question.answers.length}} Answers</div>
          </div>
        </div>
      </div>
    </div>
    <answer-section v-for="answer in Answers" :key="answer.date" :answer="answer"></answer-section>
    <div id="load-content"></div>
  </div>
</template>

<script>
import jQuery from "jquery";
import semantic from "semantic-ui-css";
import voterButton from "./voterButton";
import answerSection from "./answerSection";
import tagsComponent from "./tagsComponent.vue";
import Api from "../../services/Api.js";

export default {
  data() {
    return {
      Question: {
        q: "main question",
        q_h: "question heading",
        votes: 8,
        answers: [8],
        tags: ["tag1", "tag2", "tag3"],
        date: "2fj9pppp2f"
      },
      Answers: [
        {
          answer: "answer",
          votes: 20,
          date: "1",
          creator: "someone"
        }
      ],
      currentAns: 0
    };
  },
  mounted: function() {
    this.GET_question();
    jQuery("#load-content").visibility({
      once: false,
      observeChanges: true,
      onBottomVisible: async () => {
        await this.GET_answer();
      }
    });
    jQuery("._ans-btn").visibility({
      type: "fixed",
      offset: 15
    });
  },
  methods: {
    async GET_question() {
      try {
        let response = await Api().get(`/question/${this.$route.params.id}`);
        this.Question = response.data;
        await this.GET_answer();
      } catch (error) {
        console.log(error);
      }
    },
    async GET_answer() {
      console.log("getting ans");
      if (!this.Question.answers.length) return;
      if (this.currentAns >= this.Question.answers.length) return;
      else {
        let response = await Api().get(
          `answer/${this.Question.answers[this.currentAns]}`
        );
        this.Answers.push(response.data);
        this.currentAns++;
      }
    }
  },
  components: {
    voterButton,
    answerSection,
    tagsComponent
  }
};
</script>

<style scoped>
._ans-btn {
  transition: all 0.3s;
}
/* change style */
.fixed._ans-btn {
  transform: translateX(-540%);
  transition: all 0.5s;
}
</style>
