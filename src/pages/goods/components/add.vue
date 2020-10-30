<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened='opened'>
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeOne">
            <el-option label="--select--" value='' disabled></el-option>
            <!-- 循环数据 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--select--" value='' disabled></el-option>
            <!-- 循环数据 -->
            <el-option v-for="item in secondList" :key='item.id' :label="item.catename" :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload :on-change="changeImg" class="avatar-uploader" :show-file-list="false" action="#">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--select--" value disabled></el-option>
            <!-- 循环数据 -->
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--select--" value disabled></el-option>
            <!-- 循环数据 -->
            <el-option v-for="item in  attrsList" :key='item' :label="item" :value='item'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div v-if="info.isShow" id="div1">

          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="userAdd"
          v-if="info.title == '商品添加'"
          >确 定</el-button
        >
        <el-button type="primary" @click="userUpdata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqGoodsDetail} from '../../../util/request'
import { alertSuccess, alertWarning } from "@/util/alert";
import { mapGetters, mapActions } from "vuex";
import E from 'wangeditor';
import {
  reqGoodsAdd,
  reqCateList,
  reqSpecUpdate
} from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  computed:{
    ...mapGetters({
      cateList:'cate/list',
      specList:'spec/list'
    })
  },
  data() {
    return {
      radio: "1",
      textarea:'',
      imageUrl:'',
      secondList:[],
      attrsList:[],
      form: {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:null,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    ...mapActions({
      requestcateList:'cate/requestcateList',
      reqSpecsList:'spec/reqList',
      reqList:'goods/reqList',
      reqTotal:'goods/reqTotal'
    }),
    empty() {
      this.form = {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:null,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      };
    },
  // 上传图片改变触发方法
    changeImg(e){
      let file=e.raw;
      this.imageUrl=URL.createObjectURL(file);
      this.form.img=file;
    },
    // 一级分类发生改变
    changeOne(){
      this.form.second_cateid=''
      // console.log(this.form.first_cateid);
      this.getSecond()
    },
    // 规格选择框方法改变
    changeSpec(e){
      this.form.specsattr=[];
      // console.log(e);
      this.reqSpecsList(true);
      let context=this.specList.find(item=>{
        return item.id==e
      })
      this.attrsList=context.attrs
    },
    getSecond(){
      reqCateList({pid:this.form.first_cateid}).then(res=>{
        this.secondList=res.data.list
      })
    },
    // 添加
    userAdd() {
      this.info.isShow = false;
      this.form.description=this.editor.txt.html();
      let obj={
        ...this.form
      }
      // console.log(obj);
      obj.specsattr=JSON.stringify(obj.specsattr)
      let data=new FormData();
      for(let i in obj){
        data.append(i,obj[i])
      }
      // console.log(data);
      // console.log(this.form)
      reqGoodsAdd(data).then(res => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.empty(); 
          this.reqList();
          this.reqTotal()   
        }
      });
    },
    getOne(id) {
      reqGoodsDetail(id).then(res => {
        this.form=res.data.list;
        this.imageUrl=this.$imgUrl+this.form.img;
        this.form.specsattr=JSON.parse(res.data.list.specsattr);
        console.log(this.attrsList);
        console.log(typeof res.data.list.specsattr);





        console.log(res);
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
          this.reqList()
          this.empty();
          alertSuccess(res.data.msg);
        } 
      });
    },
    opened(){
        this.editor=new E("#div1")
        this.editor.create()
        // this.editor.txt.html(this.form.description)
      },
  },
  mounted() {
    this.requestcateList();
    this.reqSpecsList()
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus{
  border: 1px dashed #d9d9d9 !important; 
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>