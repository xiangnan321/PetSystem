<template>
  <div class="addGood">
    <el-form ref="form" :model="form" label-width="80px" label-position="right">
      <el-form-item label="服务名称">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入商品名称"
          v-model="form.ser_name"
          :disabled="type=='查看'"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务种类">
        <el-select v-model="form.ser_classify" placeholder="请选择" :disabled="type=='查看'">
          <el-option label="宠物寄养" value="宠物寄养"></el-option>
          <el-option label="宠物美容" value="宠物美容"></el-option>
          <el-option label="宠物医疗" value="宠物医疗"></el-option>
          <el-option label="宠物摄影" value="宠物摄影"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用宠物">
        <el-select v-model="form.ser_pet" placeholder="请选择" :disabled="type=='查看'">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="狗" value="狗"></el-option>
          <el-option label="猫" value="猫"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="form.ser_price" placeholder="请输入服务价格(元)" :disabled="type=='查看'"></el-input>
      </el-form-item>
      <el-form-item label="服务描述">
        <!-- <el-input v-model="form.ser_desc" placeholder="请输入门店描述"></el-input> -->
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入服务描述"
          v-model="form.ser_desc"
          :disabled="type=='查看'"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属门店">
        <el-select v-model="form.shopsBeanList" multiple placeholder="请选择" :disabled="type=='查看'">
          <el-option
            v-for="item in shopsBeanList"
            :key="item.shop_id"
            :label="item.shop_name"
            :value="item.shop_id"
          ></el-option>
        </el-select>
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
    type() {
      return this.$route.params.type;
    },
    bus_id() {
      return this.$store.state.bus_id;
    },
    ser_id() {
      return this.$route.params.ser_id;
    }
  },
  mounted() {
    if (this.type == "查看") {
      this.subBtn = "确定";
      this.getServerByser_id();
    } else if (this.type == "修改") {
      this.subBtn = "修改商品";
      this.getServerByser_id();
    }

    this.getShopsBeanList();
  },
  data() {
    return {
      form: {
        ser_id: 0,
        ser_name: "",
        ser_classify: "",
        ser_pet: "",
        ser_price: "",
        ser_desc: "",
        shopsBeanList: []
      },
      subBtn: "添加商品",
      shopsBeanList: []
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);

      let shopsBeanList = "";
      this.form.shopsBeanList.forEach(element => {
        shopsBeanList += element + "-";
      });
      if (this.subBtn == "添加商品") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/busBody/addServicer",
          data: {
            ser_name: this.form.ser_name,
            ser_classify: this.form.ser_classify,
            ser_pet: this.form.ser_pet,
            ser_price: this.form.ser_price,
            ser_desc: this.form.ser_desc,
            shopsBeanList: shopsBeanList,
            bus_id: this.bus_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            if (res - 0 != 0) {
              this.$message({
                message: "商品添加成功！！！",
                type: "success"
              });
              this.$router.go(-1);
            }
          }
        });
      } else if (this.subBtn == "修改商品") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/busBody/modifyServicer",
          data: {
            ser_id: this.ser_id,
            ser_name: this.form.ser_name,
            ser_classify: this.form.ser_classify,
            ser_pet: this.form.ser_pet,
            ser_price: this.form.ser_price,
            ser_desc: this.form.ser_desc,
            shopsBeanList: shopsBeanList,
            bus_id: this.bus_id
          },
          dataType: "json",
          changeOrigin: "true",
          success: res => {
            if (res - 0 != 0) {
              this.$message({
                message: "商品修改成功！！！",
                type: "success"
              });
              this.$router.go(-1);
            }
          }
        });
      } else if (this.subBtn == "确定") {
        console.log(this.form.shopsBeanList);
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    getShopsBeanList() {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/getShopsByBusId",
        data: {
          bus_id: this.bus_id
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.shopsBeanList = res;
        }
      });
    },
    getServerByser_id() {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/getServiceShop",
        data: {
          ser_id: this.ser_id
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.form.ser_id = res.ser_id;
          this.form.ser_name = res.ser_name;
          this.form.ser_classify = res.ser_classify;
          this.form.ser_pet = res.ser_pet;
          this.form.ser_price = res.ser_price;
          this.form.ser_desc = res.ser_desc;
          res.shopsBeanList.forEach(element => {
            this.form.shopsBeanList.push(element.shop_id);
          });
          // shopsBeanList: []
        }
      });
    }
  }
};
</script>

<style scoped>
.addGood {
  width: 800px;
  margin: auto;
}
.el-input {
  width: 400px;
}
.el-upload {
  border: 1px dashed #d9d9d993;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-input__inner {
  width: 100%;
}
.el-input,
el-textarea__inner {
  width: 400px;
}
</style>