<template>
  <div class="u-store-dialog">
    <el-dialog
      :title="title"
      width="90%"
      :visible.sync="curIsShow"
      :before-close="handleClose">
      <avue-form
        ref="assetPackageSetting"
        v-model="form"
        @submit="handleSubmit"
        :option="formOptions"
      >
      </avue-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator'
import toggleShowMixin from '@/mixins/toggleShow'
import { formOptions } from './indexConfig'
import { ObjectKey } from '../../../types/common'
import { apiStoreAdd, apiStoreUpdate, StoreItem, apiStoreGetDetailById} from '../../api/store'

@Component({
  components: {}
})
export default class Dialog extends Mixins(toggleShowMixin) {
  @Prop() id!: StoreItem['id']

  isAdd = true
  formOptions = formOptions
  form = {
    name: '',
    code: '',
    address: '',
    remark: ''
  }

  get title() {
    return (this.isAdd ? '新增' : '修改') + '门店'
  }

  reset() {
    Object.keys(this.form).forEach((key) => {
      (this.form as any)[key] = ''
    })
  }

  show(isUpdate: boolean) {
    this.isAdd = !isUpdate
    this.curIsShow = true
    if (isUpdate) {
      this.getDetail()
    }
  }

  handleClose() {
    this.curIsShow = false
  }

  async handleSubmit(form: any, done: any) {
    const { isSuccess } = await (this.isAdd ? apiStoreAdd(this.form, { isLoading: true }) : apiStoreUpdate({ ...this.form, id: this.id }, { isLoading: true }))
    if (isSuccess) {
      this.$emit('update')
      this.$message.success(this.isAdd ? '添加成功' : '修改成功')
      this.curIsShow = false
    }
    done()
  }

  async getDetail() {
    const { isSuccess, data } = await apiStoreGetDetailById({ id: this.id }, { isLoading: true })
    if (isSuccess) {
      Object.keys(this.form).forEach((key) => {
        (this.form as any)[key] = (data as any)[key]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-store-dialog {}
</style>
