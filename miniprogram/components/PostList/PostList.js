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
    rawpostList: [
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
        title: "1这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...这是标题这是标题这是标题再说一遍这是标题...",
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
        title: "2这是标题这是标题这是标题再说一遍这是标题...",
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
        title: "3这是标题这是标题这是标题再说一遍这是标题...",
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
        title: "4这是标题这是标题这是标题再说一遍这是标题...",
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
        title: "5这是标题这是标题这是标题再说一遍这是标题...",
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
        title: "6这是标题这是标题这是标题再说一遍这是标题...",
        text: "558这是正文这是正文这是正文再说一遍这是正文...",
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
        text: "831这是正文这是正文这是正文再说一遍这是正文...",
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
        text: "last这是正文这是正文这是正文再说一遍这是正文...",
        commentCnt: 10
      },
    ],
    postList: [],
    page: 1,
    pageSize: 5,
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false // 是否为空数据
  },

  lifetimes: {
    attached: function() {
      console.log(this.data.type)
      this.swipeRefresh = this.selectComponent('#refresh')
      this.swipeRefresh.setRefresh(true)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    show: function() {
      console.log("show")
    },
    hide: function() {
      console.log("hide")
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * 下拉刷新
      */
     refresh: function() {
      if (!this.data.isRequesting) {
        this.setData({
          page: 1,
          isRequesting: true,
          hasMore: true,
          isEmpty: false
        });
        if (this.data.hasMore)
          this.getData();
      }
      console.log("refresh")
    },
  
    /**
     * 上拉加载
     */
    loadMore: function() {
      if (this.data.hasMore && !this.data.isRequesting) {
        this.setData({
          page: this.data.page + 1,
          isRequesting: true
        });
        if (this.data.hasMore)
          this.getData();
      }
      console.log("loadMore")
    },
  
      /**
     * 获取数据
     */
    getData: function() {
      setTimeout(() => {
        if (this.data.page == 1) {
          this.setData({
            postList: [],
          })
        }
        // 请求数据库，传过去skip = this.data.postList.length, limit = pageSize
        /*
          TODO:
            task1: type == "home"
              1. 编写云函数，从数据库中获取真实信息（即当前用户应该接受的所有贴子）
              2. 同task2
              3. 同task2
            task2: type == "my"
              1. 编写云函数，从数据库中获取真实信息(即当前用户的所有贴子)
                -传入参数: skip: this.data.postList.length, limit = pageSize
                -返回对象数组:
                  --对象：
                    {
                      post_id,
                      avatarUrl,
                      fromTags: [{color, value}, ...],
                      toTags: [{color, value}, ...],
                      date,
                      title,
                      text,
                      commentCnt
                    }
              2. .then, 拿到append_data,接下来setData。
              3. 设置页面跳转（post_id）
        */
        var append_data = this.data.rawpostList.slice(this.data.postList.length, this.data.postList.length + this.data.pageSize)
        this.setData({
          postList: this.data.postList.concat(append_data),
          isRequesting: false,
          hasMore: append_data.length == this.data.pageSize  // hasMore根据数据库返回结果来看
        })
        this.swipeRefresh.setRefresh(false);
      }, 500);
    }
  },
})
