const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false
    },

    onLoad: function () {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            // 在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                            wx.login({
                                success: res => {
                                    console.log("用户的code:" + res.code);
                                    wx.request({
                                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc600d77995af3766&secret=0844aaa7969311c55bb28ad39eb3e056&js_code=' + res.code + '&grant_type=authorization_code',
                                        success: res => {
                                            // 获取到用户的 openid
                                            console.log("用户的openid:" + res.data.openid);
                                            db.collection('user').where({
                                                _openid: res.code
                                            }).get({
                                                success: function (res) {
                                                    console.log(res.data)
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    that.setData({
                        isHide: true
                    });
                }
            }
        });
    },

    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：");
            console.log(e.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
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
    }
})