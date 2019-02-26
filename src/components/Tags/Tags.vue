<template>
  <div>
    <div class="ui grid">
      <div class="row">
        <!--//  ! first  -->
        <div class="left floated four wide column">
          <h2>Tags</h2>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="ui compact yellow message">
            <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
          </div>
        </div>
      </div>
      <div class="ui section divider"></div>
      <!-- // ! second -->
      <div class="row">
        <div class="column">
          <div class="ui icon input">
            <input type="text" placeholder="Search...">
            <i class="inverted circular search link icon"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <tag-info v-for="tag in Tags" :key="tag.name" :tag="tag"></tag-info>
      </div>
    </div>
  </div>
</template>

<script>
import TagInfo from "./TagInfo.vue";
import Api from '../../services/Api'

export default {
  data() {
    return {
        Tags:[
            {tag:"camera-camera",countQ:34},
            {tag:"camera-camera",countQ:34},
            {tag:"camera-camera",countQ:34},
            {tag:"pc",countQ:34},
            {tag:"pc",countQ:34},
            {tag:"pc",countQ:34},
            {tag:"ces",countQ:34},
            {tag:"mobile",countQ:34},
            {tag:"mobile",countQ:34},
            {tag:"mobile",countQ:34},
        ]
    };
  },
  components: {
    tagInfo: TagInfo
  },
  mounted(){
      Api().get('/tags')
      .then(response => this.Tags = response.data)
  }
};
</script>

<style scoped>
</style>
