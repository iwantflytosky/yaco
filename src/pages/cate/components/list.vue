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
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.img"
           v-if="scope.row.img!== 'null'"/>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="upData(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="userDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqCateDel } from "../../../util/request";
import { alertSuccess, alertWarning } from "@/util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  data() {
    return {
      value: true
    };
  },
  methods: {
    userDel(id) {
      reqCateDel(id).then(res => {
        //   console.log(res);
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.getList()
        } 
      });
    },
    upData(id) {
      this.info.isShow = true;
      this.info.title='修改分类'
      this.$emit('parentFun',id)
    },
    ...mapActions({
      getList: "cate/requestcateList",
    })
  },
  mounted() {
    this.getList();
    // console.log(this.list);
  }
};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>