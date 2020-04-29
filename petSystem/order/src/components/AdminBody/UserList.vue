<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="请输入内容" @blur="refresh" v-model="user_name" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchUsers">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="10">
      </el-col>
    </el-row>
    <el-table :data="tableData.datas" border style="width: 100%">
      <el-table-column prop="user_image" label="用户头像" width="180" align="center">
        <template slot-scope="scope">
          <el-avatar :size="80" :src="scope.row.user_image"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="真实姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="user_username" label="用户名" width="180" align="center"></el-table-column>
      <el-table-column prop="user_gender" label="性别" width="180" align="center"></el-table-column>
      <el-table-column prop="user_phone" label="电话" width="200" align="center"></el-table-column>
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
    this.getUsers( 1, 5);
  },
  methods: {
    handleSizeChange(val) {
      this.getUsers(this.tableData.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getUsers(val, this.tableData.pageSize);
    },
    searchUsers() {
      this.getUsers(
        this.tableData.currentPage,
        this.tableData.pageSize
      );
    },
    refresh() {
      if (this.user_name == "") {
        this.getUsers(
          this.tableData.currentPage,
          this.tableData.pageSize
        );
      }
    },
    getUsers( currentPage, pageSize) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/showUsers",
        data: {
          user_name:this.user_name,
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
      user_name: ""
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>