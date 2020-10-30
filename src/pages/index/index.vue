<template>
  <div>
     
    <el-container>
      <el-aside width="180px">
        <el-col :span="12">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            background-color="#20222a"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
          <el-menu-item index="/index">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1" >
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/menu">菜单管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manage">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cate">商品分类</el-menu-item>
                <el-menu-item index="/spec">商品规格</el-menu-item>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/member">会员管理</el-menu-item>
                <el-menu-item index="/banner">轮播图管理</el-menu-item>
                <el-menu-item index="/seckill">秒杀活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header><span>admin</span> <i class="el-icon-setting"></i></el-header>
        <el-main> <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb><div class="mainbox"><router-view></router-view></div></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
   
  },
  mounted() {}
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}
.el-aside {
  height: 100vh;
  background-color: #20222a;
  color: #333;
  line-height: 200px;
}
.el-menu {
    border-right: none;
    /* width: 180px; */
}
.el-col-12 {
    width: 100%;
}
.mainbox{
  margin: 30px;
}
</style>