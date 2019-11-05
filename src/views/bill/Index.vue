<template>
  <div class="m-bill">
    <avue-crud
        :data="list"
        :option="options"
        :page="page"
        @refresh-change="handleRefreshChange"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        @search-reset="handleSearchReset"
        @search-change="handleSearchChange"
      >
        <template slot-scope="scope" slot="menuLeft">
          <el-button 
            @click.native="handleAdd(scope)" 
            type="primary" size="mini">新增</el-button>
          <el-button 
            @click.native="handleExport(scope)" 
            type="primary" size="mini">导出 excel</el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button 
            @click.native="handleEditClick(scope.row)" 
            type="primary" size="mini">修改</el-button>
          <el-button
            v-if="scope.row.status === 1"
            @click.native="handleUpdateReceiveDate(scope.row)" 
            type="primary" size="mini">修改收款时间</el-button>
          <el-button
            v-if="scope.row.status !== 1"
            @click.native="handleUpdateStatus(scope.row)" 
            type="primary" size="mini">确认收款</el-button>
          <el-button 
            @click.native="handleDelete(scope.row)" 
            type="danger" size="mini">删除</el-button>
        </template>
        <template slot-scope="scope" slot="status">{{ scope.row.status === 1 ? '已收款' : '未收款' }}</template>
    </avue-crud>

    <u-dialog
      ref="dialog"
      :id="selectId"
      @update="handleUpdate"
    />

    <export-dialog
      :isShow.sync="isShowExportDialog"
      ref="exportDialog"
    />

    <export-dialog
      :isShow.sync="isShowUpdateReceiveDateDialog"
      :id="selectId"
      @update="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Ref } from 'vue-property-decorator'
import handlePageMixin from '@/mixins/handlePage'
import { apiBillGetList, BillItem, apiBillDeleteById, apiBillUpdateStautsById } from '@/api/bill'
// import { apiStatisticsStaffSalryPath } from '@/api/statistics'
import UDialog from './Dialog.vue'
import ExportDialog from './ExportDialog.vue'
import UpdateReceiveDateDialog from './UpdateReceiveDateDialog.vue'
import { options } from './indexConfig'

@Component({
  components: {
    UDialog,
    ExportDialog,
    UpdateReceiveDateDialog
  },
  filters: {
    formatPrice(val: number) {
      return parseFloat((val * 100).toFixed(2)) + '%'
    }
  }
})
export default class Bill extends Mixins(handlePageMixin) {
  @Ref() readonly dialog!: UDialog
  list: BillItem[] = []
  options = options
  isShowExportDialog = false
  isShowUpdateReceiveDateDialog = false
  selectId: BillItem['id'] = 0

  async getList() {
    const { currentPage, pageSize } = this.page
    const { isSuccess, data } = await apiBillGetList({
      curPage: currentPage,
      pageSize,
      ...this.search,
      order: 'open_date',
      orderType: 'DESC'
    })
    if (isSuccess) {
      this.page.total = data.count
      this.list = data.list
    }
  }

  created() {
    this.getList()
  }

  handleAdd() {
    this.dialog.reset()
    this.dialog.show(false)
  }

  handleUpdateReceiveDate({ id }: BillItem) {
    this.selectId = id
    this.isShowUpdateReceiveDateDialog = true
  }

  handleEditClick(row: BillItem) {
    this.selectId = row.id
    this.$nextTick(() => {
      this.dialog.show(true)
    })
  }

  handleUpdate() {
    this.getList()
  }

  async handleDelete(row: BillItem) {
    this.$confirm('是否确定删除该数据?', '提示').then(async () => {
      const { isSuccess } = await apiBillDeleteById({ id: row.id }, { isLoading: true })
      if (isSuccess) {
        this.$message.success('删除成功')
        this.handleUpdate()
      }
    })
  }

  async handleUpdateStatus(row: BillItem) {
    const { isSuccess } = await apiBillUpdateStautsById({ id: row.id }, { isLoading: true })
    if (isSuccess) {
      this.$message.success('操作成功')
      this.handleUpdate()
    }
  }

  async handleExport() {
    // window.open(apiStatisticsStaffSalryPath)
    this.isShowExportDialog = true
  }
}
</script>

<style lang="scss" scoped>
.m-bill {}
</style>
