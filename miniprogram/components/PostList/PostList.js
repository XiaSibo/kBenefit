// components/PostList/PostList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      type: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    postList: [
      {
        avatarUrl: ""
      },
    ]
  },

  lifetimes: {
    attached: function() {
      console.log(this.data.type)
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
