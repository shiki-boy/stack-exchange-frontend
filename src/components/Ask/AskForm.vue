<template>
  <div>
    <!-- // * first grid -->
    <div class="ui grid internally celled">
      <div class="row">
        <!--//  ! first  -->
        <div class="left floated four wide column">
          <h2>Ask a Question</h2>
        </div>
      </div>
      <div class="row">
        <div class="eleven wide column">
          <!-- // ! FORM -->
          <div class="ui large form">
            <div class="field" :class="{'error' : $v.question_heading.$error}">
              <label>Question Heading</label>
              <textarea
                id="question-heading"
                @input="$v.question_heading.$touch()"
                v-model.trim="question_heading"
                data-content="q h validations"
                data-position="top center"
                data-variation="inverted"
                rows="2"
                name="question_heading"
                @click="currentInfo = 'questionHeadingInfo'"
              ></textarea>
            </div>
            <div class="field" :class="{'error' : $v.question.$error}">
              <label>Question</label>
              <textarea
                id="question"
                data-content="questions validations"
                data-position="top center"
                data-variation="inverted"
                v-model.trim="question"
                @input="$v.question.$touch()"
                name="question"
                @click="currentInfo = 'questionInfo'"
              ></textarea>
            </div>
            <div class="field" :class="{'error': $v.tags.$error}">
              <label>Tags</label>
              <input
                id="tags"
                data-content="tags validations"
                data-position="top center"
                data-variation="inverted"
                v-model.trim="tags"
                @input="$v.tags.$touch()"
                type="text"
                name="tags"
                @click="currentInfo = 'tagsInfo'"
              >
            </div>
          </div>
          <div class="ui hidden divider"></div>
          <div class="column">
            <button
              class="ui primary button"
              :disabled="$v.$invalid"
              @click="submit()"
            >Post Question</button>
            <button
              @click="showValidationsInfo()"
              class="circular ui icon basic teal button right floated"
            >
              <i class="icon question"></i>
            </button>
          </div>
        </div>
        <div class="five wide column">
          <transition name="fade" mode="out-in">
            <component :is="currentInfo"></component>
          </transition>
        </div>
      </div>
      <div class="row">
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import qhInfo from "./qhInfo.vue";
import qInfo from "./qInfo.vue";
import tagsInfo from "./tagsInfo.vue";
import { required, minLength } from "vuelidate/lib/validators";
import jQuery from "jquery";
import semantic from "semantic-ui-css";
import Api from "../../services/Api";

export default {
  data() {
    return {
      question: "",
      question_heading: "",
      tags: "",
      currentInfo: "questionHeadingInfo"
    };
  },
  validations: {
    question: {
      required,
      minLength: minLength(20)
    },
    tags: {
      required,
      minLength: minLength(20)
    },
    question_heading: {
      required,
      minLength: minLength(20)
    }
  },
  mounted: function() {},
  methods: {
    showValidationsInfo() {
      jQuery("#question,#tags,#question-heading").popup("show");
    },
    submit() {
      Api()
        .post("/createQuestion",{
            q_h: this.question_heading,
            q: this.question,
            tags: this.tags
        })
        .then(response => {
          console.log(response.data);
        });
    }
  },
  components: {
    questionHeadingInfo: qhInfo,
    questionInfo: qInfo,
    tagsInfo: tagsInfo
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
