<template>
  <div class="modifyShop">
    <el-form ref="form" :model="form" label-width="80px" label-position="right">
      <el-form-item label="门店名称">
        <el-input v-model="form.shop_name" placeholder="请输入门店名称" :disabled="bus_id==0"></el-input>
      </el-form-item>
      <el-form-item label="门店电话">
        <el-input v-model="form.shop_phone" placeholder="请输入门店电话" :disabled="bus_id==0"></el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <el-input v-model="form.shop_address" placeholder="请输入门店地址" :disabled="bus_id==0"></el-input>
      </el-form-item>
      <el-form-item label="门店描述">
        <!-- <el-input v-model="form.shop_desc" placeholder="请输入门店描述"></el-input> -->
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入门店描述"
          v-model="form.shop_desc"
          :disabled="bus_id==0"
        ></el-input>
      </el-form-item>
      <el-form-item label="" v-if="bus_id==0">
        <el-switch
          style="display: block"
          v-model="active"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="允许使用"
          inactive-text="禁止使用"
          @change="setShop_status"
           v-if="bus_id==0"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{subBtn}}</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
    addType() {
      return this.$route.params.addType;
    },
    bus_id() {
      return this.$store.state.bus_id;
    }
  },
  mounted() {
    let form = this.$route.params.form;
    if (form) {
      this.form.shop_name = form.shop_name;
      this.form.shop_phone = form.shop_phone;
      this.form.shop_address = form.shop_address;
      this.form.shop_desc = form.shop_desc;
      this.form.shop_status = form.shop_status;
      this.form.shop_id = form.shop_id;
      this.subBtn = "修改";
      this.active=form.shop_status==2;
    }
  },
  data() {
    return {
      form: {
        shop_id: null,
        shop_name: "",
        shop_phone: "",
        shop_address: "",
        shop_desc: "",
        shop_status: 2
      },
      subBtn: "申请门店",
      active: true
    };
  },
  methods: {
    setShop_status() {
      if (this.active) {
        this.form.shop_status = 2;
      } else {
        this.form.shop_status = 5;
      }
    },
    onSubmit() {
      if (this.subBtn == "申请门店") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/busBody/addShop",
          data: {
            shop_name: this.form.shop_name,
            shop_phone: this.form.shop_phone,
            shop_address: this.form.shop_address,
            shop_desc: this.form.shop_desc,
            shop_status: this.form.shop_status,
            bus_id:this.bus_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            if (res - 0 != 0) {
              this.$message({
                message: "门店正在申请注册中，等待管理员审核通过！！！",
                type: "success"
              });
              this.$router.go(-1);
            }
          }
        });
      } else if (this.subBtn == "修改") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/busBody/modifyShop",
          data: {
            shop_name: this.form.shop_name,
            shop_phone: this.form.shop_phone,
            shop_address: this.form.shop_address,
            shop_desc: this.form.shop_desc,
            shop_status: this.form.shop_status,
            shop_id: this.form.shop_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            if (res - 0 == 1) {
              this.$message({
                message: "修改成功！！！",
                type: "success"
              });
              this.$router.go(-1);
            }
          }
        });
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.modifyShop {
  width: 800px;
  margin: auto;
}
.el-input {
  width: 400px;
}
</style>