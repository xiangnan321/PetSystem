// pages/wode/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    user: null
  },

  bindGetUserInfo: function (e) {
    // console.log(e, 111);
    // console.log(e.detail.userInfo);
    // this.userLogin(e.detail.userInfo)
    let that = this; //获取到全局变量
    if (e.detail.userInfo) {
      wx.request({
        url: "http://192.168.43.250:9999/petSystemServer/users/getUsersBean", //给函数传递服务器地址参数
        method: "post",
        data: {
          user_name: e.detail.userInfo.nickName,
          user_username: "",
          user_gender: e.detail.userInfo.gender == 1 ? "男" : "女",
          user_phone: "",
          user_image: e.detail.userInfo.avatarUrl
        }, //给服务器传递数据
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
        },
        success: function (res) {
          console.log(res)
          if (res.data != null) {
            wx.setStorageSync("user", res.data);
            that.setData({
              user: res.data
            })
            wx.showToast({
              title: '登录成功！！！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      });
    }
  },

  allGoodOrder(e) {
    // console.log(e.currentTarget.dataset['index']);
    wx.navigateTo({
      url: "/pages/goodOrder/main?id=" + e.currentTarget.dataset['index']
    });
  },
  allseverOrder(e) {
    // console.log(e.currentTarget.dataset['index']);
    wx.navigateTo({
      url: "/pages/severOrder/main?id=" + e.currentTarget.dataset['index']
    });
  },
  address() {
    wx.navigateTo({
      url: "/pages/address/main"
    });
  },
  uploaderImg(e){
    wx.navigateTo({
      url: "/pages/modifyUserinfo/main"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('user'),wx.getStorageSync('user')==null,wx.getStorageSync('user')=="");
    // this.data.user = wx.getStorageSync('user');
    // if (this.data.user != "") {
    //   this.setData({
    //     user: this.data.user
    //   })
    // }
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
    this.data.user = wx.getStorageSync('user');
    if (this.data.user != "") {
      this.setData({
        user: this.data.user
      })
    }
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