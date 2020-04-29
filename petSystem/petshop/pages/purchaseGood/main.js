// pages/purchaseGood/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    money: 0,
    user_address: 0,
    address: null,
    checked: true
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  choiceAdd(e) {
    console.log(e)
    app.globalData.selectAddress = true;
    wx.navigateTo({
      url: "/pages/address/main"
    });
  },
  renderAddress() {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/getAddressById", //给函数传递服务器地址参数
      method: "post",
      data: {
        add_id: this.data.user_address
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.data
        })
      }
    });
  },

  onSubmit() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认付款?',
      success(res) {
        if (res.confirm) {
          let num=0;
          // console.log('用户点击确定', e.currentTarget.dataset['id'])
          that.data.goodsList.forEach(item => {
            wx.request({
              url: "http://192.168.43.250:9999/petSystemServer/busBody/addOrderGoodsBean", //给函数传递服务器地址参数
              method: "post",
              data: {
                bus_id: item.goodsBean.businessBean.bus_id,
                user_id: item.usersBean.user_id,
                oG_remarks: item.remarks,
                oG_state: 2,
                oG_sum: item.oG_sum,
                good_id: item.goodsBean.good_id,
                add_id: that.data.address.add_id
              }, //给服务器传递数据
              header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
              },
              success: function (res) {
                // console.log(res); //打印出返回的数据
                // wx.redirectTo({
                //   url: "/pages/goodOrder/main?id=5"
                // });
                if (res.data != 0) {
                  if (item.sC_id != 0) {
                    that.delShoppingcart(item.sC_id);
                    num++;
                    if(num==that.data.goodsList.length){
                      setTimeout(()=>{
                        wx.switchTab({
                          url: "/pages/shoppingcart/main"
                        });
                      },100)
                    }
                  }else{
                    wx.navigateBack({
                      url: "/pages/goodDetails/main"
                    });
                  }
                }
              }
            });
          })
        } else if (res.cancel) {
          let num=0;
          that.data.goodsList.forEach(item => {
            wx.request({
              url: "http://192.168.43.250:9999/petSystemServer/busBody/addOrderGoodsBean", //给函数传递服务器地址参数
              method: "post",
              data: {
                bus_id: item.goodsBean.businessBean.bus_id,
                user_id: item.usersBean.user_id,
                oG_remarks: item.remarks,
                oG_state: 1,
                oG_sum: item.oG_sum,
                good_id: item.goodsBean.good_id,
                add_id: that.data.address.add_id
              }, //给服务器传递数据
              header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
              },
              success: function (res) {
                // console.log(res); //打印出返回的数据
                // wx.redirectTo({
                //   url: "/pages/goodOrder/main?id=5"
                // });
                if (res.data != 0) {
                  if (item.sC_id != 0) {
                    that.delShoppingcart(item.sC_id);
                    num++;
                    if(num==that.data.goodsList.length){
                      setTimeout(()=>{
                        wx.switchTab({
                          url: "/pages/shoppingcart/main"
                        });
                      },100)
                    }
                  }else{
                    wx.navigateBack({
                      url: "/pages/goodDetails/main"
                    });
                  }
                }
              }
            });
          })
        }
      }
    })
  },
  // 删除购物车里的数据
  delShoppingcart(id) {
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/delShoppingcart", //给函数传递服务器地址参数
      method: "post",
      data: {
        sC_id: id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据=
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsList: app.globalData.goodsList,
      money: app.globalData.money,
      user_address: app.globalData.goodsList[0].usersBean.user_address
    }, () => {
      if (this.data.user_address != 0) {
        this.renderAddress()
      }
    })
    console.log(app.globalData.goodsList, app.globalData.money)
    app.globalData.goodsList = null;
    app.globalData.money = 0;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user_address = app.globalData.user_address;
    if (user_address != undefined && user_address != 0) {
      this.setData({
        user_address
      }, () => {
        this.renderAddress()
      })
      app.globalData.user_address = 0;
    }
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