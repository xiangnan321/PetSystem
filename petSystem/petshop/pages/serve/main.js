// pages/serve/main.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    ser_cassify: ["", "宠物寄养", "宠物美容", "宠物医疗", "宠物摄影"],
    imgUrls: [{
        url: "http://img4.99114.com/group10/M00/A7/E0/rBADs1orhhmAPqxAAABlXSfhUCA259.jpg"
      },
      {
        url: "http://a2.att.hudong.com/36/70/19300001100337129474701640257_950.jpg"
      },
      {
        url: "http://img5.imgtn.bdimg.com/it/u=2862778242,2187373359&fm=26&gp=0.jpg"
      },
      {
        url: "http://img0.imgtn.bdimg.com/it/u=2722884350,2149244300&fm=26&gp=0.jpg"
      }, {
        url: "http://img0.imgtn.bdimg.com/it/u=2460681147,4014013393&fm=26&gp=0.jpg"
      }
    ],
    serveImage: {
      "宠物寄养": "http://192.168.43.250:3000/images/20180914043907578.jpg",
      "宠物美容": "http://192.168.43.250:3000/images/cosmetology.jpg",
      "宠物医疗":"http://192.168.43.250:3000/images/download.jpg",
      "宠物摄影":"http://192.168.43.250:3000/images/u=1919703332,2573013977&fm=26&gp=0.png"
    },
    serveList: [],
    currentPage: 1,
    pageSize: 6,
    baseline: false
  },
  goodDetail(e){
    let obj={
      serveBean:this.data.serveList[e.currentTarget.dataset['id']],
      img:this.data.serveImage[e.currentTarget.dataset['img']]
    }
    app.globalData.serveObj=obj;
    wx.navigateTo({
      url: "/pages/serveDetails/main"
    });
  },
  sidebarChange(e) {
    console.log(e)
    if (e.detail != this.data.activeKey) {
      this.setData({
        activeKey: e.detail,
        serveList: [],
        currentPage: 1,
        pageSize: 6,
        baseline: false
      },()=>{
        this.render();
      })
    }
  },

  render() {
    // console.log(this.data.ser_cassify[this.data.activeKey])
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/showService", //给函数传递服务器地址参数
      method: "post",
      data: {
        ser_classify: this.data.ser_cassify[this.data.activeKey],
        bus_id: "0",
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res); //打印出返回的数据
        if (res.data.datas.length != 0) {
          if (res.data.datas.length != that.data.pageSize) {
            that.setData({
              baseline: !that.data.baseline
            })
          }
          that.data.serveList.push(...res.data.datas)
          that.setData({
            serveList: that.data.serveList
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
    // if (app.globalData.serveActiveKey) {
    //   this.setData({
    //     activeKey: app.globalData.serveActiveKey
    //   })
    //   app.globalData.serveActiveKey = 0
    // }
    this.render();

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.serveActiveKey) {
      this.setData({
        activeKey: app.globalData.serveActiveKey,
        serveList: [],
        currentPage: 1,
        baseline: false
      },()=>{
        this.render();
      })
      app.globalData.serveActiveKey = 0
    }
    // this.render();
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