import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HandlePageMixin extends Vue {
  search: any = {} // 搜索栏参数对象
  page = {
    pageSizes: [10, 20],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }
  /**
     * @description 重置页面
     * @param { Number } page 页码
     */
  resetPage(page: number = 1) {
    this.page.currentPage = page || 1;
    this.getList();
  }
  /**
   * @description avue-crud实例刷新按钮点击事件回调
   */
  handleRefreshChange() {
    this.getList();
  }

  /**
   * @description avue-crud实例页码按钮点击事件回调
   * @param { Nubmber } page 页码
   */
  handlePageChange(page: number) {
    this.resetPage(page);
  }

  /**
   * @description avue-crud实例页码按钮点击事件回调
   * @param { Nubmber } size 每页展示行数
   */
  handleSizeChange(size: number) {
    this.page.pageSize = size;
    this.resetPage();
  }

  /**
   * @description avue-crud实例页码按钮点击事件回调
   */
  handleSearchReset() {
    Object.keys(this.search).forEach(key => {
      this.search[key] = '';
    });
    this.resetPage();
  }

  /**
   * @description avue-crud实例页码按钮点击事件回调
   * @param { Object } params 搜索框参数
   */
  handleSearchChange(params: any) {
    this.search = Object.assign(this.search, params);
    this.resetPage();
  }
  /**
   * @description avue-crud实例排序按钮点击事件回调
   * @param { Object } val 
   */
  handleSortChange(val: any) {
    if (val.prop !== null) {
      this.search.orderBy = val.prop;
      if (val.order === 'descending') {
        this.search.xsc = 'DESC';
      } else if (val.order === 'ascending') {
        this.search.xsc = 'ASC';
      }
      this.resetPage();
    }
  }
}
