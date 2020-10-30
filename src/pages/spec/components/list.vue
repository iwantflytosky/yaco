<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
      <el-table-column label="规格属性"> 
        <template slot-scope="scope">
         <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column  label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
        
      </el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
        <el-button type="primary" @click="upData(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="userDel(scope.row.id)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {reqSpecDel} from '../../../util/request'
import { alertSuccess, alertWarning } from "@/util/alert";
import {mapGetters,mapActions} from "vuex"
export default {
    props:['info'],
  components: {},
  computed:{
    ...mapGetters({
      list:"spec/list"
    })
  },
  
  methods: {
      userDel(id){
          reqSpecDel(id).then(res=>{
            //   console.log(res);
            if(res.data.code==200){
               alertSuccess(res.data.msg)
               this.reqList()
               this.reqTotal()
            }
          })
      },
      upData(id){
          this.info.title='编辑规格';
          this.info.isShow=true;
          this.$emit('edit',id);
      },
      ...mapActions({
        reqList:'spec/reqList',
        reqTotal:'spec/reqTotal'
      })
  },
  mounted() {
    this.reqList()
    // console.log(this.list);
  }
};
</script>
<style scoped>
</style>