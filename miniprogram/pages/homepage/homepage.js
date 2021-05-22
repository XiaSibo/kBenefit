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
    isHidden: true,
    isSelf: true
  },

  change_avatar: function () {
    var that = this;
    var cloudPath;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      // 指定是原图还是压缩图，默认两个都有      
      sourceType: ['album', 'camera'],
      // 指定来源是相册还是相机，默认两个都有    
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: Date.now() + '.png', // 上传至云端的路径
          filePath: tempFilePaths, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            // console.log(res.fileID)
            cloudPath = res.fileID
            that.data.userInfo.avatarUrl = cloudPath;
            that.setData({
              userInfo: that.data.userInfo
            })
            db.collection("user").doc(app.globalData.user[0]._id).update({
              data: {
                avatarUrl: that.data.userInfo.avatarUrl
              },
              success: function (res) {
                // console.log(res.data)
              }
            })
          },
          fail: console.error
        })
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
      success: function (res) {
        // console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // console.log(app.globalData.user[0]._id)
    if(app.globalData.user[0]._id == options.id) {
      this.setData({
        isSelf: false
      })
    }
    else {
      this.setData({
        isSelf: true
      })
    }
    const DB = wx.cloud.database()
    const _ = DB.command

    DB.collection('user')
      .doc(options.id) // 获得user 的 _id 进行更换
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