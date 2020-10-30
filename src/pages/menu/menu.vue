<template>
  <div>
    <el-button type="success" @click="willAdd">添加</el-button>
    <v-add @init="getInit" ref="add" :info="info" :list="list"></v-add>
    <v-m :list="list" @init="getInit" :info="info" @edit="willUpdate($event)"></v-m>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vM from "./components/list";
import { reqMenuList} from "../../util/request";
export default {
  components: {
    vM,
    vAdd
  },
  data() {
    return {
      list: [],
      info:{
        isShow:false,
        title:'添加菜单'
      }
    };
  },
  methods: {
    willAdd(){
      this.info.isShow=true;
      this.info.title = "添加菜单";
     this.$refs.add.empty()
    },
    getInit() {
      reqMenuList().then(res => {
        
          this.list = res.data.list;
        
      });
    },
    willUpdate(id){
      this.info.isShow=true;
      this.info.title = "编辑菜单";
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    this.getInit();
    // console.log(this.list);
  }
};
</script>
<style scoped>
</style>