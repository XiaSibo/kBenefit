// pages/index/index.js
Page({
  data: {
      active: 2,
      posts: [],
      value:'',
      who:[],
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
      wx.redirectTo({
        url: '/pages/admin/UserManage/index/index',
        })
    }
    if(this.data.active==1) {
      wx.redirectTo({
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
  var postsTemp = new Array();
  db.collection("post").get({
      success: function success(res) {
          for (var i = 0; i < res.data.length; i++) {
            _this.data.who.push(res.data[i].sender_id)
            var post = {title: '', s_id: ''}
            post['title'] = res.data[i].title
            post['s_id'] = []
            postsTemp.push(post)
            console.log(postsTemp)
          }
          db.collection("user").get({
            success: function success(res) {
              for (var i = 0; i < res.data.length; i++) {
                var yourid = res.data[i]._id
                for (var j = 0; j < _this.data.who.length; j++) {
                  if (yourid == _this.data.who[j]) {
                    postsTemp[j]['s_id'] = res.data[i].stuid
                    _this.setData({
                      posts:postsTemp,
                    })
                  }
                }
              }
              console.log(_this.data.posts)
            },
            fail: function fail(err) {
                wx.showToast({
                    icon: "none",
                    title: "查询记录失败"
                });
            }
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