<template>
  <div class="addGood">
    <el-form ref="form" :model="form" label-width="80px" label-position="right">
      <el-form-item label="商品名称">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入商品名称"
          v-model="form.good_name"
          :disabled="type=='查看'"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品种类">
        <el-select v-model="form.good_cassify" placeholder="请选择" :disabled="type=='查看'">
          <el-option label="爱宠主食" value="爱宠主食"></el-option>
          <el-option label="爱宠零食" value="爱宠零食"></el-option>
          <el-option label="日常用品" value="日常用品"></el-option>
          <el-option label="爱宠玩具" value="爱宠玩具"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用宠物">
        <el-select v-model="form.good_pet" placeholder="请选择" :disabled="type=='查看'">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="狗" value="狗"></el-option>
          <el-option label="猫" value="猫"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="form.good_price" placeholder="请输入商品价格(元)" :disabled="type=='查看'"></el-input>
      </el-form-item>
      <el-form-item label="重量(kg)">
        <el-input v-model="form.good_weight" placeholder="请输入商品重量(kg)" :disabled="type=='查看'"></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-date-picker
          v-model="form.good_production"
          type="date"
          placeholder="选择日期"
          :disabled="type=='查看'"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="保质期(月)">
        <el-input v-model="form.good_shelfLife" placeholder="请输入保质期(月)" :disabled="type=='查看'"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="form.good_producer" placeholder="请输入产地" :disabled="type=='查看'"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <!-- <el-input v-model="form.shop_desc" placeholder="请输入门店描述"></el-input> -->
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6}"
          placeholder="请输入商品描述"
          v-model="form.good_desc"
          :disabled="type=='查看'"
        ></el-input>
      </el-form-item>
      <el-form-item label="已售出">
        <el-input v-model="form.good_sum" placeholder="请输入已售出数量" :disabled="type=='查看'"></el-input>
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
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept=".jpg, .png, .jpeg"
          :disabled="type=='查看'"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="object-fit: contain" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    good_id() {
      return this.$route.params.good_id;
    }
  },
  mounted() {
    if (this.type == "查看") {
      this.subBtn = "确定";
      this.getGoodByGood_id();
    } else if (this.type == "修改") {
      this.subBtn = "修改商品";
      this.getGoodByGood_id();
    }

    this.getShopsBeanList();
  },
  data() {
    return {
      form: {
        good_id: 0,
        good_name: "",
        good_cassify: "",
        good_pet: "",
        good_price: "",
        good_weight: "",
        good_production: "",
        good_shelfLife: "",
        good_producer: "",
        good_desc: "",
        good_sum: "",
        good_images: "",
        shopsBeanList: []
      },
      subBtn: "添加商品",
      imageUrl: "",
      shopsBeanList: []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.good_images =
        "http://192.168.43.250:3000/images/" + file.response.saveName;
    },
    beforeAvatarUpload(file) {
      console.log("beforeAvatarUpload", file);
    },
    onSubmit() {
        console.log(this.form)
      var d = new Date(this.form.good_production);
      this.form.good_production =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

      let shopsBeanList = "";
      this.form.shopsBeanList.forEach(element => {
        shopsBeanList += element + "-";
      });
      if (this.subBtn == "添加商品") {
        $.ajax({
          type: "post",
          url: "http://localhost:9999/petSystemServer/busBody/addGood",
          data: {
            good_name: this.form.good_name,
            good_cassify: this.form.good_cassify,
            good_pet: this.form.good_pet,
            good_price: this.form.good_price,
            good_weight: this.form.good_weight + "kg",
            good_production: this.form.good_production,
            good_shelfLife: this.form.good_shelfLife + "个月",
            good_producer: this.form.good_producer,
            good_desc: this.form.good_desc,
            good_sum: this.form.good_sum,
            good_images: this.form.good_images,
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
          url: "http://localhost:9999/petSystemServer/busBody/modifyGood",
          data: {
            good_id: this.form.good_id,
            good_name: this.form.good_name,
            good_cassify: this.form.good_cassify,
            good_pet: this.form.good_pet,
            good_price: this.form.good_price,
            good_weight: this.form.good_weight ,
            good_production: this.form.good_production,
            good_shelfLife: this.form.good_shelfLife,
            good_producer: this.form.good_producer,
            good_desc: this.form.good_desc,
            good_sum: this.form.good_sum,
            good_images: this.form.good_images,
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
    getGoodByGood_id() {
      $.ajax({
        type: "post",
        url: "http://localhost:9999/petSystemServer/busBody/getGoodShop",
        data: {
          good_id: this.good_id
        },
        dataType: "json",
        changeOrigin: "true",
        success: res => {
          this.form.good_id = res.good_id;
          this.form.good_name = res.good_name;
          this.form.good_cassify = res.good_cassify;
          this.form.good_pet = res.good_pet;
          this.form.good_price = res.good_price;
          this.form.good_weight = res.good_weight;
          this.form.good_production = res.good_production;
          this.form.good_shelfLife = res.good_shelfLife;
          this.form.good_producer = res.good_producer;
          this.form.good_desc = res.good_desc;
          this.form.good_sum = res.good_sum;
          this.form.good_images = res.good_images;
          this.imageUrl = res.good_images;
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