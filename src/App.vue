<template>
  <div>
    <app-header></app-header>
    <!-- <div class="ui hidden divider"></div> -->
    <div class="ui internally celled grid">
      <div class="row">
        <div class="three wide column">
          <vertical-menu></vertical-menu>
        </div>
        <div v-show="!isTagsRoute && !isAskRoute" class="ten wide column">
          <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <div v-show="!isTagsRoute && !isAskRoute" class="three wide column">
          <transition name="slide-fade" mode="out-in">
            <router-view name="info-section"></router-view>
          </transition>
        </div>
        <div v-show="isTagsRoute" class="thirteen wide column">
          <transition name="slide-fade" mode="out-in">
            <router-view name="tags-view"></router-view>
          </transition>
          <!-- <router-view name="tags-view"></router-view> -->
        </div>
        <div v-show="isAskRoute" class="thirteen wide column">
          <transition name="slide-fade" mode="out-in">
            <router-view name="ask-view"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import VMenu from "./components/VerticalMenu.vue";

export default {
  data() {
    return {
      isTagsRoute: false,
      isAskRoute: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/tags") this.isTagsRoute = true;
      else this.isTagsRoute = false;
      if (to.path == "/ask") this.isAskRoute = true;
      else this.isAskRoute = false;
    }
  },
  components: {
    appHeader: Header,
    verticalMenu: VMenu
  },
  mounted() {
    if (this.$route.path == "/tags") this.isTagsRoute = true;
    else this.isTagsRoute = false;
  },
  created(){
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
body::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(100, 64, 231, 0.333);
}

body::-webkit-scrollbar-thumb {
  background-color: #12d3e0;
  border-radius: 10px;
}

body::-webkit-scrollbar-track {
  padding: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(253, 253, 255, 0.993);
}
</style>
