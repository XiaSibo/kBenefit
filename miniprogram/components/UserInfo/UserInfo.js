// components/UserInfo/UserInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: [],
    userInfo: {}
  },

  lifetimes: {
    attached: function() {
      const DB = wx.cloud.database()
      const _ = DB.command

      DB.collection('user')
      .doc('28ee4e3e609fdbf21901b0022ee68f8d')
      .get({
        success: res => {
          console.log(res.data)
          this.setData({
            userInfo: res.data
          })
          console.log(this.data.userInfo.tags[0])
          DB.collection('tag')
          .doc(this.data.userInfo.tags[0])
          .get({
            success: res => {
              console.log(res)
            }
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
