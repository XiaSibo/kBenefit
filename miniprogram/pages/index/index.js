const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:[]
  },
  getData: function() {
    db.collection('testdata').where({
      married: false
    }).get({
      success: res=>{
        var n = 0
        var temp = []
        res.data.forEach(element => {
          console.log(element)
          var born_date = new Date(element.born_time)
          temp[n] = {
            name: element.name,
            sex: element.sex,
            born_time: born_date.getFullYear() + " - " + born_date.getMonth() + " - " + born_date.getDay(),
            married: element.married
          }
          n++
        });
        this.setData({
          dataObj: temp
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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