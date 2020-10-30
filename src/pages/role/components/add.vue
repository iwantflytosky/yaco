<template>
  <div>
    <el-dialog :title="this.info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '角色添加'"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { alertSuccess, alertWarning } from "@/util/alert";
import {reqMenuList,reqRoleAdd,reqRoleUpdata,reqRoleDetail} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
        form:{
            status:1,
            menus:'',
            rolename:''
        },
      formLabelWidth: "120px",
      menuList:[]
    };
  },
  methods: {
    empty() {
      this.form = {
            status:1,
            menus:'',
            rolename:''
        };
    },
    //清空树
    emptyTree(){
       this.$refs.tree.setCheckedKeys([])
    },
    opened(){
      //添加打开，要置空树，编辑打开，什么都不做
      if(this.info.title==="角色添加"){
        this.emptyTree()
      }
    },
    add() {
      this.info.isShow = false;
    //   console.log(this.$refs.tree.getCheckedKeys());
    this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
    //   console.log(this.form);
      reqRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.$emit("init");
          this.empty();
          this.emptyTree();
          // console.log(res);
        } else {
          alertWarning(res.data.msg);
        }
      });
    },
    getOne(id) {
      //发起获取一条数据的请求
      reqRoleDetail(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        // console.log(res);
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
      });
    },
    update() {
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
        // console.log(this.form);
      reqRoleUpdata(this.form).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.empty();
          alertSuccess(res.data.msg);
          this.$emit("init");
          this.emptyTree();
        } else {
          alertWarning(res.data.msg);
          
        }
      });
    }
  },
  mounted() {
    // console.log(this.list);
    reqMenuList().then(res=>{
        this.menuList=res.data.list
        // console.log(res);
    })
  }
};
</script>
<style scoped>
</style>