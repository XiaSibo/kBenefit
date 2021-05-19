// miniprogram/pages/admin/TagManage/AddKeys/AddKeys.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagKey:''
  },
  onTagKey: function onTagKey(e) {
    this.setData({
      tagKey:e.detail
    })
  },
  upKey: function upKey(e) {
    var that=this;
    var user = e.detail.value;
    console.log(this.data.tagKey);
    const db = wx.cloud.database();
    if(this.data.tagKey==''){
      wx.showToast({
        icon: "none",
        title: "标签键不能为空"
      });
    }
    else {
      db.collection("tag_class").where({
        name : this.data.tagKey
      }).get({
        success: function success(res) {
            if(res.data.length==0) {
              db.collection("tag_class").add({
                data: {
                  name:that.data.tagKey,
                },
                success: function success(res) {
                  wx.showToast({
                    title:"新增记录成功",
                    mask:true
                  }),
                  setTimeout(function() {
                    that.changeParentData();
                  }, 1000);
                },
                fail: function fail(err) {
                  wx.showToast({
                      icon: "none",
                      title: "新增记录失败"
                  });
                }
              })
            }
            else {
              wx.showToast({
                icon:"none",
                title:"标签键已存在"
              })
            }
        },
        fail: function fail(err) {
            wx.showToast({
                icon: "none",
                title: "查询记录失败"
            });
        }
      })
    }
  },
  changeParentData: function () {

    var pages =getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
      wx.navigateTo({
        url: '/pages/admin/TagManage/index/index',
      })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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