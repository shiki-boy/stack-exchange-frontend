<template>
  <div>
    <div class="ui vertical menu">
      <router-link class="item" to="/home?tab=recent" exact>Home</router-link>
      <router-link class="item" to="/questions?tab=recent">Questions</router-link>
      <router-link class="item" to="/tags">Tags</router-link>
      <router-link class="item" to="/closed">Closed</router-link>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style scoped>
.ui.vertical.menu{
    position: absolute;
    float: left;
    margin-left: 5px;
}
</style>
