<template>
  <div class="basic-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  name: 'LuBasicContainer'
})
export default class LuBasicContainer extends Vue {
}
</script>

<style lang="scss" scoped>
.basic-container {
  padding: 20px;
  border-radius: 6px;
}
</style>
