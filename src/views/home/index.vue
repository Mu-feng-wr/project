<template>
  <el-container class="container">
    <el-aside class="aside">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="selectMenu"
      >
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="userList">用户信息</el-menu-item>
        <el-menu-item index="baseData">基础数据</el-menu-item>
        <el-menu-item index="bookKeeping">记账明细</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component :is="componentName" />
    </el-main>
  </el-container>
</template>

<script>
import userList from '@/views/home/userList/index.vue'
import baseData from '@/views/home/baseData/index.vue'
import bookKeeping from '@/views/home/bookKeeping/index.vue'
export default {
  components: {
    userList,
    baseData,
    bookKeeping
  },
  data() {
    return {
      defaultActive: 'userList',
      componentName: 'userList'
    }
  },
  methods: {
    selectMenu(index, indexPath) {
      this.componentName = index
    }
  }
}
</script>

<style lang="scss">
  .container{
    width: 100%;
    height: 100%;
    padding: 0 !important;
    background: rgb(250, 250, 250);
  }
  .aside{
    padding:  0;
    margin: 0;
    width: 150px !important;
  }
</style>
