// pages/severOrder/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:"4",
    user: null,
    serveOrder: [],
    serveImage: {
      "宠物寄养": "http://192.168.43.250:3000/images/20180914043907578.jpg",
      "宠物美容": "http://192.168.43.250:3000/images/cosmetology.jpg",
      "宠物医疗":"http://192.168.43.250:3000/images/download.jpg",
      "宠物摄影":"http://192.168.43.250:3000/images/u=1919703332,2573013977&fm=26&gp=0.png"
    },
    currentPage: 1,
    pageSize: 10,
    baseline: false
  },
  vanTabsChange(e){
    this.setData({
      active: e.detail.name,
      currentPage: 1,
      serveOrder: []
    });
    this.render();
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
            url: "http://192.168.43.250:9999/petSystemServer/busBody/delOrderServices", //给函数传递服务器地址参数
            method: "post",
            data: {
              oS_id: e.currentTarget.dataset['id']
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
                that.onLoad({id:that.data.active})
              }
            }
          });
        } else if (res.cancel) {}
      }
    })
  },
  // 确认完成
  immediatePayment(e){
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否确认完成订单?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.modifyOrder(e.currentTarget.dataset['id'],2);
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
          that.modifyOrder(e.currentTarget.dataset['id'],4);
        } else if (res.cancel) {}
      }
    })
  },
  // 修改订单
  modifyOrder(id, orderStatus) {
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/modifyOrderServices", //给函数传递服务器地址参数
      method: "post",
      data: {
        oS_id: id,
        oS_state: orderStatus
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
        console.log(orderStatus==2)
        if(orderStatus==2){
          that.setData({
            active:"2"
          })
        }else{
          that.onLoad({id:that.data.active})
        }
      }
    });
  },
  render() {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/showOrderServicesByUser_id", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: this.data.user.user_id,
        oS_state: this.data.active == "4" ? 0 : this.data.active,
        currentPage: that.data.currentPage,
        pageSize: that.data.pageSize
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res,that.data.serveOrder); //打印出返回的数据
        if (res.data.datas.length != 0) {
          if (res.data.datas.length != that.data.pageSize) {
            that.setData({
              baseline: !that.data.baseline
            })
          }
          that.data.serveOrder.push(...res.data.datas);
          that.setData({
            serveOrder: that.data.serveOrder
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
      active:options.id,
      user: wx.getStorageSync('user'),
      serveOrder: []
    })
    if (options.id == 4) {
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