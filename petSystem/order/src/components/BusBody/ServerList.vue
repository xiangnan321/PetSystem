<template>
  <div>
    <el-button type="success" icon="el-icon-plus" @click="addServer">增加</el-button>
    <el-tabs v-model="ser_classify" @tab-click="tabSwich">
      <el-tab-pane label="所有服务" name="所有服务"></el-tab-pane>
      <el-tab-pane label="宠物寄养" name="宠物寄养"></el-tab-pane>
      <el-tab-pane label="宠物美容" name="宠物美容"></el-tab-pane>
      <el-tab-pane label="宠物医疗" name="宠物医疗"></el-tab-pane>
      <el-tab-pane label="宠物摄影" name="宠物摄影"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData.datas" border style="width: 100%">
      <el-table-column prop="ser_id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="ser_name" label="服务名称" width="120" align="center"></el-table-column>
      <el-table-column prop="ser_classify" label="服务种类" width="100" align="center"></el-table-column>
      <el-table-column prop="ser_pet" label="适用宠物" width="100" align="center"></el-table-column>
      <el-table-column prop="ser_price" label="服务价格(元)" width="150" align="center"></el-table-column>
      <el-table-column prop="ser_desc" label="服务描述" width="280" header-align="center"></el-table-column>
      <el-table-column label="操作" width="280" header-align="center">
        <template slot-scope="scope">
          <el-button @click="modifyShop(scope.row)" plain round size="medium" type="warning">编辑</el-button>
          <el-button @click="handleClick(scope.row)" plain round size="medium" type="primary">查看</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="是否要删除该商品？"
            @onConfirm="deletServer(scope.row)"
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
    this.getService(1, 5);
  },
  computed: {
    bus_id() {
      return this.$store.state.bus_id;
    }
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        name: "addServer",
        params: { ser_id: row.ser_id, type: "查看" }
      });
    },
    tabSwich(tab, event) {
      this.getService(1, this.tableData.pageSize);
    },
    deletServer(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/delServicer",
        data: {
          ser_id: row.ser_id
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res - 0 != 0) {
            this.$message({
              message: "商品删除成功！！！",
              type: "success"
            });
            this.getService(this.tableData.currentPage, this.tableData.pageSize);
          }
        }
      });
    },
    modifyShop(row) {
      this.$router.push({
        name: "addServer",
        params: { ser_id: row.ser_id, type: "修改" }
      });
      console.log(row);
    },
    handleSizeChange(val) {
      this.getService(this.tableData.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getService(val, this.tableData.pageSize);
    },
    addServer() {
      this.$router.push({ name: "addServer", params: { form: null } });
    },
    getService(currentPage, pageSize) {
      let ser_classify = this.ser_classify;
      if (ser_classify == "所有服务") {
        ser_classify = "";
      }
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/showService",
        data: {
          ser_classify: ser_classify,
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
      ser_classify: "所有服务"
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>