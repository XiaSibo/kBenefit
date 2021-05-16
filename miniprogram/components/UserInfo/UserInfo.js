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
      .doc('28ee4e3e609fdbf21901b0022ee68f8d')  // 获得user 的 _id 进行更换
      .get({
        success: res => {
          this.setData({
            userInfo: res.data
          })
          
          DB.collection('tag')
          .where({
            _id: _.in(this.data.userInfo.tags)
          })
          .get({
            success: res => {
              this.setData({
                tags: res.data
              })
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