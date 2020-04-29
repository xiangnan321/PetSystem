// pages/address/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_id: null,
    user: null,
    addressList: []
  },

  onChange(e) {
    // console.log(e)
    this.setData({
      add_id: e.detail
    });
    if(app.globalData.selectAddress!=undefined&&app.globalData.selectAddress!=false){
      app.globalData.user_address=e.detail;
      wx.navigateBack({url: "/pages/purchaseGood/main"})
      app.globalData.selectAddress=false;
    }
  },
  addressEdit(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset["type"])
    let type = e.currentTarget.dataset["type"];
    if (type == "add") {
      wx.navigateTo({
        url: "/pages/addressEdit/main?id=" + 0 + "&type=add"
      });
    } else if (type == "edit") {
      wx.navigateTo({
        url: "/pages/addressEdit/main?id=" + e.currentTarget.dataset['id'] + "&type=edit"
      });
    }
  },
  render() {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/getUsersBeanById", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: this.data.user.user_id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        that.setData({
          add_id: res.data.user_address
        })
        wx.setStorageSync("user", res.data);
      }
    });
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/showAddress", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: this.data.user.user_id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res,res.data.length)
        that.setData({
          addressList: res.data
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.user = wx.getStorageSync('user');
    this.setData({
      user: this.data.user
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.render()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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