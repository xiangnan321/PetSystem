<template>
  <div class="addAdmin">
    <el-form ref="form" :model="form" label-width="80px" label-position="right">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字'}
    ]"
      >
        <el-input
          type="age"
          placeholder="请输入年龄"
          v-model.number="form.age"
          clearable
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男" border></el-radio>
          <el-radio label="女" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone" @blur="blur_phone" placeholder="请输入电话号码"></el-input>
        <span v-show="vshow_phone!=''">{{ vshow_phone }}</span>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.position" placeholder="请选择创建的用户类型">
          <el-option label="商家" value="0" v-if="addType==0"></el-option>
          <el-option label="管理员" value="1" v-else-if="addType==1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" @blur="blur_account" placeholder="请输入账号"></el-input>
        <span v-show="vshow_account!=''">{{ vshow_account }}</span>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="form.pwd" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.user;
    },
    addType() {
      return this.$route.params.addType;
    }
  },
  data() {
    return {
      form: {
        name: "",
        age: "",
        gender: "",
        phone: "",
        position: "",
        account: "",
        pwd: ""
      },
      vshow_phone: "",
      vshow_account: ""
    };
  },
  methods: {
    onSubmit() {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/adminBody/addAdmin",
        data: {
          addType: this.addType,
          fk_adm_id: this.isLogin.adm_id,
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender,
          phone: this.form.phone,
          account: this.form.account,
          pwd: this.form.pwd
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res - 0 == 1) {
            this.$message({
              message: "管理员添加成功！！！",
              type: "success"
            });
            if (this.addType == 1) {
              this.$router.push({ name: "adminList" });
            } else if (this.addType == 0) {
              this.$router.push({ name: "busList" });
            }
          }
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    // 表单验证
    blur_phone() {
      // 检查正则
      var re_phone = /^1[345789]\d{9}$/;
      if (re_phone.test(this.form.phone)) {
        this.vshow_phone = "";
      } else {
        this.vshow_phone = "手机号输入有误！！！";
      }
    },
    blur_account() {
      $.ajax({
        type: "get",
        url:
          "http://localhost:9999/petSystemServer/adminBody/IsExistenceAccount",
        data: {
          account: this.form.account,
          addType: this.addType
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          if (res) {
            this.vshow_account = "该账号已存在！！！";
          } else {
            this.vshow_account = "";
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.addAdmin {
  width: 800px;
  margin: auto;
}
.el-input {
  width: 300px;
}
.el-form-item span {
  color: red;
}
</style>