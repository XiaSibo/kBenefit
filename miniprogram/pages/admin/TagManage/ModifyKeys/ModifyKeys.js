// miniprogram/pages/admin/TagManage/ModifyKeys/ModifyKeys.js
let keyName=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagKey: '',
    tag_class_id: '',
  },

  onTagKey: function onTagKey(e) {
    this.setData({
      tagKey:e.detail
    })
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

  modifyKey: function modifyKey(e) {
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
          if(res.data.length==0||that.data.tagKey==keyName) {
            db.collection("tag_class").doc(that.data.tag_class_id).update({
              data: {
                name:that.data.tagKey,
              },
              success: function success(res) {
                wx.showToast({
                  title:"修改记录成功",
                  mask:true
                }),
                setTimeout(function() {
                  that.changeParentData();
                }, 1000);
              },
              fail: function fail(err) {
                wx.showToast({
                    icon: "none",
                    title: "修改记录失败"
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

  onLoad: function (options) {
    console.log(options)
    var _this = this;
    var db = wx.cloud.database();
    db.collection("tag_class").where({
      _id: _this.options.id
    }).get({
      success: function success(res) {
          console.log(res.data[0])
          keyName=res.data[0].name
          _this.setData({
              tagKey: res.data[0].name,
              tag_class_id: res.data[0]._id
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