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
            total:'goods/total',
            size:'goods/size',
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
        title: "商品添加"
      },
      
    };
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.title='商品添加';
      this.$refs.add.empty();
    },
    will(id){
        this.$refs.add.getOne(id)
    },
    changePage(page){
       this.changePageAction(page)
    },
    ...mapActions({
        initTotal:'goods/reqTotal',
        reqList:'goods/reqList',
        changePageAction:'goods/changePageAction'
    })
  },
  mounted() {
    this.initTotal();
    this.reqList();
    // console.log(this.total,this.size);
  }
};
</script>
<style scoped>
</style>