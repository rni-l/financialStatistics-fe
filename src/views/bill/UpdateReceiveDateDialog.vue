<template>
  <div class="u-bill-updateReceiveDateDialog">
    <el-dialog
      title="修改订单的收款时间"
      width="90%"
      :visible.sync="curIsShow"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="value"
            type="datetime"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button 
            @click.native="handleUpdate" 
            type="primary" size="mini">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator'
import toggleShowMixin from '@/mixins/toggleShow'
import { apiStatisticsStaffSalryPath } from '../../api/statistics'
import { apiBillUpdateReceiveDate } from '../../api/bill'

@Component({
  components: {}
})
export default class UpdateReceiveDateDialog extends Mixins(toggleShowMixin) {
  value = Date.now()

  async handleUpdate() {
    const { isSuccess } = await apiBillUpdateReceiveDate({ id: this.id, receiveDate: this.value }, { isLoading: true })
    if (isSuccess) {
      this.$emit('update')
      this.$message.success('修改成功')
      this.value = Date.now()
      this.curIsShow = false
    }
  }

  handleClose() {
    this.curIsShow = false
  }
}
</script>
