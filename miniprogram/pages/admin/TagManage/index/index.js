Page({
  /**
 * 页面的初始数据
 */
  data: {
      active: 1,
      value:'',
      tagKeys:[],
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
    if(this.data.active==2) {
      wx.redirectTo({
        url: '/pages/admin/PostManage/index/index',
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
onModify: function(e) {
  console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '/pages/admin/TagManage/ValueIndex/ValueIndex?id=' + e.currentTarget.dataset.id,
    })
},
onModifyKeys: function(e) {
  console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '/pages/admin/TagManage/ModifyKeys/ModifyKeys?id=' + e.currentTarget.dataset.id,
    })
},
onDel:function(e) {
  console.log(e.currentTarget.dataset.id)
  var _this2 = this;
    var id = e.currentTarget.dataset.id;
    var db = wx.cloud.database();
    const _ = db.command;
    db.collection("tag").where({
      class_id:id
    }).get().then((res)=>{
      var tags = res.data;
      console.log(tags)
      tags.forEach(tag => {
        var tag_id = tag._id
        console.log(tag_id)
        db.collection("user").get().then((res)=>{
          var users = res.data;
          users.forEach(user => {
            db.collection("user").doc(user._id).update({
              data:{
                tags: _.pull(tag_id)
              }
            })
          })
        }).then(()=>{
        db.collection("post").get().then((res)=>{
          var posts = res.data;
          posts.forEach(post => {
            db.collection("post").doc(post._id).update({
              data:{
                receiver_tags: _.pull(tag_id)
              }
            })
          })
        }).then(()=>{
        db.collection("tag").doc(tag_id).remove()
      })
      })
      })
    }).then(()=>{
      db.collection("tag_class").doc(id).remove({
        success: function (res) {
          wx.showToast({
            title: '删除成功',
          })
          _this2.onLoad();
        },
        fail: function(err) {
          wx.showToast({
            title: '删除失败',
          })
        }
      })
    })
  
},
onLoad: function onLoad(options) {
  var _this = this;
  var db = wx.cloud.database();
  db.collection("tag_class").get({
      success: function success(res) {
          _this.setData({
              tagKeys: res.data,
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
  changeData:function(){
    this.onLoad();
    }
});