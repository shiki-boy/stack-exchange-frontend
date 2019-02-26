<template>
  <div class="two wide column" style="text-align:center;">
    <button class="circular ui icon inverted purple button">
      <i class="arrow up icon"></i>
    </button>
    <div class="ui tiny statistic">
      <div class="value">{{votes}}</div>
      <div class="label">Votes</div>
    </div>
    <button class="circular ui icon inverted purple button">
      <i class="icon arrow down"></i>
    </button>
  </div>
</template>

<script>
export default {
  props:["votes"]
};
</script>