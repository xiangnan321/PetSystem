<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="请输入内容" @blur="refresh" v-model="shop_name" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchshop_name">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button type="success" icon="el-icon-plus" @click="addshop" v-if="bus_id!=0">增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData.datas" border style="width: 100%">
      <el-table-column prop="shop_id" label="ID" width="120" align="center"></el-table-column>
      <el-table-column prop="shop_name" label="门店名称" width="120" align="center"></el-table-column>
      <el-table-column prop="shop_phone" label="门店电话" width="150" align="center"></el-table-column>
      <el-table-column prop="shop_address" label="门店地址" width="150"></el-table-column>
      <el-table-column prop="shop_desc" label="门店描述" width="180"></el-table-column>
      <el-table-column
        prop="businessBean.bus_name"
        label="所属商家"
        width="150"
        v-if="bus_id==0"
        align="center"
      ></el-table-column>
      <el-table-column prop="shop_status" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.shop_status==1">申请中</span>
          <span v-else-if="scope.row.shop_status==2">审核通过</span>
          <span v-else-if="scope.row.shop_status==3">审核未通过</span>
          <span v-else-if="scope.row.shop_status==4">注销中</span>
          <span v-else-if="scope.row.shop_status==5">禁用中</span>
        </template>
      </el-table-column>
      <el-table-column label="注销" width="260" v-if="bus_id!=0" header-align="center">
        <template slot-scope="scope">
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="是否要注销该门店？"
            @onConfirm="deletShop(scope.row)"
          >
            <el-button
              plain
              round
              size="medium"
              type="danger"
              slot="reference"
              :disabled="scope.row.shop_status!=2"
            >立即注销</el-button>
          </el-popconfirm>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="是否要取消注销该门店"
            @onConfirm="cancelDeletShop(scope.row)"
          >
            <el-button
              plain
              round
              size="medium"
              type="danger"
              slot="reference"
              :disabled="scope.row.shop_status!=4"
            >取消注销</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button
            @click="modifyShop(scope.row)"
            plain
            round
            size="medium"
            type="warning"
            :disabled="scope.row.shop_status!=2&&bus_id!=0"
          >编辑</el-button>
          <el-button
            @click="handleClick(scope.row)"
            plain
            round
            size="medium"
            type="warning"
            :disabled="scope.row.shop_status!=2&&bus_id!=0"
          >查看</el-button>
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
    this.getShops("", 1, 5);
  },
  computed: {
    bus_id() {
      return this.$store.state.bus_id;
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deletShop(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/delShop",
        data: {
          shop_id: row.shop_id,
          shop_name: row.shop_name,
          shop_phone: row.shop_phone,
          shop_address: row.shop_address,
          shop_desc: row.shop_desc,
          shop_status: row.shop_status
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res - 0 != 0) {
            this.$message({
              message: "门店正在申请注销中，等待管理员审核通过！！！",
              type: "success"
            });
            this.getShops(
              this.shop_name,
              this.tableData.currentPage,
              this.tableData.pageSize
            );
          }
        }
      });
    },
    cancelDeletShop(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/cancelDeletShop",
        data: {
          shop_id: row.shop_id,
          shop_name: row.shop_name,
          shop_phone: row.shop_phone,
          shop_address: row.shop_address,
          shop_desc: row.shop_desc,
          shop_status: row.shop_status
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res - 0 != 0) {
            this.$message({
              message: "门店注销请求取消成功！！！",
              type: "success"
            });
            this.getShops(
              this.shop_name,
              this.tableData.currentPage,
              this.tableData.pageSize
            );
          }
        }
      });
    },
    modifyShop(row) {
      if (this.bus_id == 0) {
        this.$router.push({ name: "admModifyShop", params: { form: row } });
      } else {
        this.$router.push({ name: "modifyShop", params: { form: row } });
      }
    },
    handleSizeChange(val) {
      this.getShops("", this.tableData.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getShops("", val, this.tableData.pageSize);
    },
    searchshop_name() {
      this.getShops(
        this.shop_name,
        this.tableData.currentPage,
        this.tableData.pageSize
      );
    },
    refresh() {
      if (this.shop_name == "") {
        this.getShops("", this.tableData.currentPage, this.tableData.pageSize);
      }
    },
    addshop() {
      this.$router.push({ name: "modifyShop", params: { form: null } });
    },
    getShops(shop_name, currentPage, pageSize) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/showShops",
        data: {
          shop_name: shop_name,
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
      shop_name: ""
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>