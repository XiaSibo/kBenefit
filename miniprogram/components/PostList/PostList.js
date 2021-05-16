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
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          
        ],
        toTags: [

        ],
        date: "",
        title: "这是标题",
        text: "这是正文",
        commentCnt: 10
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
