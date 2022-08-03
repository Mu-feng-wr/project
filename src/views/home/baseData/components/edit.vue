<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="编号：">
        <el-input v-model="formData.code" placeholder="请输入编号" />
      </el-form-item>
      <el-form-item label="上级：">
        <el-select v-model="formData.pid" style="width:100%;" placeholder="请选择上级" clearable no-data-text="暂无数据">
          <el-option v-for="(item,index) in pList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBaseDataList, saveBaseData, getBaseData } from '@/api/baseData.js'
import { changeToTreeData } from '@/utils/index.js'
export default {
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
    },
    type: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      title: '',
      formData: { status: 1 },
      pList: []
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
        name: { required: true, message: '请输入名称', trigger: 'blur' }
      }
    }
  },
  created() {
    getBaseDataList({ type: this.type }).then(res => {
      this.pList = changeToTreeData(res.data.list)
      if (this.id) {
        const index = this.pList.findIndex(item => item.id === this.id)
        if (index >= 0) {
          this.pList.splice(index, 1)
        }
      }
    })
    this.title = '新增'
    if (this.id) {
      this.init()
      this.title = '编辑'
    }
  },
  methods: {
    init() {
      getBaseData({ id: this.id }).then(res => {
        this.formData = res.data
      })
    },
    save() {
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          saveBaseData(Object.assign({}, this.formData, { type: this.type })).then(res => {
            this.$emit('reload')
            this.$message.success('保存成功')
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
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
