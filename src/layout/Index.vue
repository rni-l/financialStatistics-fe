<template>
  <div class="g-layout">
    <business-container
      :menuList="menuList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BusinessContainer from '@components/common/business-container/main.vue';
import { menuList } from '@/config/menuList.ts'

@Component({
  components: {
    BusinessContainer
  }
})
export default class Layout extends Vue {
  menuList = menuList
}
</script>

<style lang="scss" scoped>
.g-layout {}
</style>
