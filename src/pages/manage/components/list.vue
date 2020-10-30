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
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column  label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
        
      </el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
        <el-button type="primary" @click="upData(scope.row.uid)">编辑</el-button>
        <el-button type="danger" @click="userDel(scope.row.uid)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {reqManageDel} from '../../../util/request'
import { alertSuccess, alertWarning } from "@/util/alert";
export default {
    props:['list','info'],
  components: {},
  data() {
    return {
        value:true,
     
    };
  },
  methods: {
      userDel(uid){
          reqManageDel(uid).then(res=>{
            //   console.log(res);
            if(res.data.code==200){
               alertSuccess(res.data.msg)
               this.$emit('init')
            }else{
              alertWarning(res.data.msg)
            }
          })
      },
      upData(uid){
          this.info.title='编辑'
          this.info.isShow=true
          this.$emit('edit',uid)
        //   console.log(uid);
      }
  },
  mounted() {

  }
};
</script>
<style scoped>
</style>