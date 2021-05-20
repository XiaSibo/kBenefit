// components/PostList/PostList.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
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
    postList: [],
    beg: 0,
    page: 1,
    pageSize: 4,  // pageSize必须大于等于5
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false // 是否为空数据
  },

  lifetimes: {
    attached: function() {
      this.swipeRefresh = this.selectComponent('#refresh')
      this.swipeRefresh.setRefresh(true)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    show: function() {
    },
    hide: function() {
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (e) {
      wx.navigateTo({
        url: '/pages/postdetail/postdetail?post_id=' + e.currentTarget.dataset.t,
      })
    },
    /**
      * 下拉刷新
      */
     refresh: function() {
      if (!this.data.isRequesting) {
        this.setData({
          beg: 0,
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
       if (this.data.type == "home") {
          // task1
          var cur_user_tags = []
          var append_data = []  // 得到的贴子数组
          var posts = []  // 当前用户的post_id数组
          var avatarUrl = ""  // 当前用户的头像url
          var fromTags_id = []  // 当前用户的tags，即fromTags
          var toTags_id = []  // 贴子的toTags,用posts查询来获得
          var fromTags = []
          var toTags = []

          await db.collection('user').doc(app.globalData.user[0]._id).get().then(res => {
            cur_user_tags = res.data.tags
          })

          await db.collection('post').where({}).orderBy('time', 'desc').get().then(async res => {
            var cnt = 0
            for (var i = this.data.postList.length; i < res.data.length && cnt < this.data.pageSize; i ++) {
              var receiver_tags = res.data[i].receiver_tags
              var can_receive = false
              for (var j = 0, len1 = cur_user_tags.length; j < len1; j ++) {
                for (var k = 0, len2 = receiver_tags.length; k < len2; k ++) {
                  if (cur_user_tags[j] == receiver_tags[k]) {
                    can_receive = true;
                    break;
                  }
                }
                if (can_receive) break;
              }
              
              if (receiver_tags.length == 0) can_receive = true
              if (!can_receive) continue;
              cnt ++
              var avatarUrl = ""
              var fromTags_id = []
              await db.collection('user').doc(res.data[i].sender_id).get().then(res => {
                avatarUrl = res.data.avatarUrl
                fromTags_id = res.data.tags
              })

              var fromTags = []
              for (var j = 0, len = fromTags_id.length; j < len; j ++) {
                 await db.collection('tag').doc(fromTags_id[j]).get().then(res => {
                  fromTags.push({
                    color: res.data.color,
                    value: res.data.value
                  })
                })
              }

              var toTags = []
              for (var j = 0, len = res.data[i].receiver_tags.length; j < len; j ++) {
                 await db.collection('tag').doc(res.data[i].receiver_tags[j]).get().then(res => {
                  toTags.push({
                    color: res.data.color,
                    value: res.data.value
                  })
                })
              }

              var u = res.data[i]
              append_data.push({
                post_id: u._id,
                avatarUrl: avatarUrl,
                fromTags: fromTags,
                toTags: toTags,
                date: res.data[i].time.substr(0, 10),
                time: res.data[i].time.substr(10),
                title: u.title,
                text: u.content,
                commentCnt: u.responses.length
              })

            }
          })

           this.setData({
             postList: this.data.postList.concat(append_data),
             isRequesting: false,
             hasMore: append_data.length == this.data.pageSize  // hasMore根据数据库返回结果来看
           })
           this.swipeRefresh.setRefresh(false);

       } else {
          // task2
          var append_data = []  // 得到的贴子数组
          var posts = []  // 当前用户的post_id数组
          var avatarUrl = ""  // 当前用户的头像url
          var fromTags_id = []  // 当前用户的tags，即fromTags
          var toTags_id = []  // 贴子的toTags,用posts查询来获得
          var fromTags = []
          var toTags = []
          
          // 获取当前用户的post_id数组
          // 获取当前用户的头像url
          // 获取当前用户的tags的id
          await db.collection('user').doc(app.globalData.user[0]._id).get().then(res => {
            posts = res.data.posts
            avatarUrl = res.data.avatarUrl
            fromTags_id = res.data.tags
            // 选取需要的部分(相当于做了skip和limit)
            // posts = posts.slice(this.data.postList.length, this.data.postList.length + this.data.pageSize)
          })

          for (var i = 0, len = fromTags_id.length; i < len; i ++) {
            await db.collection('tag').doc(fromTags_id[i]).get().then(res => {
              fromTags.push({
                color: res.data.color,
                value: res.data.value
              })
            })
          }

          // 获取toTags_id数组
          // 标题
          // 内容
          // 日期
          // 评论数
          await db.collection('post').where({
            _id: _.in(posts)
          }).orderBy('time', 'desc').get().then(async res => {
            var cnt = 0
            for (var i = this.data.postList.length; i < res.data.length && cnt < this.data.pageSize; i ++) {
              cnt ++
              var toTags = []
              await db.collection('tag').where({
                _id: _.in(res.data[i].receiver_tags)
              }).get().then(res => {
                for (var i = 0; i < res.data.length; i ++) {
                  toTags.push({
                    color: res.data[i].color,
                    value: res.data[i].value
                  })
                }
              })

              append_data.push({
                post_id: res.data[i]._id,
                avatarUrl: avatarUrl,
                fromTags: fromTags,
                toTags: toTags,
                date: res.data[i].time.substr(0, 10),
                time: res.data[i].time.substr(10),
                title: res.data[i].title,
                text: res.data[i].content, 
                commentCnt: res.data[i].responses.length
              })
            }
          })
          
           this.setData({
             postList: this.data.postList.concat(append_data),
             isRequesting: false,
             hasMore: append_data.length == this.data.pageSize  // hasMore根据数据库返回结果来看
           })
           this.swipeRefresh.setRefresh(false);
       }
    }
  },
})
