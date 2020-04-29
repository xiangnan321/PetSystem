<template>
  <div>
    <el-tabs v-model="apply_cassify" @tab-click="tabSwich">
      <el-tab-pane label="门店申请或注销" name="门店申请或注销">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input placeholder="请输入门店名称或门店管理员名称" @blur="refresh" v-model="condition" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchApply">搜索</el-button>
          </el-col>
          <el-col :span="2" :offset="10"></el-col>
        </el-row>
        <el-table :data="tableDataShop.datas" border style="width: 100%">
          <el-table-column prop="shopsBean.shop_name" label="门店名称" width="120" align="center"></el-table-column>
          <el-table-column prop="shopsBean.shop_address" label="门店地址" width="180" align="center"></el-table-column>
          <el-table-column
            prop="shopsBean.businessBean.bus_name"
            label="门店管理员"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column prop="app_type" label="申请类型" width="150" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.app_type==2">新门店申请</span>
              <span v-else-if="scope.row.app_type==3">门店注销</span>
            </template>
          </el-table-column>
          <el-table-column prop="app_time" label="申请时间" width="180" align="center"></el-table-column>
          <el-table-column prop="app_status" label="申请状态" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.app_status==1">申请中</span>
              <span v-else-if="scope.row.app_status==2">已通过</span>
              <span v-else-if="scope.row.app_status==3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="shopsBean.shop_phone" label="门店电话" width="150" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="240" header-align="center">
            <template slot-scope="scope">
              <el-button
                @click="agreeApply(scope.row)"
                plain
                round
                size="medium"
                type="success"
                v-if="scope.row.app_status!=2"
              >同意申请</el-button>
              <el-button
                @click="refuseApply(scope.row)"
                plain
                round
                size="medium"
                type="danger"
                v-if="scope.row.app_status!=2"
                :disabled="scope.row.app_status==3"
              >拒绝申请</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableDataShop.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="tableDataShop.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataShop.tolNum"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="门店管理员申请" name="门店管理员申请">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input placeholder="请输入门店管理员账号或姓名" @blur="refresh" v-model="condition" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchApply">搜索</el-button>
          </el-col>
          <el-col :span="2" :offset="10"></el-col>
        </el-row>
        <el-table :data="tableDataBus.datas" border style="width: 100%">
          <el-table-column prop="businessBean.bus_account" label="商家账号" width="120" align="center"></el-table-column>
          <el-table-column prop="businessBean.bus_name" label="商家名称" width="120" align="center"></el-table-column>
          <el-table-column prop="businessBean.bus_gender" label="性别" width="120" align="center"></el-table-column>
          <el-table-column prop="businessBean.bus_age" label="年龄" width="120" align="center"></el-table-column>
          <el-table-column prop="businessBean.bus_phone" label="商家电话" width="180" align="center"></el-table-column>
          <el-table-column prop="app_time" label="申请时间" width="200" align="center"></el-table-column>
          <el-table-column prop="app_status" label="申请状态" width="150" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.app_status==1">申请中</span>
              <span v-else-if="scope.row.app_status==2">已通过</span>
              <span v-else-if="scope.row.app_status==3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="240" header-align="center">
            <template slot-scope="scope">
              <el-button
                @click="agreeApply(scope.row)"
                plain
                round
                size="medium"
                type="success"
                v-if="scope.row.app_status!=2"
              >同意申请</el-button>
              <el-button
                @click="refuseApply(scope.row)"
                plain
                round
                size="medium"
                type="danger"
                v-if="scope.row.app_status!=2"
                :disabled="scope.row.app_status==3"
              >拒绝申请</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableDataBus.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="tableDataBus.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataBus.tolNum"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  mounted() {
    this.getApplys(1, 5);
  },
  methods: {
    agreeApply(row) {
      if (this.apply_cassify == "门店申请或注销") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/adminBody/agreeShopApply",
          data: {
            app_id: row.app_id,
            app_type: row.app_type,
            app_status: 2,
            shop_id: row.shopsBean.shop_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            if (res != 0) {
              this.$message({
                message: "已同意该门店管理员申请！！！",
                type: "success"
              });
              this.getApplys(
                this.tableDataShop.currentPage,
                this.tableDataShop.pageSize
              );
            }
          }
        });
      } else {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/adminBody/agreeBusApply",
          data: {
            app_id: row.app_id,
            app_status: 2,
            adm_id: this.$store.state.user.adm_id,
            bus_id: row.businessBean.bus_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            this.$message({
              message: "已同意该门店管理员申请！！！",
              type: "success"
            });
            this.getApplys(
              this.tableDataBus.currentPage,
              this.tableDataBus.pageSize
            );
          }
        });
      }
    },
    tabSwich(tab, event) {
      this.getApplys(1, 5);
    },
    refuseApply(row) {
      if (this.apply_cassify == "门店申请或注销") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/adminBody/agreeShopApply",
          data: {
            app_id: row.app_id,
            app_type: row.app_type,
            app_status: 3,
            shop_id: row.shopsBean.shop_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            this.$message({
              message: "已拒绝该门店管理员申请！！！",
              type: "success"
            });
            this.getApplys(
              this.tableDataShop.currentPage,
              this.tableDataShop.pageSize
            );
          }
        });
      } else {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/adminBody/agreeBusApply",
          data: {
            app_id: row.app_id,
            app_status: 3,
            adm_id: this.$store.state.user.adm_id,
            bus_id: row.businessBean.bus_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            this.$message({
              message: "已拒绝该门店管理员申请！！！",
              type: "success"
            });
            this.getApplys(
              this.tableDataBus.currentPage,
              this.tableDataBus.pageSize
            );
          }
        });
      }
    },
    handleSizeChange(val) {
      if (this.apply_cassify == "门店申请或注销") {
        this.getApplys(this.tableDataShop.currentPage, val);
      } else {
        this.getApplys(this.tableDataBus.currentPage, val);
      }
    },
    searchApply() {
      if (this.apply_cassify == "门店申请或注销") {
        this.getApplys(
          this.tableDataShop.currentPage,
          this.tableDataShop.pageSize
        );
      } else {
        this.getApplys(
          this.tableDataBus.currentPage,
          this.tableDataBus.pageSize
        );
      }
    },
    refresh() {
      if (this.apply_cassify == "门店申请或注销") {
        this.getApplys(
          this.tableDataShop.currentPage,
          this.tableDataShop.pageSize
        );
      } else {
        this.getApplys(
          this.tableDataBus.currentPage,
          this.tableDataBus.pageSize
        );
      }
    },
    handleCurrentChange(val) {
      if (this.apply_cassify == "门店申请或注销") {
        this.getApplys(val, this.tableDataShop.pageSize);
      } else {
        this.getApplys(val, this.tableDataBus.pageSize);
      }
    },
    getApplys(currentPage, pageSize) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/showApply",
        data: {
          condition: this.condition,
          apply_cassify: this.apply_cassify,
          currentPage,
          pageSize
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (this.apply_cassify == "门店申请或注销") {
            this.tableDataShop = res;
          } else {
            this.tableDataBus = res;
          }
        }
      });
    }
  },

  data() {
    return {
      tableDataShop: [],
      tableDataBus: [],
      apply_cassify: "门店申请或注销",
      condition: ""
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>