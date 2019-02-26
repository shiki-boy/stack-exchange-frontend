<template>
  <div class="_stat">
    <h3 class="ui top attached block header">Site Stats</h3>
    <div class="ui attached segment">
      <div v-for="stat in stats" :key="stat.id">
        <div class="ui small blue horizontal statistic">
          <div class="value">{{stat.value}}</div>
          <div class="label">{{stat.name}}</div>
          <div class="ui section divider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        { id: 1, name: "Questions", value: "2217" },
        { id: 2, name: "Answers", value: "2522" },
        { id: 3, name: "Answered", value: "2422" }
      ]
    };
  }
};
</script>

<style scoped>
._stat{
    box-shadow: 0px 1px 16px -6px rgb(129, 128, 128);
}

</style>
