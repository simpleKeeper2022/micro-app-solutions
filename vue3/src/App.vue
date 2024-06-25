<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
