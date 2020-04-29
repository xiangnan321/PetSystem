<template>
  <!-- style="width: 100%" type="text"-->
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="请输入内容" @blur="refresh" v-model="adm_name" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchadm_name">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="addAdm"
          :disabled="isLogin.adm_isSuperAdmin==0"
        >增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="adm_id" label="ID" width="150" align="center"></el-table-column>
      <el-table-column prop="adm_name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="adm_age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="adm_gender" label="性别" width="120" align="center"></el-table-column>
      <el-table-column prop="adm_phone" label="电话" width="300" align="center"></el-table-column>
      <el-table-column prop="adm_account" label="账号" width="120" align="center"></el-table-column>
      <el-table-column label="操作" prop="adm_isSuperAdmin" header-align="center">
        <template slot-scope="scope">
          <span v-if="isLogin.adm_isSuperAdmin==0">权限不足，不可编辑</span>
          <div v-else>
            <!-- <el-button
              @click="handleClick(scope.row)"
              plain
              round
              size="medium"
              type="warning"
              :disabled="scope.row.adm_isSuperAdmin==1"
            >编辑</el-button> -->
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="是否要删除该管理员？"
              @onConfirm="deletadm(scope.row)"
            >
              <el-button
                plain
                round
                size="medium"
                type="danger"
                :disabled="scope.row.adm_isSuperAdmin==1"
                slot="reference"
              >删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getAdminItem("");
  },
  computed: {
    isLogin() {
      return this.$store.state.user;
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deletadm(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/delAdm",
        data: {
          adm_id: row.adm_id,
          delType: 1
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.getAdminItem("");
        }
      });
    },
    addAdm() {
      this.$router.push({ name: "addAdmin", params: { addType: 1 } });
    },
    getAdminItem(adm_name) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/showAdmin",
        data: {
          adm_name: adm_name
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.tableData = res;
        }
      });
    },
    searchadm_name() {
      this.getAdminItem(this.adm_name);
    },
    refresh() {
      if (this.adm_name == "") {
        this.getAdminItem("");
      }
    }
  },

  data() {
    return {
      tableData: [],
      adm_name: ""
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>