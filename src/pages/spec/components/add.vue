<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in listArr"
          :key="index"
        >
          <div class="rowbox">
            <div class="ipt-box">
              <el-input v-model="item.obj" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
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
          v-if="info.title == '规格添加'"
          >确 定</el-button
        >
        <el-button type="primary" @click="userUpdata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { alertSuccess, alertWarning } from "@/util/alert";
import { mapGetters, mapActions } from "vuex";
import {
  reqSpecAdd,
  reqSpecDetail,
  reqSpecUpdate
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
       specList: [],
      form: {
        specsname: "",
        status: 1,
        attrs: "[]"
      },
      listArr: [{ obj: "" }],
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions({
      initTotal: "spec/reqTotal",
      reqList: "spec/reqList"
    }),
    empty() {
      this.form = {
        specsname: "",
        status: 1,
        attrs: "[]"
      };
      this.listArr = [{ obj: "" }];
    },
    addArr() {
      this.listArr.push({ obj: "" });
    },
    delArr(index) {
      this.listArr.splice(index, 1);
    },
    // 添加
    userAdd() {
      this.info.isShow = false;
      this.form.attrs = JSON.stringify(
        this.listArr.map(item => {
          return item.obj;
        })
      );
      // console.log(this.form);
      reqSpecAdd(this.form).then(res => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqList();
          this.empty();
          this.initTotal();
        }
      });
    },
    getOne(id) {
      reqSpecDetail(id).then(res => {
        this.form = res.data.list[0];
        this.listArr = JSON.parse(this.form.attrs).map(item => {
          return { obj: item };
        });
        // console.log(res);
      });
    },
    // 修改
    userUpdata() {
      this.form.attrs = JSON.stringify(
        this.listArr.map(item => {
          return item.obj;
        })
      );
      reqSpecUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.reqList();
          this.empty();
          alertSuccess(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>

.rowbox {
  display: flex;
}
.ipt-box {
  flex: 1;
}
</style>