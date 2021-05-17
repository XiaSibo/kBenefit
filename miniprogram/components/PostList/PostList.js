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
          {
            color: "green",
            value: "八"
          },
          {
            color: "blue",
            value: "八校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "blue",
            value: "八000校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...这是正文这是正文这是正文再说一遍这是正文...这是正文这是正文这是正文再说一遍这是正文...这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10000
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 1
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
      {
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        fromTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        toTags: [
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
          {
            color: "red",
            value: "八里台校区"
          },
        ],
        date: "2021/05/01",
        title: "这是标题这是标题这是标题再说一遍这是标题...",
        text: "这是正文这是正文这是正文再说一遍这是正文...",
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
