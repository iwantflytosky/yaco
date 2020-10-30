<template>
  <div>
    <el-button type="success" @click="willAdd">添加</el-button>
    <v-add :info="info" :list='list' @init='getInit' ref='add'></v-add>
    <v-list :list='list' @init='getInit' @edit='updata($event)'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { reqRoleList } from "../../util/request";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "角色添加"
      },
      list:[]
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = true;
      this.info.title='角色添加';
      this.$refs.add.empty();
      // this.$refs.add.form.menus=[]
    },
    getInit() {
      reqRoleList().then(res => {
        // console.log(res.data.list);
        this.list = res.data.list;
      });
    },
    updata(id){
      this.info.isShow=true;
      this.info.title='角色编辑';
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
      this.getInit()
  }
};
</script>
<style scoped>
</style>