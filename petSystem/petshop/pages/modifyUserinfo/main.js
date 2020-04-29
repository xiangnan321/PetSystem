// pages/modifyUserinfo/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: 0,
    user_name: "",
    user_username: "",
    user_gender: "1",
    user_phone: "",
    user_image: "",
    user_address: null,
    fileList: [],
    nameMessage: ""
  },

  genderChange(e) {
    this.setData({
      user_gender: e.detail
    });
  },

  user_usernameChange(e) {
    this.setData({
      user_username: e.detail
    })
  },

  user_phoneChange(event) {
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
      user_phone: event.detail
    });
  },
  // 图片上传
  afterRead(event) {
    let that = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://192.168.43.250:3000/uploadFile', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // console.log(res, res.data, JSON.parse(res.data))
        // 上传完成需要更新 fileList
        // const {
        //   fileList = []
        // } = this.data;
        // let fileList=that.data.fileList
        // fileList.push({
        //   ...file,
        //   url: res.data
        // });
        that.setData({
          // fileList,
          user_image: "http://192.168.43.250:3000/images/" + JSON.parse(res.data).saveName
        });
      }
    });
  },
  //图片点击事件
  enlarge(event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 修改按钮
  modifyBtn() {
    let that = this;
    wx.request({
      url: "http://192.168.43.250:9999/petSystemServer/users/modifyUsersBean", //给函数传递服务器地址参数
      method: "post",
      data: {
        user_id: that.data.user_id,
        user_name: that.data.user_name,
        user_username: that.data.user_username,
        user_gender: that.data.user_gender == 1 ? "男" : "女",
        user_phone: that.data.user_phone,
        user_image: that.data.user_image
      }, //给服务器传递数据
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值，返回的数据设置为json数组格式
      },
      success: function (res) {
        if (res.data != 0) {
          wx.showToast({
            title: '修改成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
          let user = {
            user_id: that.data.user_id,
            user_name: that.data.user_name,
            user_username: that.data.user_username,
            user_gender: that.data.user_gender == 1 ? "男" : "女",
            user_phone: that.data.user_phone,
            user_image: that.data.user_image
          }
          wx.setStorageSync("user", user);
          wx.switchTab({
            url: "/pages/wode/main"
          });
        }
      }
    });
  },
  // 取消按钮
  cancel() {
    wx.switchTab({
      url: "/pages/wode/main"
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    console.log(user),
      this.setData({
        user_id: user.user_id,
        user_name: user.user_name,
        user_username: user.user_username,
        user_gender: user.user_gender == "男" ? "1" : "2",
        user_phone: user.user_phone,
        user_image: user.user_image,
        nameMessage: ''
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