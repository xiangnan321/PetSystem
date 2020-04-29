<template>
  <div class="header">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <a href>
            <img src alt />
          </a>
          <a href="#" class="title">宠物管理系统</a>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- 未登录状态 -->
          <el-link type="primary">
            <router-link :to="{name:'loginLink'}" v-show="!isLogin" class="nav-link">登录</router-link>
          </el-link>
          <el-link type="primary">
            <router-link :to="{name:'register'}" v-show="!isLogin" class="nav-link">注册</router-link>
          </el-link>
          <!-- 登陆后状态 -->
          <el-link type="primary" v-show="isLogin">
            <span class="nav-link loginOut" v-show="isLogin">{{ username }}</span>
          </el-link>
          <el-link type="primary"  v-show="isLogin">
            <span class="nav-link loginOut" v-show="isLogin" @click="loginOut">
              <!-- <el-avatar>{{ username }}</el-avatar> -->
            </span>
          </el-link>
          <el-link type="primary">
            <span class="nav-link loginOut" v-show="isLogin" @click="loginOut">[退出]</span>
          </el-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: ""
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user;
    },
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    loginOut() {
      this.$store.state.user=null;
      this.$store.state.username='';
      this.$store.state.bus_id=null;
      this.$router.push({name:"loginLink"})
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  text-decoration: none;
  color: #67c23a;
}
.el-link a,
.el-link span {
  font-size: 18px;
  text-decoration: none;
  color: white;
  margin: 20px;
}
</style>