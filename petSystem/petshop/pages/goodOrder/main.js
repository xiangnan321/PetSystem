// pages/goodOrder/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    active: "5",
    goodsOrder: [],
    currentPage: 1,
    pageSize: 10,
    baseline: false
  },
  vanTabsChange(e) {
    // console.log(e.detail.name)
    this.setData({
      active: e.detail.name,
      currentPage: 1,
      goodsOrder: []
    });
    this.render();
  },
  // 删除订单
  deleteOrder(e) {
    wx.showModal({
      title: '提示',
      content: '是否要' + e.currentTarget.dataset['type'] + "?",
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定',e.currentTarget.dataset['id'])
          let that = this; //获取到全局变量 192.168.43.250
          wx.request({
            url: "http://192.168.43.250:9999/petSystemServer/busBody/delOrderGoodsBean", //给函数传递服务器地址参数
            method: "post",
            data: {
              oG_id: e.currentTarget.dataset['id']
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
                that.render();
              }
            }
          });
        } else if (res.cancel) {}
      }
    })
  },
  // 立即付款
  immediatePayment(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否要立即付款?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'], 2);
        } else if (res.cancel) {}
      }
    })
  },
  // 确认收货
  confirmReceipt(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否要确认收货?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'], 4);
        } else if (res.cancel) {}
      }
    })
  },
  // 评价
  evaluate(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否要评价?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'], 5);
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
        console.log(orderStatus == 4)
        if (orderStatus == 4) {
          that.setData({
            active: "4"
          })
        } else {
          // that.onLoad({id:that.data.active})
          that.setData({
            goodsOrder: [],
            currentPage: 1,
            baseline: false
          },()=>{
            that.render()
          })
        }
      }
    });
  },
  // 订单详情
  orderDetails(e) {
    if (e.target.id != "viewLogistics") {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      })
      app.globalData.goodsOrder = this.data.goodsOrder[e.currentTarget.dataset['id']];
      // console.log(e,999)
      // wx.navigateTo({ url: "/pages/orderDetails/main?id=" + JSON.stringify(this.data.goodsOrder[e.currentTarget.dataset['id']])});
      wx.navigateTo({
        url: "/pages/orderDetails/main"
      })
    }
  },
  render() {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/showOrderGoodsByUser_id", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: this.data.user.user_id,
        oG_status: this.data.active == "5" ? 0 : this.data.active,
        currentPage: that.data.currentPage,
        pageSize: that.data.pageSize
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res, that.data.goodsOrder); //打印出返回的数据
        if (res.data.datas.length != 0) {
          if (res.data.datas.length != that.data.pageSize) {
            that.setData({
              baseline: !that.data.baseline
            })
          }
          that.data.goodsOrder.push(...res.data.datas);
          that.setData({
            goodsOrder: that.data.goodsOrder
          })
        } else {
          that.setData({
            baseline: !that.data.baseline
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.id,
      user: wx.getStorageSync('user'),
      goodsOrder: []
    },()=>{
      this.render()
    })
    // if (options.id == 5) {
    // this.render()
    // }
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.baseline) {
      this.data.currentPage++
      this.setData({
        currentPage: this.data.currentPage
      })
      this.render()
    }
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
    // this.data.goodsOrder=[]
    // this.setData({
    //   goodsOrder: this.data.goodsOrder,
    //   // baseline: false
    // })
    // this.render()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})