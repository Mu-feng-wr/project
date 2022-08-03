<template>
  <div class="conPage">
    <el-container class="conPage">
      <el-header class="header">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary" @click="load">刷新</el-button>
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
          <el-table-column prop="userName" label="用户名" />
          <el-table-column align="center" prop="user" label="登录账号" />
          <el-table-column align="center" prop="sec" label="性别">
            <template slot-scope="{row}">
              <div v-if="row.sex===1">男</div>
              <div v-if="row.sex===2">女</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="phone" label="联系电话" />
          <el-table-column align="center" prop="status" label="是否可用">

            <template slot-scope="{row}">
              <div v-if="row.status===1">是</div>
              <div v-if="row.status===2">否</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="danger" @click="deleted(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <edit v-if="edit_dialog" :id="editId" v-model="edit_dialog" @reload="load" />
  </div>

</template>
<script>
import { getUserList, deleteUserInfo } from '@/api/user.js'
import edit from '@/views/home/userList/components/edit.vue'
import { changeToTreeData } from '@/utils/index.js'
export default {
  components: {
    edit
  },
  data() {
    return {
      headerClass: { textAlign: 'center' },
      tableData: [],
      loading: false,
      edit_dialog: false,
      editId: ''
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.loading = true
      getUserList().then(res => {
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
        deleteUserInfo({ id: row.id }).then(res => {
          this.$message.success('删除成功！')
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
}
.main{
  padding: 0;
}
</style>
