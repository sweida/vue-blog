const mixinExportTable = {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    // 导出Excel
    handleDownload() {
      this.isLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = this.headerList
        const filterVal = this.filterList
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.tableName)
        this.isLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
  created() {

  }
}
export default mixinExportTable