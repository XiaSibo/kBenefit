// pages/index/index.js
Page({
  data: {
      active: 2,
      post: [],
      value:'',
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onClick() {
    
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
    if(this.data.active==1) {
      wx.navigateTo({
        url: '/pages/admin/TagManage/index/index',
        })
    }
  },
  /**
 * 生命周期函数--监听页面加载
 */
onPageScroll: function (e) {
  if (e.scrollTop > 100) {
    this.setData({
      floorstatus: true
    });
  } else {
    this.setData({
      floorstatus: false
    });
  }
},

//回到顶部
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

onLoad: function onLoad(options) {
  var _this = this;
  var db = wx.cloud.database();
  db.collection("post").get({
      success: function success(res) {
          _this.setData({
              post: res.data,
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
  onUpdate: function onUpdate(e) {
    
  },
});