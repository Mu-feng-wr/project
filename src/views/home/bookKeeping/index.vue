<template>
  <div class="conPage">
    <el-container class="conPage">
      <el-header class="header">
        <div>
          <el-button type="primary" @click="add">新增</el-button>
          <el-button type="primary" @click="load">刷新</el-button>
        </div>
        <div>
          <el-radio-group v-model="timeType" @change="changeTimeType">
            <el-radio-button label="month">月</el-radio-button>
            <el-radio-button label="day">日</el-radio-button>
          </el-radio-group>
          <el-divider direction="vertical" />
          <el-date-picker v-if="timeType=='month'" v-model="time" value-format="yyyy-MM" style="width:300px;" type="month" placeholder="选择月" @change="load" />
          <el-date-picker v-if="timeType=='day'" v-model="time" value-format="yyyy-MM-dd" style="width:300px;" type="date" placeholder="选择日期" @change="load" />
          <el-divider direction="vertical" />
          <el-select v-model="type" placeholder="请选择" @change="load">
            <el-option label="支出" value="expenditure" />
            <el-option label="收入" value="income" />
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
          <el-table-column align="center" prop="userName" label="用户" />
          <el-table-column align="center" prop="useTime" label="时间" />
          <el-table-column align="right" prop="amount" label="金额">
            <template slot-scope="{row}">
              <div>{{ fmoney(row.amount) }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="type" label="类型">

            <template slot-scope="{row}">
              <div v-if="row.type=='income'">收入</div>
              <div v-if="row.type=='expenditure'">支出</div>
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" label="操作">
            <template slot-scope="{row}">
              <el-button type="danger" @click="deleted(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="footer">
        <div><el-tag>收入</el-tag><span>{{ fmoney(statisticsObj.expenditureSum) }}</span></div>
        <div><el-tag>支出</el-tag><span>{{ fmoney(statisticsObj.incomeSum) }}</span></div>
        <div><el-tag>合计</el-tag><span>{{ fmoney(statisticsObj.statistics) }}</span></div>
      </el-footer>
    </el-container>
    <edit v-if="edit_dialog" :id="editId" v-model="edit_dialog" @reload="reload" />
  </div>
</template>
<script>
import { fmoney } from '@/utils'
import { getBookList, deleteBookData, getBookStatistics } from '@/api/bookkeeping.js'
import edit from '@/views/home/bookKeeping/components/edit.vue'
import { parseTime } from '@/utils/index.js'
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
      typeList: [],
      edit_dialog: false,
      editId: '',
      user: this.$store.getters,
      fmoney: fmoney,
      timeType: 'month',
      time: '',
      statisticsObj: {}
    }
  },
  created() {
    this.time = parseTime(new Date(), '{y}-{m}')
    this.load()
  },
  methods: {
    load() {
      this.reload()
      this.loadStatistics()
    },
    reload() {
      this.loading = true
      getBookList({ userId: this.user.userId, time: this.time }).then(res => {
        this.tableData = res.data.list
      }).finally(() => {
        this.loading = false
      })
    },
    loadStatistics() {
      getBookStatistics({ userId: this.user.userId, time: this.time }).then(res => {
        this.statisticsObj = res.data
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
        deleteBookData({ id: row.id }).then(res => {
          this.$message.success('删除成功!')
          this.load()
        })
      })
    },
    rowDbClick(row) {
      this.editId = row.id
      this.edit_dialog = true
    },
    changeTimeType(val) {
      if (val === 'month') {
        this.time = parseTime(new Date(), '{y}-{m}')
      } else if (val === 'day') {
        this.time = parseTime(new Date(), '{y}-{m}-{d}')
      }
      this.load()
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
.footer{
  height: 40px !important;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  div{
    margin: 0 20px;
  }
  span{
    margin: 0 5px;
    color: #1890ff;
  }
}
</style>
