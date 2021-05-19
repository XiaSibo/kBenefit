// miniprogram/pages/admin/UserManage/add/add.js
Page({
  data: {
    value: '',
    show: false,
    usersex: '',
    who: [],
    actions: [
      {
        name: '男',
      },
      {
        name: '女',
      },
    ],
    mainActiveIndex: 0,
    activeId: [],
    max: 100,
    items: [],
    userid:'',
    username:'',
    password:'',
    userinfo:'',
    avatarUrl:'',
    db_id:'',
  },
  alertMenu() {
    this.setData({show :true});
  },
  onCancel() {
    this.setData({ show: false });
  },

  onSelect(event) {
    this.setData({ show: false });
    this.setData({ usersex: event.detail.name });
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const { activeId } = this.data;

    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }

    this.setData({ activeId });
  },
  onUserId: function onUserId(e) {
    this.setData({
      userid:e.detail
    })
  },
  onUserName: function onUserName(e) {
    this.setData({
      username:e.detail
    })
  },
  onUserSex: function onUserSex(e) {
    this.setData({
      usersex:e.detail
    })
  },
  onPassword: function onPassword(e) {
    this.setData({
      password:e.detail
    })
  },
  onUserInfo: function onUserInfo(e) {
    this.setData({
      userinfo:e.detail
    })
  },
  refreshAva:function refreshAva(e) {
    this.setData({
      avatarUrl:''
    })
  },
  modifyUser: function modifyUser(e) {
    var that=this;
    console.log(this.data.userid);
    console.log(this.data.username);
    console.log(this.data.usersex);
    console.log(this.data.password);
    console.log(this.data.userinfo);
    console.log(this.data.activeId);
    console.log(this.data.db_id);
    const db = wx.cloud.database();
    db.collection("user").doc(this.data.db_id).update({
      data: {
        avatarUrl:that.data.avatarUrl,
        gender:that.data.usersex,
        info:that.data.userinfo,
        name:that.data.username,
        password:that.data.password,
        stuid:that.data.userid,
        tags:that.data.activeId
      },
      success: function success(res) {
        wx.showToast({
          title:"修改记录成功",
        }),
        that.changeParentData();
      },
      fail: function fail(err) {
        wx.showToast({
            icon: "none",
            title: "修改记录失败"
        });
      }
    })
  },
  changeParentData: function () {

    var pages =getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
      }
    },
    
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    var db = wx.cloud.database();
    var itemsTemp = new Array();
    db.collection("tag_class").get({
        success: function success(res) {
          for (var i = 0; i < res.data.length; i++) {
            _this.data.who.push(res.data[i]._id)
            var item = {text: '', children: []}
            item['text'] = res.data[i].name
            item['children'] = []
            itemsTemp.push(item)
          }
          db.collection("tag").get({
            success: function success(res) {
              for (var i = 0; i < res.data.length; i++) {
                var yourid = res.data[i].class_id
                for (var j = 0; j < _this.data.who.length; j++) {
                  if (yourid == _this.data.who[j]) {
                    console.log('baka')
                    var temp = {text: '', id: ''}
                    temp['text'] = res.data[i].value
                    temp['id'] = res.data[i]._id
                    itemsTemp[j]['children'].push(temp)
                    _this.setData({
                      items:itemsTemp,
                    })
                  }
                }
              }
              console.log(_this.data.items)
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
    db.collection("user").where({
      stuid: _this.options.id
    }).get({
      success: function success(res) {
          console.log(res.data[0])
          _this.setData({
              db_id: res.data[0]._id,
              avatarUrl: res.data[0].avatarUrl,
              userid: res.data[0].stuid,
              username: res.data[0].name,
              usersex: res.data[0].gender,
              password: res.data[0].password,
              userinfo: res.data[0].info,
              activeId: res.data[0].tags
          });
          console.log(_this.data.userid);
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