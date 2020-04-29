// pages/goods/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    good_cassify: ["", "爱宠主食", "爱宠零食", "日常用品", "爱宠玩具"],
    imgUrls: [{
        url: "http://192.168.43.250:3000/pageImgs/16pic_5746914_b.jpg"
      },
      {
        url: "http://img0.imgtn.bdimg.com/it/u=850258754,3657308384&fm=26&gp=0.jpg"
      },
      {
        url: "http://img1.imgtn.bdimg.com/it/u=2056056316,3209876696&fm=214&gp=0.jpg"
      },
      {
        url: "http://img5.imgtn.bdimg.com/it/u=3088917848,2132819455&fm=26&gp=0.jpg"
      },
      {
        url: "http://img5.imgtn.bdimg.com/it/u=1496909054,2434737735&fm=26&gp=0.jpg"
      }
    ],
    goodsList: [],
    currentPage: 1,
    pageSize: 6,
    baseline: false
  },
  sidebarChange(e) {
    console.log(e, this.data.good_cassify[e.detail])
    if (e.detail != this.data.activeKey) {
      this.setData({
        activeKey: e.detail,
        goodsList: [],
        currentPage: 1,
        pageSize: 6,
      },()=>{
        this.render();
      })
    }
  },
  goodDetail(e) {
    wx.navigateTo({
      url: "/pages/goodDetails/main?id=" + e.currentTarget.dataset['id']
    });
  },

  render() {
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/showGoods", //给函数传递服务器地址参数
      method: "post",
      data: {
        good_cassify: this.data.good_cassify[this.data.activeKey],
        bus_id: "0",
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
        if (res.data.datas.length != 0) {
          if (res.data.datas.length != that.data.pageSize) {
            that.setData({
              baseline: !that.data.baseline
            })
          }
          that.data.goodsList.push(...res.data.datas)
          that.setData({
            goodsList: that.data.goodsList
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
    // if (app.globalData.goodActiveKey) {
    //   this.setData({
    //     activeKey: app.globalData.goodActiveKey
    //   })
    //   app.globalData.goodActiveKey = 0
    // }
    this.render();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.globalData.goodActiveKey)
    if (app.globalData.goodActiveKey) {
      this.setData({
        activeKey: app.globalData.goodActiveKey,
        goodsList: [],
        currentPage: 1,
        baseline: false
      },()=>{
        this.render();
      })
      app.globalData.goodActiveKey = 0;
      // this.render();
    }
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
      this.render();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})