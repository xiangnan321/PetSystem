<template>
  <div>
    <el-tabs v-model="order_cassify" @tab-click="tabSwich" type="border-card">
      <el-tab-pane label="商品订单" name="商品订单">
        <el-tabs
          tab-position="left"
          style="height: 200px;"
          @tab-click="tabSwichShop"
          v-model="orderStatusShop"
        >
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="待付款" name="1"></el-tab-pane>
          <el-tab-pane label="待发货" name="2"></el-tab-pane>
          <el-tab-pane label="待收货" name="3"></el-tab-pane>
          <el-tab-pane label="待评价" name="4"></el-tab-pane>
        </el-tabs>
        <div>
          <el-table :data="tableDataShop.datas" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="订单备注">
                    <span>{{ props.row.oG_remarks!=""?props.row.oG_remarks:"无" }}</span>
                  </el-form-item>
                  <el-form-item label="商品数量">
                    <span>{{ props.row.oG_sum }}</span>
                  </el-form-item>
                  <el-form-item label="订单总额">
                    <span>{{ props.row.oG_sum * props.row.goodsBean.good_price }}</span>
                  </el-form-item>
                  <el-form-item label="收货地址">
                    <span>{{ props.row.addressBean.add_address }}</span>
                  </el-form-item>
                  <el-form-item label="收货人">
                    <span>{{ props.row.addressBean.add_name }}</span>
                  </el-form-item>
                  <el-form-item label="收货人电话">
                    <span>{{ props.row.addressBean.add_phone }}</span>
                  </el-form-item>
                  <el-form-item label="商家电话">
                    <span>{{ props.row.businessBean.bus_phone }}</span>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <span>{{ props.row.usersBean.user_username }}</span>
                  </el-form-item>
                  <el-form-item label="用户电话">
                    <span>{{ props.row.usersBean.user_phone }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="goodsBean.good_id" width="100" align="center"></el-table-column>
            <el-table-column label="商品名称" prop="goodsBean.good_name" width="200" align="center"></el-table-column>
            <el-table-column label="商品类型" prop="goodsBean.good_cassify" width="150" align="center"></el-table-column>
            <el-table-column label="下单时间" prop="oG_time" width="200" align="center"></el-table-column>
            <el-table-column label="订单状态" prop="oG_status" width="150" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.oG_status==1">待付款</span>
                <span v-else-if="scope.row.oG_status==2">待发货</span>
                <span v-else-if="scope.row.oG_status==3">待收货</span>
                <span v-else-if="scope.row.oG_status==4">待评价</span>
                <span v-else-if="scope.row.oG_status==0">已完成</span>
              </template>
            </el-table-column>
            <el-table-column label="订单用户" prop="usersBean.user_name" width="150" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="确认"
                  cancelButtonText="再等等"
                  icon="el-icon-info"
                  iconColor="red"
                  title="是否确认发货？"
                  @onConfirm="deliverGoods(scope.row)"
                  v-if="scope.row.oG_status==2"
                >
                  <el-button plain round size="medium" type="danger" slot="reference">发货</el-button>
                </el-popconfirm>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="服务订单" name="服务订单">
        <el-tabs
          tab-position="left"
          style="height: 200px;"
          @tab-click="tabSwichShop"
          v-model="orderStatusSer"
        >
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="待完成" name="1"></el-tab-pane>
          <el-tab-pane label="待评价" name="2"></el-tab-pane>
          <el-tab-pane label="已过期" name="3"></el-tab-pane>
        </el-tabs>
        <div>
          <el-table :data="tableDataSer.datas" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="订单备注">
                    <span>{{ props.row.oS_remarks!=""?props.row.oS_remarks:"无" }}</span>
                  </el-form-item>
                  <el-form-item label="订单总额">
                    <span>{{ props.row.oS_sum * props.row.serviceBean.ser_price }}</span>
                  </el-form-item>
                  <el-form-item label="商家电话">
                    <span>{{ props.row.businessBean.bus_phone }}</span>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <span>{{ props.row.usersBean.user_username }}</span>
                  </el-form-item>
                  <el-form-item label="用户电话">
                    <span>{{ props.row.usersBean.user_phone }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="服务 ID" prop="serviceBean.ser_id" width="150" align="center"></el-table-column>
            <el-table-column label="服务名称" prop="serviceBean.ser_name" width="200" align="center"></el-table-column>
            <el-table-column
              label="服务类型"
              prop="serviceBean.ser_classify"
              width="150"
              align="center"
            ></el-table-column>
            <el-table-column label="预约时间" prop="oS_time" width="200" align="center"></el-table-column>
            <el-table-column label="订单状态" prop="oS_state" width="150" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.oS_state==1">待完成</span>
                <span v-else-if="scope.row.oS_state==2">待评价</span>
                <span v-else-if="scope.row.oS_state==3">已过期</span>
                <span v-else-if="scope.row.oS_state==4">已完成</span>
              </template>
            </el-table-column>
            <el-table-column label="订单用户" prop="usersBean.user_name" width="150" align="center"></el-table-column>
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  mounted() {
    this.getOrders(1, 5);
  },
  computed: {
    bus_id() {
      return this.$store.state.bus_id;
    }
  },
  methods: {
    tabSwich(tab, event) {
      this.getOrders(1, 5);
    },
    handleSizeChange(val) {
      if (this.order_cassify == "商品订单") {
        this.getOrders(this.tableDataShop.currentPage, val);
      } else {
        this.getOrders(this.tableDataSer.currentPage, val);
      }
    },
    handleCurrentChange(val) {
      if (this.order_cassify == "商品订单") {
        this.getOrders(val, this.tableDataShop.pageSize);
      } else {
        this.getOrders(val, this.tableDataSer.pageSize);
      }
    },
    getOrders(currentPage, pageSize) {
      let orderStatus = "";
      if (this.order_cassify == "商品订单") {
        orderStatus = this.orderStatusShop;
      } else {
        orderStatus = this.orderStatusSer;
      }
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/showOrderGoodsBean",
        data: {
          order_cassify: this.order_cassify,
          orderStatus: orderStatus,
          bus_id: this.bus_id,
          user_id: "0",
          currentPage,
          pageSize
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (this.order_cassify == "商品订单") {
            this.tableDataShop = res;
          } else {
            this.tableDataSer = res;
          }
        }
      });
    },
    tabSwichShop(tab, event) {
      if (this.order_cassify == "商品订单") {
        this.getOrders(
          this.tableDataShop.currentPage,
          this.tableDataShop.pageSize
        );
      } else {
        this.getOrders(
          this.tableDataSer.currentPage,
          this.tableDataSer.pageSize
        );
      }
    },
    deliverGoods(row) {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/modifyOrderGoodS",
        data: {
          oG_id: row.oG_id,
          orderStatus: 3
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res != 0) {
            this.$message({
              message: "商品发货成功！！！",
              type: "success"
            });
            this.getOrders(1, 5);
          }
        }
      });
    }
  },

  data() {
    return {
      tableDataShop: [],
      tableDataSer: [],
      order_cassify: "商品订单",
      orderStatusShop: "0",
      orderStatusSer: "0"
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
.el-tab-pane {
  display: flex;
}
.el-tab-pane .el-tabs {
  width: 100px;
}
.el-form--inline .el-form-item {
  width: 350px;
}
</style>