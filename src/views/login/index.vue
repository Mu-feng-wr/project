<template>
  <section class="container">
    <section class="login">
      <el-card class="box-card">
        <el-form ref="myForm" :rules="rules" :model="formData">
          <el-form-item prop="user">
            <el-input v-model="formData.user" class="t-m-t-10" prefix-icon="el-icon-user" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" />
          </el-form-item>
        </el-form>

        <div class="t-flex t-row-center">
          <el-button size="small" type="primary" @click="login">登录</el-button>
        </div>
      </el-card>
    </section>
  </section>
</template>
<script>
const CryptoJS = require('crypto-js')
export default {
  data() {
    return {
      name: '123',
      formData: {},
      rules: {
        user: { required: true, message: '请输入账号', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  mounted() {
    // console.log(this)
  },
  methods: {
    login() {
      this.$refs['myForm'].validate((valid) => {
        if (valid) {
          const data = {
            user: this.formData.user,
            password: CryptoJS.AES.encrypt(this.formData.password, 'liang-wei-tao').toString()
          }
          this.$store.dispatch('loginHandler', data).then(res => {
            this.$router.push({ path: '/home' })
          })
        } else {
          this.$nextTick(() => {
            var isError = this.$refs['myform'].$el.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/styles/public.scss";
.container{
  background: url(/static/img/login_back.jpg);
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
}
.login{
  width: 350px;
  height: 400px;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
