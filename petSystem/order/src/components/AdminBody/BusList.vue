<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="请输入内容" @blur="refresh" v-model="bus_name" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchBus_name">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button type="success" icon="el-icon-plus" @click="addBus">增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData.datas" border style="width: 100%">
      <el-table-column prop="bus_id" label="ID" width="150" align="center"></el-table-column>
      <el-table-column prop="bus_name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="bus_age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="bus_gender" label="性别" width="120" align="center"></el-table-column>
      <el-table-column prop="bus_phone" label="电话" width="150" align="center"></el-table-column>
      <el-table-column prop="bus_account" label="账号" width="120" align="center"></el-table-column>
      <el-table-column prop="bus_status" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.bus_status=='1'">申请中</span>
          <span v-else-if="scope.row.bus_status=='2'">审核通过</span>
          <span v-else-if="scope.row.bus_status=='3'">审核未通过</span>
          <span v-else-if="scope.row.bus_status=='4'">禁用中</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" prop="adminBean.adm_name" align="center"></el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            plain
            round
            size="medium"
            type="warning"
          >{{scope.row.bus_status=='2'?'禁止使用':'允许使用'}}</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="是否要删除该商家？"
            @onConfirm="deletbus(scope.row)"
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
    this.getBusiness("", 1, 5);
  },
  methods: {
    handleClick(row) {
      if (row.bus_status == "2") {
        row.bus_status = "4";
      } else {
        row.bus_status = "2";
      }
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/modifyBusiness",
        data: {
          bus_id: row.bus_id,
          bus_name: row.bus_name,
          bus_age: row.bus_age,
          bus_gender: row.bus_gender,
          bus_account: row.bus_account,
          bus_pwd: row.bus_pwd,
          bus_phone: row.bus_phone,
          bus_status: row.bus_status
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if(row.bus_status == "2"){
          this.$message({
            message: "商家已取消禁用！！！",
            type: "success"
          });
          }else{
          this.$message({
            message: "商家禁用成功！！！",
            type: "success"
          });
          }
          this.getBusiness(
            "",
            this.tableData.currentPage,
            this.tableData.pageSize
          );
        }
      });
    },
    deletbus(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/delAdm",
        data: {
          adm_id: row.bus_id,
          delType: 0
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.getBusiness(
            "",
            this.tableData.currentPage,
            this.tableData.pageSize
          );
        }
      });
    },
    handleSizeChange(val) {
      this.getBusiness("", this.tableData.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getBusiness("", val, this.tableData.pageSize);
    },
    searchBus_name() {
      this.getBusiness(
        this.bus_name,
        this.tableData.currentPage,
        this.tableData.pageSize
      );
    },
    refresh() {
      if (this.bus_name == "") {
        this.getBusiness(
          "",
          this.tableData.currentPage,
          this.tableData.pageSize
        );
      }
    },
    addBus() {
      this.$router.push({ name: "addAdmin", params: { addType: 0 } });
    },
    getBusiness(bus_name, currentPage, pageSize) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/showBusiness",
        data: {
          bus_name: bus_name,
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
      bus_name: ""
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>