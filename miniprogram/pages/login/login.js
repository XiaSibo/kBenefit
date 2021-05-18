const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    password: "",
    administrator_password: ""
  },

  user_login: function () {
    var that = this;
    db.collection("user").where({
      stuid: this.data.id,
      password: this.data.password
    }).get({
      success: function (res) {
        console.log(res.data)
        if (res.data.length != 0) {
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000
          })
          app.globalData.user = res.data;
          db.collection("user").doc(app.globalData.user[0]._id).update({
            data: {
              _openid: app.globalData.openid
            },
            success: function (res) {
              console.log(res.data)
            }
          })
          wx.navigateTo({
            url: '/pages/homepage/homepage',
          })
        } else {
          wx.showToast({
            title: '学号密码不匹配',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  administrator_login: function () {
    db.collection("administrator").where({
      password: this.data.administrator_password
    }).get({
      success: function (res) {
        if (res.data.length != 0) {
          app.globalData.isAdministrator = true;
          wx.navigateTo({
            url: '/pages/admin/UserManage/index/index',
          })
        } else {
          wx.showToast({
            title: '管理员秘钥错误',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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