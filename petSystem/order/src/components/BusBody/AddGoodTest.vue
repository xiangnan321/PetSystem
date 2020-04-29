<template>
  <div>
    <el-row style="text-align: left;margin-bottom: 10px;">
      <el-button type="primary" @click="AddGoods" round>添加商品</el-button>
    </el-row>
    <div>
      <el-table :data="datas" border @click="handleClick" style="width: 100%">
        <el-table-column fixed prop="GoodsId" label="编号" width="60"></el-table-column>
        <el-table-column prop="GoodsName" label="商品名称" width="100"></el-table-column>
        <el-table-column prop="StoresName" label="所属门店" width="100"></el-table-column>
        <el-table-column prop="Paddress" label="产地来源" width="100"></el-table-column>
        <el-table-column prop="GoodsMoney" label="售价" width="120"></el-table-column>
        <el-table-column prop="GoodsCount" label="库存" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="cancelCloseShop(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="updateStors(scope.row)">查看</el-button>
            <el-button type="danger" size="mini" @click="CloseShop(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" style="background:none" height="300">
        <h1>添加商品</h1>
        <el-form
          ref="form"
          action="/excel/uploadFile"
          class="form-horizontal"
          method="POST"
          enctype="multipart/form-data"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="店主">
            <el-input v-model="form.MerchantsName" placeholder="店主" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型" style="text-align:left;">
            <el-radio-group v-model="form.GoodsType">
              <el-radio label="1">食物</el-radio>
              <el-radio label="2">生活用品</el-radio>
              <el-radio label="3">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.GoodsName" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="适合宠物" style="text-align:left;">
            <el-radio-group v-model="form.Fororder">
              <el-radio style="margin-right: 10px;" label="1">狗类</el-radio>
              <el-radio style="margin-right: 10px;" label="2">猫类</el-radio>
              <el-radio style="margin-right: 10px;" label="3">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="售价">
            <el-input type="number" v-model.number="form.GoodsMoney" placeholder="售价"></el-input>
          </el-form-item>
          <el-form-item label="保质期(月)">
            <el-input type="number" v-model.number="form.Shelflife" placeholder="保质期(月)"></el-input>
          </el-form-item>
          <el-form-item label="生产地">
            <el-input v-model="form.Paddress" placeholder="生产地"></el-input>
          </el-form-item>
          <el-form-item label="库存量(件)">
            <el-input type="number" v-model.number="form.GoodsCount" placeholder="库存量"></el-input>
          </el-form-item>
          <el-form-item label="商品图片"></el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" maxlength="30" v-model="form.Description"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:0;">
            <el-upload
              class="upload-demo"
              action
              :limit="1"
              :file-list="formFileList"
              :http-request="handleUploadForm"
              :on-exceed="formHandleExceed"
              :on-remove="formHandleRemove"
              :before-upload="beforeUploadForm"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            >
              <span
                slot="tip"
                class="el-upload__tip"
                style="margin: 0 10px;"
              >只能上传img文件，且不超过{{formMaxSize}}M</span>
              <el-button type="primary">选择图片并添加</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <p>点击任意位置即可关闭...</p>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let str = window.location.href;
    str = str.substring(str.length - 1);
    return {
      activeName: "second",
      dialogVisible: false,
      MerchantsId: str,
      datas: [],
      addStors: false,
      StoreName: "",
      Storesid: this.$store.state.currenUser.id,
      ProductionDate: "",
      // isState: true,
      MerchantsName: this.$store.state.currenUser.name,
      value1: "",
      form: {
        Shelflife: "",
        GoodsType: 1,
        Fororder: 1,
        Paddress: "",
        GoodsCount: "",
        GoodsMoney: "",
        GoodsName: "",
        Description: "",
        ProductionDate: "",
        fileImage: ""
      },
      formMaxSize: 30, // 上传文件大小
      formFileList: [], // 显示上传文件
      uploadFormFileList: [], // 确定上传文件
      //分页
      currentaPage: 1,
      pageSize: 5,
      tolSize: "",
      tolNum: ""
    };
  },
  methods: {
    // getStorsData
    handleSizeChange(val) {
      console.log(val);
      // this.pageSize = val;
      this.getUsersInfo(1, val, null);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentaPage = val;
      this.getUsersInfo(val, this.pageSize);
    },
    onSubmit() {
      console.log(this.form);

      $.ajax({
        url: "http://localhost:80/PetStore/addGoods",
        method: "POST",
        data: {
          Shelflife: this.form.Shelflife,
          GoodsType: this.form.GoodsType,
          Fororder: this.form.Fororder,
          Paddress: this.form.Paddress,
          GoodsCount: this.form.GoodsCount,
          GoodsMoney: this.form.GoodsMoney,
          GoodsName: this.form.GoodsName,
          Description: this.form.Description,
          Storesid: this.Storesid
        },
        dataType: "json",
        changeOrigin: true,
        success: res => {
          console.log(res);
        }
      });
    },
    uploadImg(e) {
      console.log(e.target.files);
      let file = event.target.files[0];
      console.log(file);
      this.form.fileImage = file;
      let reader = new FileReader();
      let img = new Image();
      // 读取图片
      if (file == null || file == "") {
        this.$message("请选择图片");
      }
    },
    handleClick() {},
    //闭店
    CloseShop(row) {},
    //取消闭店
    cancelCloseShop(row) {},
    //修改
    updateStors(row) {
      $("#btn span").html("修改");
      console.log($("#btn span").html());
    },
    AddGoods() {
      $("#btn span").html("提交");
      this.form.ProductionDate = this.ProductionDate;
      this.form.Storesid = this.Storesid;
      console.log(this.form);
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    OnaddStors() {
      if ($("#btn").children()[0].innerText == "提交") {
      }
      if ($("#btn").children()[0].innerText == "修改") {
      }
    },
    // 开始上传前验证
    beforeUploadForm(file) {
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message({
          message: `上传文件大小不能超过${this.formMaxSize}M!`,
          type: "warning"
        });
        return false;
      }
      // 中文乱码处理
      if (file.raw) {
        let reader = new FileReader(); // 读取文件内容
        reader.readAsText(file.raw, "gb2312"); // 防止中文乱码问题，不加reader.onload方法都不会触发
        reader.onload = function(e) {
          this.contentHtml = e.target.result; // txt文本内容，接下来就可以对其进行校验处理了
        };
      }
      // 验证文件类型
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg" || testmsg === "png";
      if (!extension) {
        this.$message({
          message: "上传文件只能是图片格式!",
          type: "warning"
        });
      }
      return extension;
    },
    // 移除上传列表中文件
    formHandleRemove(file, formFileList) {
      let thiz = this;
      for (let i = 0; i < thiz.uploadFormFileList.length; i++) {
        if (thiz.uploadFormFileList[i].pname === file.name) {
          thiz.uploadFormFileList.splice(i, 1);
          break;
        }
      }
    },
    // 允许上传文件个数验证
    formHandleExceed(files, formFileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + formFileList.length} 个文件`
      );
    },
    // 上传文件
    handleUploadForm(param) {
      let thiz = this;
      let formData = new FormData();
      formData.append("files", param.file);
      formData.append("GoodsType", this.form.GoodsType);
      formData.append("Fororder", this.form.Fororder);
      formData.append("Shelflife", this.form.Shelflife);
      formData.append("Paddress", this.form.Paddress);
      formData.append("GoodsCount", this.form.GoodsCount);
      formData.append("GoodsMoney", this.form.GoodsMoney);
      formData.append("GoodsName", this.form.GoodsName);
      formData.append("Description", this.form.Description);
      formData.append("Storesid", this.Storesid);
      let loading = thiz.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      $.ajax({
        url: "http://localhost:80/PetStore/addGoods",
        method: "POST",
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        changeOrigin: true,
        success: res => {
          if (res) {
            thiz.$message("添加成功！！");
            this.getStorsData(null, null);
            loading.close();
          }
        }
      });
    },
    getStorsData(goodstype, goosemoney) {
      $.ajax({
        url: "http://localhost:80/PetStore/showGoodsInfo",
        data: {
          MerchantsId: this.MerchantsId,
          pageSize: this.pageSize,
          currentaPage: this.currentaPage,
          goodstype,
          goosemoney
        },
        method: "POST",
        dataType: "json",
        changeOrigin: true,
        success: res => {
          console.log(res);
          this.tolNum = res.tolNum;
          this.tolSize = res.tolSize;
          let str = {};
          //清空
          // this.datas = [];
          res.datas.forEach(item => {
            if (item.GoodsType == 1) {
              item.GoodsType = "宠物粮";
            } else if (item.GoodsType == 2) {
              item.GoodsType = "工具";
            } else {
              item.GoodsType = "未注明";
            }
            if (item.Fororder == 1) {
              item.GoodsType = "狗类";
            } else if (item.Fororder == 2) {
              item.GoodsType = "猫类";
            } else {
              item.GoodsType = "其他";
            }
            //所属门店
            item.StoresName = item.storesBean.StoresName;
          });
          this.datas = res.datas;
        }
      });
    }
  },
  mounted() {
    this.$message("登陆成功，欢迎您！");
    let str = window.location.href;
    str = str.substring(str.length - 1);
    this.getStorsData(null, null);
  }
};
</script>
<style>
.el-dialog__headerbtn {
  opacity: 0;
}
</style>
