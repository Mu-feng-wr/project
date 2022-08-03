<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="用户名：" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="性别：">
        <el-select v-model="formData.sex" style="width:100%;" placeholder="请选择性别" clearable>
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否可用：">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="登录账号：" prop="user">
        <el-input v-model="formData.user" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="登录密码：" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="formData.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="账号类型：" prop="type">
        <el-select v-model="formData.type" style="width:100%;" placeholder="请选择账号类型" clearable>
          <el-option label="小组" value="family" />
          <el-option label="成员" value="person" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.type=='person'" label="上级：">
        <el-select v-model="formData.pid" style="width:100%;" placeholder="请选择上级" clearable no-data-text="暂无数据">
          <el-option v-for="(item,index) in pList" :key="index" :label="item.userName" :value="item.id" />
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
import { saveUserInfo, getUserList, getUserInfo } from '@/api/user.js'
const CryptoJS = require('crypto-js')
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
        userName: { required: true, message: '请输入用户名', trigger: 'blur' },
        user: { required: this.formData.status === 1, message: '请输入登录', trigger: 'blur' },
        password: { required: this.formData.status === 1, message: '请输入用户名', trigger: 'blur' },
        type: { required: true, message: '请选择类型', trigger: 'blur' }
      }
    }
  },
  created() {
    getUserList({ type: 'family' }).then(res => {
      this.pList = res.data.list
    })
    this.title = '新增'
    if (this.id) {
      this.init()
      this.title = '编辑'
    }
  },
  methods: {
    init() {
      getUserInfo({ id: this.id }).then(res => {
        const bytes = CryptoJS.AES.decrypt(res.data.password, 'liang-wei-tao')

        this.formData = Object.assign({}, res.data, { password: res.data.password ? bytes.toString(CryptoJS.enc.Utf8) : '' })
      })
    },
    save() {
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          saveUserInfo(Object.assign({}, this.formData, { password: this.formData.password ? CryptoJS.AES.encrypt(this.formData.password, 'liang-wei-tao').toString() : '' })).then(res => {
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
