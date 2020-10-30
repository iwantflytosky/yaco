<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid">
            <!-- 需要修改 -->
            <el-option label="---请选择---" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 需要引入数据库数据添加 -->
             <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="fileAdd">
            <p>+</p>
            <input type="file" @change="changeImg" v-if="info.isShow" />
            <img v-if="imgSrc" :src="imgSrc" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
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
        <el-button v-if="info.title == '添加分类'" type="primary" @click="add"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import { alertSuccess, alertWarning } from "../../../util/alert";
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdata
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
          list:'cate/list'
      })
  },
  components: {},
  data() {
    return {
      form: {
        catename: "",
        status: 1,
        pid: '',
        img: null
      },
      imgSrc: ""
    };
  },
  methods: {
    changeImg(e) {
      let file = e.target.files[0];
      const arr = [".jpg", ".png", ".gif", ".jpeg"];
      //   console.log(e);
      let num = file.name.lastIndexOf(".");
      let sty = file.name.slice(num);
      if (!arr.includes(sty)) {
        alertWarning("请输入图片");
        return;
      }

      let url = URL.createObjectURL(file);
      this.form.img = file;
      this.imgSrc = url;
    },
    empty() {
      this.form = {
        catename: "",
        status: 1,
        pid: 1,
        img: null
      };
      this.imgSrc = "";
    },
    add() {
      this.info.isShow = false;
      //   console.log(this.form);
      var data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateAdd(data).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.empty();
          alertSuccess(res.data.msg);
          this.getList();
        }
      });
    },
    // 修改按钮
    edit() {
      this.info.isShow = false;
      var data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      console.log(this.form);
      reqCateUpdata(data).then(res => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.empty();
          this.getList();
        }
      });
    },
    getOne(id) {
      reqCateDetail(id).then(res => {
        this.form = res.data.list;
        console.log(res);
        this.form.id = id;
        this.imgSrc = this.$imgUrl + this.form.img;
      });
    },
    ...mapActions({
      getList: "cate/requestcateList"
    })
  },

  mounted() {}
};
</script>
<style scoped>
.fileAdd {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  position: relative;
}
.fileAdd p {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
}
.fileAdd input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  cursor: pointer;
  width: 100px;
  height: 100px;
  opacity: 0;
}
.fileAdd img {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
}
</style>