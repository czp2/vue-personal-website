export default {
  methods: {
    indexMethod(index) {
      return index + 1 + this.searchForm.limit * (this.searchForm.page - 1)
    },
    countPage() {
      // 记录总页数
      // 总页数=删除后的总记录数/分页条数
      const totalPage = Math.ceil((this.total - 1) / this.searchForm.limit)
      // 记录当前页码
      // 记住删除最后一条数据时当前码是最后一页
      const pageNum = this.searchForm.page > totalPage ? totalPage : this.searchForm.page
      // 重新记录当前页码
      this.searchForm.page = pageNum < 1 ? 1 : pageNum
    },
    countMutiplePage() {
      // 记录总页数
      // 总页数=删除后的总记录数/分页条数
      const totalPage = this.multipleSelection.length ? Math.ceil((this.total - this.multipleSelection.length) / this.searchForm.limit) : Math.ceil((this.total - 1) / this.searchForm.limit)
      // 记录当前页码
      // 记住删除最后一条数据时当前码是最后一页
      const pageNum = this.searchForm.page > totalPage ? totalPage : this.searchForm.page
      // 重新记录当前页码
      this.searchForm.page = pageNum < 1 ? 1 : pageNum
    }
  }
}