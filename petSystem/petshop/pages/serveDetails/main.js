// pages/serveDetails/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    serveDetail: null,
    imgUrls: [],
    parameterShow: false,
    date: '',
    maxDate: new Date().getTime() + 5 * 24 * 60 * 60 * 1000
  },
  onDisplay() {
    this.setData({
      parameterShow: true
    });
  },
  onClose() {
    this.setData({
      parameterShow: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      parameterShow: false,
      date: this.formatDate(event.detail)
    });
  },
  loginPage() {
    wx.switchTab({
      url: "/pages/wode/main"
    });
  },
  makeAnAppointment() {
    let that = this;
    if (this.data.date == '') {
      wx.showModal({
        title: '提示',
        content: '请选择预约时间！',
        success: function (res) {
          if (res.confirm) {
            console.log('弹框后点确定')
            that.setData({
              parameterShow: true
            });
          } else {
            console.log('弹框后点取消')
          }
        }
      })
    } else {
      // console.log(this.data.date)
      wx.request({
        url: "http://192.168.43.250:9999/petSystemServer/busBody/addOrderServices", //给函数传递服务器地址参数
        method: "post",
        data: {
          user_id: that.data.user.user_id,
          oS_remarks: "",
          oS_state: 1,
          oS_time: that.data.date,
          oS_sum: 1,
          bus_id: that.data.serveDetail.businessBean.bus_id,
          ser_id: that.data.serveDetail.ser_id
        }, //给服务器传递数据
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
        },
        success: function (res) {
          // console.log(res); //打印出返回的数据
          if (res.data != 0) {
            that.setData({
              purchaseShow: false
            })
            wx.showToast({
              title: '预约成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.user = wx.getStorageSync('user');
    if (this.data.user != "") {
      this.setData({
        user: this.data.user,
      })
    }
    for (let i = 0; i < 5; i++) {
      this.data.imgUrls.push({
        url: app.globalData.serveObj.img
      })
    }
    this.setData({
      serveDetail: app.globalData.serveObj.serveBean,
      imgUrls: this.data.imgUrls
    }, () => {
      console.log(this.data.serveDetail, this.data.user);
      app.globalData.serveObj = null
    })
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