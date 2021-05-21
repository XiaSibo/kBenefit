Page({
  /**
 * 页面的初始数据
 */
  data: {
      active: 0,
      user: [],
      value:'',
      usercopy:[],
      floorstatus:false,
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onClick() {
    var _this = this;
    var db = wx.cloud.database();
    db.collection("user").where({
      stuid:_this.data.value
    }).get({
        success: function success(res) {
          if(_this.data.value==''){
            _this.setData({
              user:_this.data.usercopy
            })
          }
          else {
            if(res.data.length!=0) {
              console.log(res.data)
              _this.setData({
                user:res.data
              })
            }
            else {
              _this.setData({
                  user: []
              });
              wx.showToast({
                title:"未找到用户！",
              })
            }
          }
        },
        fail: function fail(err) {
            wx.showToast({
                icon: "none",
                title: "查询记录失败"
            });
        }
    });
  },
  onTabBarChange(event) {
    this.setData({
       active: event.detail 
      });
    if(this.data.active==1) {
      wx.redirectTo({
        url: '/pages/admin/TagManage/index/index',
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
    url: '/pages/admin/UserManage/modify/modify?id=' + e.currentTarget.dataset.id,
    })
},
onLoad: function onLoad(options) {
  var _this = this;
  var db = wx.cloud.database();
  db.collection("user").get({
      success: function success(res) {
          _this.setData({
              user: res.data,
              usercopy: res.data

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
onDel: function onDel(e) {
  var _this2 = this;
  var id = e.currentTarget.dataset.id;
  var db = wx.cloud.database();
  const _ = db.command;
  var allposts=[]
  var allresponses=[]
  var allinners=[]
  db.collection("user").doc(id).get().then(res => {
    allposts=res.data.posts,
    allposts.forEach(post=>{
      db.collection("post").doc(post).get().then(res=>{
        var post_responses = res.data.responses;
        post_responses.forEach(response => {
          db.collection("response").doc(response).get().then(res => {
            var response_sender = res.data.sender_id;
            db.collection("user").doc(response_sender).update({
              data:{
                responses: _.pull(response)
              }
            })
            var response_inners = res.data.inners;
            response_inners.forEach(inner => {
              db.collection("inner").doc(inner).get().then(res => {
                var inner_sender = res.data.sender_id;
                db.collection("user").doc(inner_sender).update({
                  data:{
                    inners: _.pull(inner)
                  }
                })
              })
              db.collection("inner").doc(inner).remove();
            })
          })
          db.collection("response").doc(response).remove();
        })
      })
      db.collection("post").doc(post).remove();
    })
    allresponses=res.data.responses;
    allresponses.forEach(response => {
      db.collection("response").doc(response).get().then(res => {
        var response_inners = res.data.inners;
        response_inners.forEach(inner => {
          db.collection("inner").doc(inner).get().then(res => {
            var inner_sender = res.data.sender_id;
            db.collection("user").doc(inner_sender).update({
              data:{
                inners: _.pull(inner)
              }
            })
          })
          db.collection("inner").doc(inner).remove();
        })
        var response_post_id = res.data.post_id;
        db.collection("post").doc(response_post_id).update({
          data:{
            responses: _.pull(response)
          }
        });
      });
      db.collection("response").doc(response).remove();
    })
    allinners=res.data.inners;
    allinners.forEach(inner => {
      db.collection("inner").doc(inner).get().then(res => {
        var inner_response_id = res.data.response_id;
        db.collection("response").doc(inner_response_id).update({
          data:{
            inners: _.pull(inner)
          }
        })
      });
      db.collection("inner").doc(inner).remove();
    })
  }).then(()=>{
    db.collection("user").doc(id).remove({
      success: function success(res){
        wx.showToast({
          title: '删除成功',
        })
        _this2.onLoad();
      },
      fail:function fail(err){
        wx.showToast({
          title: '删除失败',
        })
      }
    });
  })
},
  onUpdate: function onUpdate(e) {
    
  },
  changeData:function(){
    this.onLoad();
    }
});