<template>
  <el-container>
    <el-header class="Warning">
      <Header></Header>
    </el-header>
    <el-main>
      <div class="demo-image__placeholder login">
        <div class="block">
          <el-image :src="require('../assets/logo.jpg')"></el-image>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="账号：">
            <el-input placeholder="请输入账号" v-model="formLabelAlign.adm_account"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input placeholder="请输入密码" v-model="formLabelAlign.adm_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-radio v-model="formLabelAlign.position" label="1">平台管理员</el-radio>
            <el-radio v-model="formLabelAlign.position" label="2">门店管理员</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="success" plain @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      //   src: "@/assets/logo.jpg",
      labelPosition: "right",
      formLabelAlign: {
        adm_account: "",
        adm_pwd: "",
        position: "1"
      }
    };
  },
  methods: {
    login() {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/login",
        data: {
          adm_account: this.formLabelAlign.adm_account,
          adm_pwd: this.formLabelAlign.adm_pwd,
          position: this.formLabelAlign.position
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res) {
            this.$store.state.user = res;
            if (this.formLabelAlign.position == "1") {
              this.$store.state.bus_id = 0;
              this.$store.state.username = res.adm_name;
              this.$router.push({ name: "adminBody" });
            } else {
              this.$store.state.bus_id = res.bus_id;
              this.$store.state.username = res.bus_name;
              this.$router.push({ name: "busBody" });
            }
          } else {
            this.$alert("用户名或密码错误", "登录失败");
            this.formLabelAlign.adm_account = "";
            this.formLabelAlign.adm_pwd = "";
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  width: 800px;
  margin: auto;
}
.block {
  text-align: center;
}
.el-image {
  width: 300px;
  text-align: center;
}
</style>