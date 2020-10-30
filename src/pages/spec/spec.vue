<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info"  ref='add'></v-add>
    <v-list :info="info"  @edit='will($event)'></v-list>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage"> </el-pagination>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            total:'spec/total',
            size:'spec/size',
        })
    },
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "规格添加"
      },
      
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.title='规格添加';
      this.$refs.add.empty();
      
    },
    will(id){
        this.$refs.add.getOne(id)
    },
    changePage(page){
       this.changePageAction(page)
    },
    ...mapActions({
        initTotal:'spec/reqTotal',
        reqList:'spec/reqList',
        changePageAction:'spec/changePageAction'
    })
  },
  mounted() {
    // this.reqList()
    this.initTotal()
  }
};
</script>
<style scoped>
</style>