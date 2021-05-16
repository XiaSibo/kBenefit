var app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    userInfo: {},
    info: "",
    isHidden: true
  },

  change_avatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      // 指定是原图还是压缩图，默认两个都有      
      sourceType: ['album', 'camera'],
      // 指定来源是相册还是相机，默认两个都有    
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.data.userInfo.avatarUrl = tempFilePaths[0];
        console.log(that.data.userInfo.avatarUrl);
      }
    })
  },

  change_info: function () {
    this.setData({
      isHidden: false
    })
  },

  change_info_confirm: function () {
    this.data.userInfo.info = this.data.info;
    this.setData({
      userInfo: this.data.userInfo,
      isHidden: true
    })
    db.collection('user').doc(this.data.userInfo._id).update({
      data: {
        info: this.data.userInfo.info
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const DB = wx.cloud.database()
    const _ = DB.command

    DB.collection('user')
      .doc(app.globalData.user[0]._id) // 获得user 的 _id 进行更换
      .get({
        success: res => {
          this.setData({
            userInfo: res.data
          })

          DB.collection('tag')
            .where({
              _id: _.in(this.data.userInfo.tags)
            })
            .get({
              success: res => {
                this.setData({
                  tags: res.data
                })
              }
            })
        }
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