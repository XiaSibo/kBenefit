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
    list: [],  // object: {content, title, post_id}
    page: 1,
    pageSize: 10,
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false // 是否为空数据
  },

  lifetimes: {
    attached: function() {
      this.swipeRefresh = this.selectComponent('#refresh')
      this.swipeRefresh.setRefresh(true)
      this.getData();
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
          // 请求数据库，传过去skip = (page - 1) * pageSize, limit = pageSize
          // 得到返回值以后直接赋值给list
          this.setData({
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            isRequesting: false,
            hasMore: this.data.list.length < 15  // hasMore根据数据库返回结果来看
          })
        } else {
          // 否则，需要增加一页数据，skip = (page - 1) * pageSize, limit = pageSize
          // 得到返回值以后concat在this.data.list后面
          this.setData({
            list: this.data.list.concat(this.data.list.length + 1),
            isRequesting: false,
            hasMore: this.data.list.length < 15  // hasMore根据数据库返回结果来看
          })
        }
        this.swipeRefresh.setRefresh(false);
      }, 3000);
    }
  },
})
