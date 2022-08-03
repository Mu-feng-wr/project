<template>
  <div class="conPage">
    <el-container class="conPage">
      <el-header class="header">
        <div>
          <el-button type="primary" @click="add">新增</el-button>
          <el-button type="primary" @click="load">刷新</el-button>
        </div>
        <div>
          <el-select v-model="type" placeholder="请选择" @change="load">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
      </el-header>
      <el-main class="main">
        <el-table
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          stripe
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          border
          :header-cell-style="headerClass"
          :data="tableData"
          style="width: 100%;height:100%;"
          empty-text="暂无数据"
          @row-dblclick="rowDbClick"
        >
          <el-table-column align="center" type="index" width="100" />
          <el-table-column prop="name" label="名称" />
          <el-table-column align="center" prop="code" label="编号" />
          <el-table-column width="200" align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="danger" @click="deleted(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <edit v-if="edit_dialog" :id="editId" v-model="edit_dialog" :type="type" @reload="load" />
  </div>
</template>
<script>
import { getBaseDataList, deleteBaseData } from '@/api/baseData.js'
import edit from '@/views/home/baseData/components/edit.vue'
import { changeToTreeData } from '@/utils/index.js'
export default {
  components: {
    edit
  },
  data() {
    return {
      headerClass: { textAlign: 'center' },
      loading: false,
      tableData: [],
      type: '',
      typeList: [
        { id: 'expenditure', name: '支出用途' },
        { id: 'income', name: '收入用途' }
      ],
      edit_dialog: false,
      editId: ''
    }
  },
  created() {
    this.type = this.typeList[0].id
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      getBaseDataList({ type: this.type }).then(res => {
        this.tableData = changeToTreeData(res.data.list)
      }).finally(() => {
        this.loading = false
      })
    },
    add() {
      this.editId = ''
      this.edit_dialog = true
    },
    deleted(row) {
      this.$confirm('确认删除数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBaseData({ id: row.id }).then(res => {
          this.$message.success('删除成功!')
          this.load()
        })
      })
    },
    rowDbClick(row) {
      this.editId = row.id
      this.edit_dialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.conPage{
  width: 100%;
  height: 100%;
}
.header{
  padding: 0;
  height: 50px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main{
  padding: 0;
}
</style>
