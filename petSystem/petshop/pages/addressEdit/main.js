// pages/addressEdit/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_id: 0,
    add_phone: "",
    add_address: "",
    add_name: "",
    addDefault: false,
    nameMessage: "",
    editType: null,
    user: null
  },
  add_phoneChange(event) {
    const phone = event.detail || event;
    let message = '';
    if (phone) {
      if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        message = '';
      } else {
        message = '您输入的手机号码有误';
      }
    } else {
      message = '输入的手机号不能为空';
    }
    this.setData({
      nameMessage: message,
      add_phone: event.detail
    });
  },
  add_addressChange(e) {
    // console.log(e.detail);
    this.setData({
      add_address: e.detail
    })
  },
  add_nameChange(e) {
    // console.log(e.detail);
    this.setData({
      add_name: e.detail
    })
  },
  addDefaultChange() {
    this.setData({
      addDefault: !this.data.addDefault
    })
  },
  editAddress(e) {
    // console.log(e.currentTarget.dataset['type'], this.data.add_phone, this.data.add_address, this.data.add_name);
    if (e.currentTarget.dataset['type'] == "del") {
      let that = this; //获取到全局变量
      wx.request({
        url: "http://192.168.43.250:9999/petSystemServer/users/delAddress", //给函数传递服务器地址参数
        method: "post",
        data: {
          add_id: this.data.add_id
        }, //给服务器传递数据
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
        },
        success: function (res) {
          // console.log(res)
          if (res.data > 0) {
            wx.showToast({
              title:"删除成功！",
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              url: "/pages/address/main"
            });
          }
        }
      });
    } else {
      let that = this; //获取到全局变量
      wx.request({
        url: "http://192.168.43.250:9999/petSystemServer/users/addAddress", //给函数传递服务器地址参数
        method: "post",
        data: {
          user_id: this.data.user.user_id,
          add_id: this.data.add_id,
          add_phone: this.data.add_phone,
          add_address: this.data.add_address,
          add_name: this.data.add_name,
          addDefault: this.data.addDefault ? 1 : 0,
          type: e.currentTarget.dataset['type']
        }, //给服务器传递数据
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
        },
        success: function (res) {
          // console.log(res)
          if (res.data > 0) {
            wx.showToast({
              title: e.currentTarget.dataset['type']=="add"?'添加成功！':"修改成功！",
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              url: "/pages/address/main"
            });
          }
        }
      });
    }
  },
  render(id) {
    let that = this; //获取到全局变量
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/getAddressById", //给函数传递服务器地址参数
      method: "post",
      data: {
        add_id: id
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        console.log(res)
        that.setData({
          add_id: res.data.add_id,
          add_phone: res.data.add_phone,
          add_address: res.data.add_address,
          add_name: res.data.add_name,
          addDefault: res.data.usersBean.user_address == res.data.add_id,
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options) 
    this.data.user = wx.getStorageSync('user');
    this.setData({
      user: this.data.user,
      editType: options.type
    })
    if (options.type == "edit") {
      this.render(options.id);
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