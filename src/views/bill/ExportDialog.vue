<template>
  <div class="u-bill-exportDialog">
    <el-dialog
      title="导出 Excel"
      width="90%"
      :visible.sync="curIsShow"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="选择时间范围">
          <el-date-picker
            v-model="values"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button 
            @click.native="handleExport" 
            type="primary" size="mini">导出 excel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator'
import toggleShowMixin from '@/mixins/toggleShow'
import { apiStatisticsStaffSalryPath } from '../../api/statistics'

@Component({
  components: {}
})
export default class ExportDialog extends Mixins(toggleShowMixin) {
  values: number[] = []

  async handleExport() {
    window.open(apiStatisticsStaffSalryPath + `?startDate=${this.values[0]}&endDate=${this.values[1]}`)
  }

  handleClose() {
    this.curIsShow = false
  }
}
</script>

<style lang="scss" scoped>
.u-bill-exportDialog {
}
</style>
