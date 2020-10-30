<template>
  <div>
    <el-dialog :title="this.info.title " :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择菜单" @change="change">
            <el-option label="请选择菜单" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 循环请求数据 -->
            <el-option v-for="item in list" :key='item.id' :label="item.title" :value="item.id"></el-option>
            

          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type===1" :label-width="formLabelWidth">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option value="el-icon-user-solid">
              <i class="el-icon-user-solid"></i>
            </el-option>
            <el-option value="el-icon-video-camera-solid">
              <i class="el-icon-video-camera-solid"></i>
            </el-option>
            <el-option value="el-icon-s-home">
              <i class="el-icon-s-home"></i>
            </el-option>
            <el-option value="el-icon-phone">
              <i class="el-icon-phone"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            :active-value="1"  :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow= false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加菜单'">确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {indexRoutes} from "../../../router/index";
import {alertSuccess,alertWarning} from '@/util/alert'
import {reqMenuAdd,reqMenuUpdata,reqMenuDetail} from '../../../util/request'
import {mapGetters,mapActions}from 'vuex'
export default {
  props:['info','list'],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1
      },
      formLabelWidth: "120px",
      indexRoutes,
    };
  },
  methods: {
    change(){
      if(this.form.pid===0){
        this.form.type = 1;
      }else{
        this.form.type = 2;
      }
    },
    empty(){
      this.form={
        pid: 0,
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1
      }
    },
    add(){
      this.info.isShow = false;
      console.log(this.form);
      reqMenuAdd(this.form).then(res=>{
          if(res.data.code==200){
            alertSuccess(res.data.msg)
            this.$emit('init')
            this.empty()
              // console.log(res);
          }else{
            alertWarning(res.data.msg)
          }
          
      })
    },
     getOne(id){
        //发起获取一条数据的请求
       reqMenuDetail(id).then(res=>{
           this.form=res.data.list
           this.form.id=id
       })
    },
    update(){
      reqMenuUpdata(this.form).then(res=>{
        // console.log(res);
        if(res.data.code==200){
          this.info.isShow=false;
          this.empty();
          alertSuccess(res.data.msg);
          this.$emit('init');
        }else{
          alertWarning(res.data.msg)
        }
      })
    },
  },
  mounted() {
    // console.log(this.list);
  }
};
</script>
<style scoped>
</style>