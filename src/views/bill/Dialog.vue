<template>
  <div class="u-bill-dialog">
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
        <template slot="ratio">
          <div class='staff-wrap'>
            <div v-for="v in staffInfo" :key="v.staffId" class="staff-item">
              <div class="label">{{ v.name }}</div>
              <el-input-number type="number" v-model.trim="v.ratio" />
            </div>
          </div>
        </template>
      </avue-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator'
import toggleShowMixin from '@/mixins/toggleShow'
import { formOptions } from './indexConfig'
import { ObjectKey } from '../../../types/common'
import { apiBillAdd, apiBillUpdate, BillItem, apiBillGetDetailById, BillAddParams, BillStaffInfo } from '../../api/bill'
import { apiStaffGetList, StaffItem } from '../../api/staff'

const dicDataMap: ObjectKey = {
  staffInfo: 'staffList'
}
interface BillStaffInfoFull extends BillStaffInfo {
  name: string
}
interface Form {
  name: BillItem['name']
  price: BillItem['price']
  staffInfo: number[]
  openDate: BillItem['openDate']
}
@Component({
  components: {}
})
export default class Dialog extends Mixins(toggleShowMixin) {
  @Prop() id!: BillItem['id']

  isAdd = true
  form: Form = {
    name: '',
    price: 0,
    openDate: Date.now(),
    staffInfo: []
  }
  staffInfo: BillStaffInfoFull[] = []
  staffList: CommonItem[] = []

  get title() {
    return (this.isAdd ? '新增' : '修改') + '账单'
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

  @Watch('form.staffInfo')
  onStaffInfo(vals: StaffItem['id'][]) {
    this.staffInfo = vals.map(v => {
      const obj = this.staffInfo.find(staff => staff.staffId === v)
      const staff = this.staffList.find(staff => staff.value === v)
      if (obj) return obj
      return {
        ratio: 0,
        name: staff ? staff.label : '',
        staffId: v
      }
    })
  }

  created() {
    this.getStaffList()
  }

  reset() {
    this.form = {
      name: '',
      price: 0,
      openDate: Date.now(),
      staffInfo: []
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

  async getStaffList() {
    const { isSuccess, data } = await apiStaffGetList({ pageSize: 99999 })
    if (isSuccess) {
      this.staffList = data.list.map(v => ({
        ...v,
        label: v.name,
        value: v.id
      }))
    }
  }

  async handleSubmit(form: any, done: any) {
    // 检查比率是否满 1
    const ratioVal = Math.floor(this.staffInfo.reduce((acc, cur) => acc + cur.ratio, 0) * 100) / 100
    if (ratioVal > 1) {
      done()
      return this.$message.warning('比率总和不能超过 1')
    } else if (ratioVal < 1) {
      done()
      return this.$message.warning('比率总和不能小于 1')
    }
    const { name, price, openDate } = this.form
    const obj = {
      name,
      price,
      openDate,
      staffInfo: this.staffInfo.map(v => ({ ratio: v.ratio, staffId: v.staffId }))
    }
    const { isSuccess } = await (this.isAdd ? apiBillAdd(obj, { isLoading: true }) : apiBillUpdate({ ...obj, id: this.id }, { isLoading: true }))
    if (isSuccess) {
      this.$emit('update')
      this.$message.success(this.isAdd ? '添加成功' : '修改成功')
      this.curIsShow = false
    }
    done()
  }

  async getDetail() {
    const { isSuccess, data } = await apiBillGetDetailById({ id: this.id }, { isLoading: true })
    if (isSuccess) {
      this.staffInfo = data.staffs.map(v => ({
        name: v.name,
        staffId: v.id,
        ratio: v.ratio
      }))
      this.form = {
        name: data.name,
        price: data.price,
        openDate: data.openDate,
        staffInfo: data.staffs.map(v => v.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u-bill-dialog {
  .staff-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    .staff-item {
      @include f-center;
      width: 45%;
      padding-bottom: 15px;
      &:nth-child(odd) {
        // padding-right: 8px;
      }
      .label {
        white-space: nowrap;
        padding-right: 8px;
      }
    }
  }
}
</style>
