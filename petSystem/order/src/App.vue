<template>
  <!-- <el-container>
    <el-header class="Warning">
      <Header></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>-->
  <router-view></router-view>
</template>

<script>
// import Header from "@/components/Header";
export default {
  // components: {
  //   Header
  // }
  mounted() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-hijiki/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "../live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json"
        },
        display: { position: "right", width: 200, height: 350 },
        mobile: { show: true },
        log: false
      });
    }, 1000);
  }
};
</script>

<style>
/* * {
  padding: 0;
  margin: 0;
}
.el-container .el-main {
  padding: 0;
}
.el-header {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 60px;
  background-color: #303133;
}  */
.el-header,
.el-footer {
  background-color: #303133;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
