// pages/index/main.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
        url: "http://img.51miz.com/preview/muban/00/00/43/97/M-439790-93C974B9.jpg"
      },
      {
        url: "http://img.51miz.com/preview/muban/00/00/29/49/M-294977-9FD03878.jpg"
      },
      {
        url: "http://img.51miz.com/Templet/00/23/56/79/235679_a0992ca4449b53097c86c06dd77f60c7.jpg-1.jpg"
      },
      {
        url: "http://img.51miz.com/preview/muban/00/00/29/48/M-294814-678E3F1A.jpg"
      }
    ],
    functionBar: [{
      name: "爱宠主食",
      src: "../../assets/image/zhushi.png"
    }, {
      name: "爱宠零食",
      src: "../../assets/image/lingshi.png"
    }, {
      name: "日常用品",
      src: "../../assets/image/yongpin.png"
    }, {
      name: "爱宠玩具",
      src: "../../assets/image/wanju.png"
    }, {
      name: "宠物寄养",
      src: "../../assets/image/jiyang.png"
    }, {
      name: "宠物美容",
      src: "../../assets/image/meirong.png"
    }, {
      name: "宠物医疗",
      src: "../../assets/image/yiliao.png"
    }, {
      name: "宠物摄影",
      src: "../../assets/image/sheying.png"
    }],
    cheapGoods: [],
    goodsList: [],
    currentPage: 1,
    pageSize: 6,
    baseline: false
  },

  jumpById(e) {
    console.log(e,e.currentTarget.dataset['name'],e.currentTarget.dataset['id'])
    // console.log(app.globalData.goodActiveKey)
    if(e.currentTarget.dataset['id']<5){
      app.globalData.goodActiveKey=e.currentTarget.dataset['id'];
      wx.switchTab({
        url: "/pages/goods/main"
      });
    }else{
      app.globalData.serveActiveKey=e.currentTarget.dataset['id']-4;
      wx.switchTab({
        url: "/pages/serve/main"
      });
    }
  },
  getGoodsList() {
    let that = this; //获取到全局变量 192.168.43.250
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/showGoods", //给函数传递服务器地址参数
      method: "post",
      data: {
        good_cassify: "",
        bus_id: "0",
        currentPage: that.data.currentPage,
        pageSize: that.data.pageSize
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
        if (res.data.datas.length != 0) {
          that.data.goodsList.push(...res.data.datas);
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
  getCheapGoods() {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/busBody/showGoods", //给函数传递服务器地址参数
      method: "post",
      data: {
        good_cassify: "",
        bus_id: "0",
        currentPage: 1,
        pageSize: 4,
        baseline: false
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        // console.log(res); //打印出返回的数据
        that.data.cheapGoods.push(...res.data.datas);
        that.setData({
          cheapGoods: that.data.cheapGoods
        })
      }
    });
  },
  goodDetail(e){
    wx.navigateTo({ url: "/pages/goodDetails/main?id=" + e.currentTarget.dataset['id'] });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheapGoods();
    this.getGoodsList();
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res);
              // that.userLogin(res.userInfo);
              wx.request({
                url: "http://192.168.43.250:9999/petSystemServer/users/getUsersBean", //给函数传递服务器地址参数
                method: "post",
                data: {
                  user_name: res.userInfo.nickName,
                  user_username: "",
                  user_gender: res.userInfo.gender == 1 ? "男" : "女",
                  user_phone: "",
                  user_image: res.userInfo.avatarUrl
                }, //给服务器传递数据
                header: {
                  "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
                },
                success: function (res) {
                  if (res.data != null) {
                    wx.setStorageSync("user", res.data);
                    that.setData({
                      user: res.data
                    })
                  }
                }
              });
            }
          });
        }
      }
    });
  },
  onReachBottom() {
    this.data.currentPage++
    this.setData({
      currentPage: this.data.currentPage
    })
    if (!this.data.baseline) {
      this.getGoodsList();
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
  onPullDownRefresh: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})