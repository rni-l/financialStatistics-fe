<template>
  <div class="u-staff-dialog">
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
import { apiStaffAdd, apiStaffUpdate, StaffItem, apiStaffGetDetailById, StaffAddParams} from '../../api/staff'
import { apiJobGetList } from '../../api/job'
import { apiStoreGetList } from '../../api/store'

const dicDataMap: ObjectKey = {
  jobId: 'jobList',
  storeCode: 'storeList'
}

@Component({
  components: {}
})
export default class Dialog extends Mixins(toggleShowMixin) {
  @Prop() id!: StaffItem['id']

  isAdd = true
  form: StaffAddParams = {
    name: '',
    storeCode: '',
    bonusRatio: 0,
    jobId: [],
    isIgnorePlatform: 1
  }
  jobList: CommonItem[] = []
  storeList: CommonItem[] = []

  get title() {
    return (this.isAdd ? '新增' : '修改') + '员工'
  }

  get formOptions() {
    return {
      ...formOptions,
      column: formOptions.column.map(v => ({
        ...v,
        dicData: dicDataMap[v.prop] ? this[dicDataMap[v.prop]] : v.dicData
      }))
    }
  }

  created() {
    this.getJobList()
    this.getStaffList()
  }

  reset() {
    this.form = {
      name: '',
      storeCode: '',
      bonusRatio: 0,
      jobId: [],
      isIgnorePlatform: 0
    }
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

  async getJobList() {
    const { isSuccess, data } = await apiJobGetList({ pageSize: 99999 })
    if (isSuccess) {
      this.jobList = data.list.map(v => ({
        ...v,
        label: v.name,
        value: v.id
      }))
    }
  }

  async getStaffList() {
    const { isSuccess, data } = await apiStoreGetList({ pageSize: 99999 })
    if (isSuccess) {
      this.storeList = data.list.map(v => ({
        ...v,
        label: v.name,
        value: v.code
      }))
    }
  }

  async handleSubmit(form: any, done: any) {
    const { isSuccess } = await (this.isAdd ? apiStaffAdd(this.form, { isLoading: true }) : apiStaffUpdate({ ...this.form, id: this.id }, { isLoading: true }))
    if (isSuccess) {
      this.$emit('update')
      this.$message.success(this.isAdd ? '添加成功' : '修改成功')
      this.curIsShow = false
    }
    done()
  }

  async getDetail() {
    const { isSuccess, data } = await apiStaffGetDetailById({ id: this.id }, { isLoading: true })
    if (isSuccess) {
      this.form = {
        name: data.name,
        storeCode: data.storeCode,
        bonusRatio: data.bonusRatio,
        jobId: data.jobs.map(v => v.id),
        isIgnorePlatform: data.isIgnorePlatform
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u-staff-dialog {}
</style>
