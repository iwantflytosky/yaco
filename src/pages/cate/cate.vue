<template>
<div>
    <el-button type="success" @click="willAdd">添加</el-button>
    <v-add :info='info' ref='add'></v-add>
    <v-list :info='info' @parentFun='willUpdata($event)'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
     info:{
         isShow:false,
         title:'添加分类'
     }
 }
},
methods:{
    willAdd(){
        this.info.isShow=true;
        this.info.title='添加分类'
    },
    willUpdata(id){
        this.$refs.add.getOne(id)
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>