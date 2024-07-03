<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="FOR_MAIN ? KEEPALIVE_FOR_MAIN : aliveList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<script setup>
import { ref } from 'vue'
import useRootStore from '@/store/rootStore'
const store = useRootStore()

const aliveList = ref(['menuTest1', 'menuTest2', 'menuTest3', 'menuTest4', 'menuTest5'])
const FOR_MAIN = store.FOR_MAIN
const KEEPALIVE_FOR_MAIN = store.KEEPALIVE_FOR_MAIN
</script>

<style>
.container {
  width: 50%;
  margin-left: 5%;
  height: 100vh;
  padding-top: 100px;
}
</style>
