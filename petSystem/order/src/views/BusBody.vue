<template>
  <div class="busBody">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <router-link :to="{name:'busShopList'}">
                  <el-menu-item index="1">
                    <i class="el-icon-s-shop"></i>
                    <span slot="title">门店管理</span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'goodsList'}">
                  <el-menu-item index="2">
                    <i class="el-icon-present"></i>
                    <span slot="title">商品管理</span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'serverList'}">
                  <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">服务管理</span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'order'}">
                  <el-menu-item index="4">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">订单管理</span>
                  </el-menu-item>
                </router-link>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu a {
  font-size: 18px;
  text-decoration: none;
  color: white;
}
.el-menu a span{
  font-size: 18px;
}
</style>