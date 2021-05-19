const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    u_id: "cbddf0af60a21a200921493c080f30c5",
    title: "",
    content: "",
    fileList: [],
    selectedTags: [],
    tag_key_active: 0,
    no_limit: true,
    show_helper: false,
    show_adder: false,
    can_not_submit: true,
    tags: [
      {
        id: "1",
        key: "校区",
        value_group: [
          "八里台",
          "津南",
          "泰达"
        ],
        group: [
          {
            id: "11",
            value: "八里台",
            color: "red",
            show: false
          },
          {
            id: "12",
            value: "津南",
            color: "green",
            show: false
          },
          {
            id: "13",
            value: "泰达",
            color: "blue",
            show: false
          }
        ]
      },
      {
        id: "2",
        key: "院系",
        value_group: [
          "数学学院",
          "物理学院",
          "软件学院"
        ],
        group: [
          {
            id: "21",
            value: "数学学院",
            color: "red",
            show: false
          },
          {
            id: "22",
            value: "物理学院",
            color: "green",
            show: false
          },
          {
            id: "23",
            value: "软件学院",
            color: "blue",
            show: false
          }
        ]
      },
      {
        id: "3",
        key: "身份",
        value_group: [
          "教师",
          "研究生",
          "本科生"
        ],
        group: [
          {
            id: "31",
            value: "教师",
            color: "red",
            show: false
          },
          {
            id: "32",
            value: "研究生",
            color: "green",
            show: false
          },
          {
            id: "33",
            value: "本科生",
            color: "blue",
            show: false
          }
        ]
      }
    ],
    image_cloud_urls: []
  },

  onTitleChange: function (e) {
    var title_empty = !this.data.title.trim().length;
    var content_empty = !this.data.content.trim().length;
    var submit_disabled = title_empty||content_empty;
    this.setData({
      can_not_submit: submit_disabled
    });
  },

  onContentChange: function (e) {
    var title_empty = !this.data.title.trim().length;
    var content_empty = !this.data.content.trim().length;
    var submit_disabled = title_empty||content_empty;
    this.setData({
      can_not_submit: submit_disabled
    });
  },

  onTagKeyShift: function (event) {
    this.setData({
      tag_key_active: event.detail.index
    });
  },

  onTagValueSelect: function (event) {
    var pickerIdx = this.data.tag_key_active;
    var tagIdx = event.detail.index;
    var newTagStates = this.data.tags;
    newTagStates[pickerIdx].group[tagIdx].show = true;
    this.setData({
      no_limit: false,
      tags: newTagStates,
      show_adder: false
    });
  },

  deleteImg: function (event) {
    var idxToDelete = event.detail.index;
    var newList = this.data.fileList;
    newList.splice(idxToDelete, 1);
    this.setData({
      fileList: newList
    });
  },

  afterRead: function (event) {
    const { file } = event.detail;
    var newList = this.data.fileList;
    var imgNum = newList.length;
    file.forEach((item, index) => {
      var imgIdx = imgNum + index;
      var imgName = String(Date.now()) + String(imgIdx);
      var imgUrl = item.url;
      var imgThumb = item.thumb
      newList.push({
        index: imgIdx,
        name: imgName,
        url: imgUrl,
        thumb: imgThumb,
        isImage: true,
        deletable: true
      });
    })
    this.setData({
      fileList: newList
    });
  },

  uploadToCloud() { 
    wx.showLoading({
      title: '发布中...',
      mask: true
    });
    wx.cloud.init();
    const { fileList } = this.data;
    var date = Date.now();
    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`${date}${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        var imgCloudPaths = [];
        data.forEach(item => {
          imgCloudPaths.push(item.fileID);
        });
        var receiver_tags = [];
        this.data.tags.forEach(it => {
          it.group.forEach(item => {
            if(item.show)
              receiver_tags.push(item.id);
          })
        })
        const post_time = Date();
        const db = wx.cloud.database();
        const _ = db.command;
        db.collection('post').add({
          data: {
            sender_id: this.data.u_id,
            title: this.data.title,
            content: this.data.content,
            images: imgCloudPaths,
            time: post_time,
            update: post_time,
            responses: [],
            receiver_tags: receiver_tags
          }
        }).then((res) => {
          db.collection('user').doc(this.data.u_id).update({
            data: {
              posts: _.push([res._id])
            }
          }).then(() => {
            wx.hideLoading({
              success: (res) => {}
            });
            // wx.redirectTo({
            //   url: 'url',
            // });
          })
        }).catch(err => {
          console.log(err);
        })
      })
      .catch(e => {
        console.log(e);
      });
  },
  
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  showTagHelp: function () {
    this.setData({ show_helper: true });
  },

  onHelperClose: function () {
    this.setData({ show_helper: false });
  },

  onTagClose: function (event) {
    var tagData = event.currentTarget.dataset;
    var tagKeyIdx = tagData.keyidx;
    var tagIdx = tagData.valueidx;
    var newTagStates = this.data.tags;
    newTagStates[tagKeyIdx].group[tagIdx].show = false;
    var hasTag = false;
    newTagStates.forEach(key => {
      key.group.forEach(value => {
        if(value.show)
          hasTag = true;
      })
    })
    if(!hasTag)
      this.setData({
        no_limit: true,
      });
    this.setData({
      tags: newTagStates,
    });
  },

  showAdder: function () {
    this.setData({
      show_adder: true
    });
  },

  onAdderClose: function () {
    this.setData({
      show_adder: false
    });
  },

  addTag: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      u_id: app.globalData.user[0]._id,
    });
    const db = wx.cloud.database();
    const _ = db.command;
    var tags = [];
    db.collection("tag_class").get().then(res => {
      var tag_keys = res.data;
      var setTagTask = tag_keys.map((item, index) => {
        var tag_key_id = item._id;
        var tag_key_name = item.name;
        var group = [];
        var value_group = [];
        db.collection("tag").where({
          class_id: tag_key_id
        }).get().then(res => {
          var tags_data = res.data;
          tags_data.forEach((element, idx) => {
            group.push({
              id: element._id,
              value: element.value,
              color: element.color,
              show: false
            });
            value_group.push(element.value);
          })
        }).then(() => {
          tags.push({
            id: tag_key_id,
            key: tag_key_name,
            value_group: value_group,
            group: group
          });
        });
      });
      Promise.all(setTagTask).then(() => {
        setTimeout(() => this.setData({
          tags: tags
        }), 2000);
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})