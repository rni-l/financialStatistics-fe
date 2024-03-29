<template>
  <div class="m-staff">
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
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button 
            @click.native="handleEditClick(scope.row)" 
            type="primary" size="mini">修改</el-button>
          <el-button 
            @click.native="handleDelete(scope.row)" 
            type="danger" size="mini">删除</el-button>
        </template>
        <template slot-scope="scope" slot="bonusRatio">{{ (scope.row.bonusRatio || 0.52) | formatPrice }}</template>
        <template slot-scope="scope" slot="isIgnorePlatform">{{ scope.row.isIgnorePlatform === 1 ? '不需要' : '需要' }}</template>
    </avue-crud>

    <u-dialog
      ref="dialog"
      :id="selectId"
      @update="handleUpdate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Ref } from 'vue-property-decorator'
import handlePageMixin from '@/mixins/handlePage'
import { apiStaffGetList, StaffItem, apiStaffDeleteById } from '@/api/staff'
import UDialog from './Dialog.vue'
import { options } from './indexConfig'

@Component({
  components: {
    UDialog
  },
  filters: {
    formatPrice(val: number) {
      return parseFloat((val * 100).toFixed(2)) + '%'
    }
  }
})
export default class Staff extends Mixins(handlePageMixin) {
  @Ref() readonly dialog!: UDialog
  list: StaffItem[] = []
  options = options
  selectId: StaffItem['id'] = 0

  async getList() {
    const { currentPage, pageSize } = this.page
    const { isSuccess, data } = await apiStaffGetList({
      curPage: currentPage,
      pageSize
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

  handleEditClick(row: StaffItem) {
    this.selectId = row.id
    this.$nextTick(() => {
      this.dialog.show(true)
    })
  }

  handleUpdate() {
    this.getList()
  }

  async handleDelete(row: StaffItem) {
    this.$confirm('是否确定删除该数据?', '提示').then(async () => {
      const { isSuccess } = await apiStaffDeleteById({ id: row.id }, { isLoading: true })
      if (isSuccess) {
        this.$message.success('删除成功')
        this.handleUpdate()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.m-staff {}
</style>
