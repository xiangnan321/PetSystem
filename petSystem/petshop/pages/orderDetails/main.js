// pages/orderDetails/main.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsOrder:null,
  },
  // 删除订单
  deleteOrder(e) {
    let that = this; //获取到全局变量 192.168.43.250
    wx.showModal({
      title: '提示',
      content: '是否要' + e.currentTarget.dataset['type'] + "?",
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定',e.currentTarget.dataset['id'])
          wx.request({
            url: "http://192.168.43.250:9999/petSystemServer/busBody/delOrderGoodsBean", //给函数传递服务器地址参数
            method: "post",
            data: {
              oG_id: that.data.goodsOrder.oG_id
            }, //给服务器传递数据
            header: {
              "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
            },
            success: function (res) {
              console.log(res); //打印出返回的数据
              if (res.data > 0) {
                wx.showToast({
                  title: '删除成功！', // 标题
                  icon: 'success', // 图标类型，默认success
                  duration: 1500 // 提示窗停留时间，默认1500ms
                })
                wx.redirectTo({
                  url: "/pages/goodOrder/main?id=5"
                });
              }
            }
          });
        } else if (res.cancel) {}
      }
    })
  },
  // 立即付款
  immediatePayment(e) {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否要立即付款?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'],2);
        } else if (res.cancel) {}
      }
    })
  },
  // 确认收货
  confirmReceipt(e) {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否要确认收货?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'],4);
        } else if (res.cancel) {}
      }
    })
  },
  // 评价
  evaluate(e) {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否要评价?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'],5);
        } else if (res.cancel) {}
      }
    })
  },
  // 修改订单
  modifyOrder(id, orderStatus) {
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/modifyOrderGoodS", //给函数传递服务器地址参数
      method: "post",
      data: {
        oG_id: id,
        orderStatus: orderStatus
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
        wx.redirectTo({
          url: "/pages/goodOrder/main?id=5"
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.goodsOrder)
    this.setData({
      goodsOrder:app.globalData.goodsOrder
    })
    app.globalData.goodsOrder=null;
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