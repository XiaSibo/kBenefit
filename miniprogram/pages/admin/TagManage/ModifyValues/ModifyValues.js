// miniprogram/pages/admin/TagManage/ModifyValues/ModifyValues.js
let valueName=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagColor:'rgb(0,154,97)',
    rgbColor:'',
    tagValue:'',
    tagClassid:'',
    tag_id:'',
    pick: false
   },
  rgb2hex(sRGB) {
    let re = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
        ret = sRGB.match(re),
        head = "#";
    if(!ret) return sRGB;
    else {
        //match匹配的数组第一项为自身
        for(let i = 1; i < ret.length; i++) {
            //将字符串转化为数字
            let x = parseInt(ret[i]);
            if(x >= 0 && x <= 255) {
                //将0-255之间的数字变为16进制
                //小于16的首位补个0
                head += x < 16 ? '0' + x.toString(16) : x.toString(16);
                //否则返回sRGB
            } else return sRGB;
        }
    }
    return head
},
  HexToRgb ( sColor ) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#'
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor
                    .slice(i, i + 1)
                    .concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        //处理六位的颜色值
        var sColorChange = []
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgb(' + sColorChange.join(',') + ')'
    } else {
        return sColor
    }
},
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    console.log(e.detail.color)
    this.setData({
      rgbColor : e.detail.color,
      tagColor : this.rgb2hex(e.detail.color)
    })
  },
  
  onTagValue: function onTagValue(e) {
    this.setData({
      tagValue:e.detail
    })
  },

  modifyValue: function upValue(e) {
    var that = this;
    const db = wx.cloud.database();
    if(this.data.tagValue=='') {
      wx.showToast({
        icon: "none",
        title: "标签键不能为空"
      });
    }
    else{
      console.log(this.data.tagClassid)
      console.log(this.data.tagColor)
      console.log(this.data.rgbColor)
      console.log(this.data.tagValue)
      db.collection("tag").where({
        value : this.data.tagValue
      }).get({
        success: function success(res) {
            if(res.data.length==0||that.data.tagValue==valueName) {
              db.collection("tag").doc(that.data.tag_id).update({
                data: {
                  color:that.data.tagColor,
                  value:that.data.tagValue,
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
                title:"标签值已存在"
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
        url: '/pages/admin/TagManage/ValueIndex/ValueIndex?id=' + this.data.tagClassid,
      })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    const db = wx.cloud.database();
    db.collection("tag").where({
      _id:this.options.id
    }).get({
      success: function success(res){
        console.log(res.data[0])
        valueName=res.data[0].value
        that.setData({
          tagColor:that.HexToRgb(res.data[0].color),
          tagClassid:res.data[0].class_id,
          tagValue:res.data[0].value,
          tag_id:res.data[0]._id
        })
        console.log(that.data.tagColor)
      },
      fail: function fail(err) {
        wx.showToast({
            icon: "none",
            title: "查询记录失败"
        });
    }
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

  }
})