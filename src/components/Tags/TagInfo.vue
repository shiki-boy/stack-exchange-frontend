<template>
  <div class="_space">
    <router-link to class="ui large teal label">{{tag.tag}}
      <div class="detail">{{tag.countQ}}</div>
    </router-link >
  </div>
</template>

<script>
export default {
    props: ['tag']
};
</script>

<style scoped>
._space{
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>
