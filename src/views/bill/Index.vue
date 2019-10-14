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
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button 
            @click.native="handleEditClick(scope.row)" 
            type="primary" size="mini">修改</el-button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Ref } from 'vue-property-decorator'
import handlePageMixin from '@/mixins/handlePage'
import { apiBillGetList, BillItem, apiBillDeleteById } from '@/api/bill'
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
export default class Bill extends Mixins(handlePageMixin) {
  @Ref() readonly dialog!: UDialog
  list: BillItem[] = []
  options = options
  selectId: BillItem['id'] = 0

  async getList() {
    const { currentPage, pageSize } = this.page
    const { isSuccess, data } = await apiBillGetList({
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
}
</script>

<style lang="scss" scoped>
.m-bill {}
</style>
