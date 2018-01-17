
const requestMethods = {
  data () {
    return {
      module: '',        // 模块名称
      tableData: [],     // 表格数据
      currentPage: 1,    // 当前页码
      limit: 10,         // 每页数据条数
      total: 0           // 数据总条数
    }
  },
  methods: {
    // 获取表格数据
    getList (url) {
      // 生成请求参数
      var data = {
        page: this.currentPage,
        rows: this.limit
      }
      return url(data).then(res => {
        console.log(res)
        // if (res.status === 200) {
        //   this.tableData = res.data.list
        //   this.total = res.data.total
        // } else {
        //   this.$toastMsg('error', '网络好像出了点问题！')
        // }
      })
    },
    // 页码改变事件处理程序
    currentPageChange(current) {
      this.currentPage = current
      this.getList()
    }
  }
}
export default requestMethods
