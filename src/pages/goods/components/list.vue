<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span>{{ scope.row.market_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew === 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="upData(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="userDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqgoodsDel } from "../../../util/request";
import { alertSuccess, alertWarning } from "@/util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "goods/list"
    })
  },

  methods: {
    userDel(id) {
      reqgoodsDel(id).then(res => {
        //   console.log(res);
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.reqList();
          this.reqTotal();
        }
      });
    },
    upData(id) {
      this.info.title = "编辑商品";
      this.info.isShow = true;
      this.$emit("edit", id);
    },
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal"
    })
  },
  mounted() {
    this.reqList();
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