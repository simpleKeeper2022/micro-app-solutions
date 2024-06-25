<template>
  <div class="subsystembox">
    <!-- 子应用入口 -->
    <div id="microapp"></div>
  </div>
</template>

<script>
export default {
  name: 'externalApp',
  data() {
    return {}
  },
  watch: {}
}
</script>
<script setup></script>
<style lang="scss" scoped>
#microapp {
  width: 100%;
  height: 100%;
}
.disshow {
  display: none;
}
.subsystembox {
  width: 100%;
  height: 100%;
}
</style>
