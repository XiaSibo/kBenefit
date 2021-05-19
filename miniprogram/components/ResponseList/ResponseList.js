// components/ResponseList/ResponseList.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
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
    pageSize: 6,
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false, // 是否为空数据
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
    },
  
      /**
     * 获取数据
     */
    getData: async function() {
        if (this.data.page == 1) {
          this.setData({
            list: [],
          })
        }
        // skip: this.data.list.length, limit: pageSize
        /* 
            1. 编写云函数，取得数据库中的真实数据
                -传入参数: skip: this.data.list.length, limit: pageSize
                -返回对象数组: [{post_id, content, title}, ...]
                  --post_id: 用于点击时进入对应的页面
                  --content: 回复内容
                  --title: 标题
            2. .then, 拿到append_data,接下来setData。
            3. 设置页面跳转（post_id）
        */
        var responseList = []
        var responses = []
        await db.collection('user').doc(app.globalData.user[0]._id).get().then(res => {
          responses = res.data.responses
        })
        await db.collection('response').where({
          _id: _.in(responses)
        }).skip(this.data.list.length).limit(this.data.pageSize).get()
        .then(res => {
          for (var i = 0; i < res.data.length; i ++) {
            responseList.push({
              post_id: res.data[i].post_id,
              content: res.data[i].content,
              title: "title"
            })
          }
        })
        for (var i = 0; i < responseList.length; i ++) {
          await db.collection('post').doc(responseList[i].post_id).get().then(res => {
            responseList[i].title = res.data.title
          })
        }
        this.setData({
          list: this.data.list.concat(responseList),
          isRequesting: false,
          hasMore: responseList.length == this.data.pageSize
        })
        this.swipeRefresh.setRefresh(false)
    }
  },
})
