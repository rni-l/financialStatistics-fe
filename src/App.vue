<template>
  <div id="app">
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
  },

  mounted() {
  }
};
</script>

<style lang="scss">
#app {
  // min-height: 100vh;
  width: 100%;
  // overflow-x: hidden;
}
</style>
