const db = wx.cloud.database()
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false,
        isLoad: false
    },

    onLoad: function () {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getOpenid',
            // 传给云函数的参数
            data: {
            },
            success: function(res) {
            //   console.log(res.result.openid)
              app.globalData.openid = (res.result.openid);
            },
            fail: console.error
          })
        this.setData({
            isLoad: true
        })
    },

    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取用户信息
            // console.log("用户的信息如下：");
            // console.log(e.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
            // console.log(app.globalData.openid)
            //从数据库中查找对应_openid的用户是否存在
            db.collection('user').where({
                _openid: app.globalData.openid
            }).get({
                success: function (res) {
                    // console.log(res.data)
                    //如果数据库中存在openid对应用户,保存用户信息并跳转到homepage
                    if (res.data.length != 0) {
                        app.globalData.user = res.data
                        wx.switchTab({
                            url: '/pages/home/home',
                        })
                    }
                    //如果不存在该openid对应用户，则跳转到登录页面检验身份
                    else {
                        wx.showToast({
                            title: '账号未绑定',
                            icon: 'error',
                            duration: 2000
                        })
                        wx.navigateTo({
                            url: '/pages/login/login',
                        })
                    }
                }
            })
        } else {
            //未获取到用户信息
            wx.showModal({
                title: '警告',
                content: '未获得授权，请检查网络条件并重试',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    },

    toLogin: function () {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    }
})