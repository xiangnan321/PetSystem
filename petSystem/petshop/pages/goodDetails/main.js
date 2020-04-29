// pages/goodDetails/main.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    goodDetail: null,
    imgUrls: [],
    parameterShow: false,
    purchaseShow: false,
    oG_sum: 1,
    purchaseType: ""
  },
  aoodsActionIcon(e) {
    console.log(e)
    if (e.currentTarget.dataset['text'] == "购物车") {
      wx.switchTab({
        url: "/pages/shoppingcart/main"
      });
    }
  },
  parameterSelect() {
    this.setData({
      parameterShow: true
    });
  },
  parameterClose(e) {
    this.setData({
      parameterShow: false
    });
  },
  aoodsActionButton(e) {
    console.log(e)
  },
  stepperChange(e) {
    // console.log(e.detail);oG_sum//purchaseType: e.currentTarget.dataset['text']
    this.setData({
      oG_sum: e.detail
    });
  },
  purchaseSelect(e) {
    this.setData({
      purchaseShow: true,
      purchaseType: e.currentTarget.dataset['text']
    });
  },
  purchaseClose() {
    this.setData({
      purchaseShow: false
    });
  },
  loginPage() {
    wx.switchTab({
      url: "/pages/wode/main"
    });
  },
  purchaseBtn() {
    // console.log(this.data.purchaseType)
    let that = this;
    if (this.data.purchaseType == "加入购物车") {
      wx.request({
        url: "http://192.168.43.250:9999/petSystemServer/users/addShoppingcart", //给函数传递服务器地址参数
        method: "post",
        data: {
          sC_num: this.data.oG_sum,
          user_id: this.data.user.user_id,
          good_id: this.data.goodDetail.good_id,
          ser_id: 0
        }, //给服务器传递数据
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
        },
        success: function (res) {
          // console.log(res); //打印出返回的数据
          if (res.data != 0) {
            that.setData({
              purchaseShow: false,
              sC_num: 1
            })
            wx.showToast({
              title: '成功加入购物车！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
          }
        }
      });
    } else {
      console.log(this.data.purchaseType);
      let goodsList=[];
      goodsList.push({
        oG_sum:that.data.oG_sum,
        goodsBean:that.data.goodDetail,
        usersBean:that.data.user,
        remarks:"",
        sC_id:0
      })
      app.globalData.goodsList=goodsList;
      app.globalData.money=that.data.goodDetail.good_price*that.data.oG_sum;
      wx.navigateTo({ url: "/pages/purchaseGood/main"})
    }
  },
  render(id) {
    let that = this; //获取到全局变量
    this.setData({
      goodDetail: null,
      imgUrls: []
    })
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/getGoodShop", //给函数传递服务器地址参数
      method: "post",
      data: {
        good_id: id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res); //打印出返回的数据
        let arr = []
        for (let i = 0; i < 5; i++) {
          arr.push({
            url: res.data.good_images
          });
        }
        that.setData({
          goodDetail: res.data,
          imgUrls: arr
        })
        // console.log(that.data.goodDetail, arr);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.user = wx.getStorageSync('user');
    if (this.data.user != "") {
      this.setData({
        user: this.data.user
      })
    }
    this.render(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})