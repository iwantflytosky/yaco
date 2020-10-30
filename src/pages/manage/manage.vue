<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" @init='getinit' ref='add'></v-add>
    <v-list :list='list' @init='getinit' :info="info" @edit='will($event)'></v-list>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage"> </el-pagination>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { reqManageList ,reqManageCount,reqManageDetail} from "../../util/request";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "管理员添加"
      },
      total:0,
      list:[],
      size:2,
      page:1
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.title='管理员添加';
      this.$refs.add.empty()
    },
    getinit(){
        reqManageCount().then(res=>{
             if(res.data.code==200){
          this.total=res.data.list[0].total
        }
        })
        this.getList()
    },
    getList() {
      reqManageList({size:this.size,page:this.page}).then(res => {
          if(res.data.code==200){
              let list=res.data.list?res.data.list:[]
              if(list.length==0&&this.page>1){
                  this.page--;
                  this.getList();
                  return;
              }
              this.list=list;
          }
      });
    },
    will(uid){
        this.$refs.add.getOne(uid)
        // reqManageDetail(uid).then(res=>{
        //     console.log(res);
        // })
    },
    // page 自带的事件参数 也就是页数
    changePage(page){
        this.page=page;
        this.getList()
    }
  },
  mounted() {
    this.getinit()
  }
};
</script>
<style scoped>
</style>