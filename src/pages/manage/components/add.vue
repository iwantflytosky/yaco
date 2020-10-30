<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="--select--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
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
        <el-button
          type="primary"
          @click="userAdd"
          v-if="info.title == '管理员添加'"
          >确 定</el-button
        >
        <el-button type="primary" @click="userUpdata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { alertSuccess, alertWarning } from "@/util/alert";
import {
  reqManageAdd,
  reqRoleList,
  reqManageDetail,
  reqManageUpdata
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      roleList: [],
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    userAdd() {
      console.log(this.form);
      this.info.isShow = false;
      reqManageAdd(this.form).then(res => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.empty();
          this.$emit("init");
        } else {
          alertWarning(res.data.msg);
        }
      });
    },
    getOne(uid) {
      reqManageDetail(uid).then(res => {
        this.form = res.data.list;
        this.form.password = "";
        console.log(res);
      });
    },
    userUpdata() {
      reqManageUpdata(this.form).then(res => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.$emit("init");
          this.empty();
          alertSuccess(res.data.msg);
        } else {
          alertWarning(res.data.msg);
        }
      });
    }
  },
  mounted() {
    reqRoleList().then(res => {
      if (res.data.code === 200) {
        this.roleList = res.data.list;
      }
    });
  }
};
</script>
<style scoped>
</style>