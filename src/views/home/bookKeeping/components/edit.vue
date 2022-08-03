<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="用户名：">
        <el-input v-model="formData.userName" disabled placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="金额：" prop="amount">
        <MoneyInput v-model="formData.amount" />
      </el-form-item>

      <el-form-item label="收支类型：" prop="type">
        <el-select v-model="formData.type" style="width:100%;" placeholder="请选择收支类型" @change="changeType">
          <el-option label="支出" value="expenditure" />
          <el-option label="收入" value="income" />
        </el-select>
      </el-form-item>
      <el-form-item :label="formData.type=='income'?'收入时间：':'支出时间：'" prop="time">
        <el-date-picker v-model="formData.time" style="width:100%;" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
      </el-form-item>
      <el-form-item :label="formData.type=='income'?'收入来源：':'支出用途：'" prop="typeId">
        <treeSelect
          ref="pid"
          v-model="formData.typeId"
          style="width:100%;"
          clearable
          :data="pList"
          node-key="id"
          :props="{ label: 'name', value: 'id' }"
          default-expand-all
          filterable
          show-add
          source-code="id"
          popper-append-to-body
          placeholder="请选择收支用途"
        />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="formData.remark" type="textarea" rows="3" placeholder="请输入备注" />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBaseDataList } from '@/api/baseData.js'
import { saveBookData, getBookData } from '@/api/bookkeeping.js'
import { changeToTreeData } from '@/utils/index.js'
import treeSelect from '@/components/ElTreeSelect/index.js'
import MoneyInput from '@/components/MoneyInput/index.vue'
import { parseTime } from '@/utils/index.js'
export default {
  components: {
    treeSelect,
    MoneyInput
  },
  model: {
    prop: 'opened',
    event: 'close'
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      title: '',
      formData: { },
      pList: [],
      user: this.$store.getters,
      incomeList: [],
      expenditureList: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.opened
      },
      set() {
        this.$emit('close', false)
      }
    },
    rules() {
      return {
        amount: { required: true, message: '请输入金额', trigger: 'blur' },
        type: { required: true, message: '请选择收支类型', trigger: 'blur' },
        typeId: { required: true, message: '请选择收支用途', trigger: 'blur' },
        time: { required: true, message: '请选择时间', trigger: 'blur' }
      }
    }
  },
  created() {
    getBaseDataList().then(res => {
      this.incomeList = changeToTreeData(res.data.list.filter(item => item.type === 'income'))
      this.expenditureList = changeToTreeData(res.data.list.filter(item => item.type === 'expenditure'))
      this.pList = this.expenditureList
    })
    this.formData = {
      status: 1,
      userId: this.user.userId,
      userName: this.user.userName,
      type: 'expenditure',
      time: parseTime(new Date(), '{y}-{m}-{d}')
    }
    this.title = '新增'
    if (this.id) {
      this.init()
      this.title = '编辑'
    }
  },
  methods: {
    init() {
      getBookData({ id: this.id }).then(res => {
        this.formData = res.data
        if (this.formData.type === 'expenditure') {
          this.pList = this.expenditureList
        } else if (this.formData.type === 'income') {
          this.pList = this.incomeList
        }
      })
    },
    save() {
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          saveBookData(Object.assign({}, this.formData)).then(res => {
            this.$emit('reload')
            this.$message.success('保存成功')
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    changeType(val) {
      this.$set(this.formData, 'typeId', '')
      if (val === 'expenditure') {
        this.pList = this.expenditureList
      } else if (val === 'income') {
        this.pList = this.incomeList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer{
  display: flex;
  justify-content: center;
}
::v-deep .el-dialog__body{
  padding: 10px 20px;
}
</style>
