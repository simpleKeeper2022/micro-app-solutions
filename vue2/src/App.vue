<template>
  <div class="container">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="FOR_MAIN ? KEEPALIVE_FOR_MAIN : aliveList">
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      aliveList: ['menuVue21', 'menuVue22', 'menuVue23', 'menuVue24']
    }
  },
  computed: {
    ...mapState(['KEEPALIVE_FOR_MAIN', 'FOR_MAIN'])
  }
}
</script>

<style>
.container {
  width: 50%;
  margin-left: 5%;
  height: 100vh;
  padding-top: 100px;
}
</style>
