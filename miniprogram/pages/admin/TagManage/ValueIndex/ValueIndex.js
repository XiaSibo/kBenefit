// miniprogram/pages/admin/TagManage/ValueIndex/ValueIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    tagValues:[],
    tag_class_id:''
  },
  onTabBarChange(event) {
    this.setData({
       active: event.detail 
      });
    if(this.data.active==0) {
      wx.navigateTo({
        url: '/pages/admin/UserManage/index/index',
        })
    }
    if(this.data.active==2) {
      wx.navigateTo({
        url: '/pages/admin/PostManage/index/index',
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    var db = wx.cloud.database();
    var itemsTemp = new Array();
    db.collection("tag").where({
      class_id: _this.options.id
    }).get({
      success: function success(res) {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            var item = {tag_id: '', color: '', value: ''}
            item['tag_id'] = res.data[i]._id
            item['color'] = res.data[i].color
            item['value'] = res.data[i].value
            itemsTemp.push(item)
          }
          _this.setData({
              tagValues: itemsTemp,
              tag_class_id: _this.options.id
          });
      },
      fail: function fail(err) {
          wx.showToast({
              icon: "none",
              title: "查询记录失败"
          });
      }
  });
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  goAdd: function (e) {
    wx.navigateTo({
      url: '/pages/admin/TagManage/AddValues/AddValues?id=' + this.data.tag_class_id,
    })
  },
  onModify: function(e) {
    wx.navigateTo({
      url: '/pages/admin/TagManage/ModifyValues/ModifyValues?id=' + e.currentTarget.dataset.id,
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

  
  },
  changeData:function(){
    this.onLoad();
    }
})