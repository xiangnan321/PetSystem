<template>
  <div>
    <el-button type="success" icon="el-icon-plus" @click="addshop">增加</el-button>
    <el-tabs v-model="good_cassify" @tab-click="tabSwich">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="爱宠主食" name="爱宠主食"></el-tab-pane>
      <el-tab-pane label="爱宠零食" name="爱宠零食"></el-tab-pane>
      <el-tab-pane label="日常用品" name="日常用品"></el-tab-pane>
      <el-tab-pane label="爱宠玩具" name="爱宠玩具"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData.datas" border style="width: 100%">
      <el-table-column prop="good_id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="good_name" label="商品名称" width="120" align="center"></el-table-column>
      <!-- <el-table-column prop="good_cassify" label="商品种类" width="100" align="center"></el-table-column> -->
      <el-table-column prop="good_pet" label="适用宠物" width="100" align="center"></el-table-column>
      <el-table-column prop="good_price" label="商品价格(元)" width="150" align="center"></el-table-column>
      <el-table-column prop="good_weight" label="商品重量" width="150" align="center"></el-table-column>
      <el-table-column prop="good_production" label="生产日期" width="150" align="center"></el-table-column>
      <el-table-column prop="good_shelfLife" label="保质期" width="150" align="center"></el-table-column>
      <!-- <el-table-column prop="good_producer" label="产地" width="150" align="center"></el-table-column> -->
      <el-table-column label="商品图片" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.good_images" fit="contain"></el-image>
          <!-- style="width: 120px; height: 120px" -->
        </template>
      </el-table-column>
      <!-- <el-table-column prop="good_desc" label="商品描述" width="150" header-align="center"></el-table-column> -->
      <el-table-column prop="good_sum" label="已售出" width="150" align="center"></el-table-column>
      <!-- <el-table-column prop="shopsBeanList" label="所属门店" width="120" header-align="center">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.shopsBeanList" :key="index">{{item.shop_name}},</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" fixed="right" width="280" header-align="center">
        <template slot-scope="scope">
          <el-button @click="modifyShop(scope.row)" plain round size="medium" type="warning">编辑</el-button>
          <el-button @click="handleClick(scope.row)" plain round size="medium" type="primary">查看</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="是否要删除该商品？"
            @onConfirm="deletGood(scope.row)"
          >
            <el-button plain round size="medium" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableData.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="tableData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.tolNum"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  mounted() {
    this.getGoods(1, 5);
  },
  computed: {
    bus_id() {
      return this.$store.state.bus_id;
    }
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        name: "addGood",
        params: { good_id: row.good_id, type: "查看" }
      });
    },
    tabSwich(tab, event) {
      this.getGoods(1, this.tableData.pageSize);
    },
    deletGood(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/delGood",
        data: {
          good_id: row.good_id
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res - 0 != 0) {
            this.$message({
              message: "商品删除成功！！！",
              type: "success"
            });
            this.getGoods(this.tableData.currentPage, this.tableData.pageSize);
          }
        }
      });
    },
    modifyShop(row) {
      this.$router.push({
        name: "addGood",
        params: { good_id: row.good_id, type: "修改" }
      });
      console.log(row);
    },
    handleSizeChange(val) {
      this.getGoods(this.tableData.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getGoods(val, this.tableData.pageSize);
    },
    addshop() {
      this.$router.push({ name: "addGood", params: { form: null } });
    },
    getGoods(currentPage, pageSize) {
      let good_cassify = this.good_cassify;
      if (good_cassify == "全部") {
        good_cassify = "";
      }
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/showGoods",
        data: {
          good_cassify: good_cassify,
          bus_id: this.bus_id,
          currentPage,
          pageSize
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.tableData = res;
        }
      });
    }
  },

  data() {
    return {
      tableData: [],
      good_cassify: "全部"
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>