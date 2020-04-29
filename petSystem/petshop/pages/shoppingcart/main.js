// pages/shoppingcart/main.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    shoppingcart: null,
    money: 0,
    checked: false
  },
  // 复选框
  checkboxChange(e) {
    let index = e.currentTarget.dataset['id'];
    this.data.shoppingcart[index].checked = !this.data.shoppingcart[index].checked;
    this.setData({
      shoppingcart: this.data.shoppingcart
    }, () => {
      this.total()
    });
  },

  // 修改步进器的值
  stepperChange(e) {
    let index = e.currentTarget.dataset['id'];
    this.data.shoppingcart[index].sC_num = e.detail;
    this.setData({
      shoppingcart: this.data.shoppingcart
    }, () => {
      this.total()
    });
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/modifyShoppingcart", //给函数传递服务器地址参数
      method: "post",
      data: {
        sC_id:this.data.shoppingcart[index].sC_id,
        sC_num:e.detail
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
      }
    });
  },
  // 合计总额
  total() {
    this.data.money = 0;
    this.data.shoppingcart.forEach(item => {
      if (item.checked) {
        this.data.money += item.sC_num * item.goodsBean.good_price
      }
    });
    this.setData({
      money: this.data.money
    })
  },
  // 点击删除
  swipeClose(e) {
    let that =this;
    const {
      position,
      instance
    } = e.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '是否要删除该商品？',
          success(res) {
            if (res.confirm) {
              // console.log(e.currentTarget.dataset['id'],删除)
              wx.request({
                url: "http://192.168.43.250:9999/petSystemServer/users/delShoppingcart", //给函数传递服务器地址参数
                method: "post",
                data: {
                  sC_id: e.currentTarget.dataset['id']
                }, //给服务器传递数据
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
                },
                success: function (res) {
                  if(res.data!=0){
                    wx.showToast({
                      title: '删除成功！', // 标题
                      icon: 'success', // 图标类型，默认success
                      duration: 2000 // 提示窗停留时间，默认1500ms
                    })
                    that.onShow()
                  }
                }
              });
            } else if (res.cancel) {}
          }
        })
        break;
    }
  },
  // 全选
  primaryChange(e) {
    this.data.shoppingcart.forEach(item => {
      item.checked = !this.data.checked;
    });
    this.setData({
      shoppingcart: this.data.shoppingcart,
      checked: !this.data.checked
    }, () => {
      this.total()
    })
  },

  renderPage() {
    let that = this;
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/showShoppingcart", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: this.data.user.user_id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        res.data.forEach(item => {
          item.checked = false;
        });
        console.log(res); //打印出返回的数据
        that.setData({
          shoppingcart: res.data
        },()=>{
          that.total()
        })
      }
    });
  },
  submitOrder(){
    let goodsList=[];
    this.data.shoppingcart.forEach(item => {
      if(item.checked){
        goodsList.push({
          oG_sum:item.sC_num,
          goodsBean:item.goodsBean,
          usersBean:item.usersBean,
          remarks:"",
          sC_id:item.sC_id
        })
      }
    });
    if(goodsList.length!=0){
      app.globalData.goodsList=goodsList;
      app.globalData.money=this.data.money;
      wx.navigateTo({ url: "/pages/purchaseGood/main"})
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.user = wx.getStorageSync('user');
    // console.log(this.data.user, this.data.user != "")
    if (this.data.user != "") {
      // console.log(111)
      this.setData({
        user: this.data.user
      })
      this.renderPage()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.user = wx.getStorageSync('user');
    // console.log(this.data.user,this.data.user != "")
    // if (this.data.user != "") {
    //   console.log(111)
    //   this.setData({
    //     user: this.data.user
    //   })
    //   // this.renderPage()
    // }
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