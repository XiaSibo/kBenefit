// components/ResponseList/ResponseList.js
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
    rawList: [
      {
        content: '回复111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        title: '帖子1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      },
      {
        content: '回复2',
        title: '帖子2',
      },
      {
        content: '回复3',
        title: '帖子3',
      },
      {
        content: '回复4',
        title: '帖子4',
      },
      {
        content: '回复5',
        title: '帖子5',
      },
      {
        content: '回复6',
        title: '帖子6',
      },
      {
        content: '回复7',
        title: '帖子7',
      },
      {
        content: '回复7',
        title: '帖子7',
      },
      {
        content: '回复8',
        title: '帖子8',
      },
      {
        content: '回复9',
        title: '帖子9',
      },
      {
        content: '回复10',
        title: '帖子10',
      },
    ],
    list: [],  // object: {content, title, post_id}
    page: 1,
    pageSize: 6,
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false // 是否为空数据
  },

  lifetimes: {
    attached: function() {
      this.swipeRefresh = this.selectComponent('#refresh')
      this.swipeRefresh.setRefresh(true)
    }
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
            list: [],
          })
        }
        // skip: this.data.list.length, limit: pageSize
        /* 
          TODO:
            1. 编写云函数，取得数据库中的真实数据
                -传入参数: skip: this.data.list.length, limit: pageSize
                -返回对象数组: [{post_id, content, title}, ...]
                  --post_id: 用于点击时进入对应的页面
                  --content: 回复内容
                  --title: 标题
            2. .then, 拿到append_data,接下来setData。
            3. 设置页面跳转（post_id）
        */
        var append_data = this.data.rawList.slice(this.data.list.length, this.data.list.length + this.data.pageSize)
        this.setData({
          list: this.data.list.concat(append_data),
          isRequesting: false,
          hasMore: append_data.length == this.data.pageSize
        })
        this.swipeRefresh.setRefresh(false)
      }, 500);
      console.log("getdata ing...")
    }
  },
})
