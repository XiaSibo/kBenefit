// miniprogram/pages/postdetail/postdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u_id: "",
    is_admin: false,
    can_delete_post: false,
    can_delete_comment: false,
    popup_show: false,
    comment_editor_show: false,
    inner_editor_show: false,
    not_top: false,
    comment_content: "",
    inner_content: "",
    comment_images: [],
    comment_submit_allowed: false,
    inner_submit_allowed: false,
    popup: {},
    popup_inner: [],
    post_id: "",
    post_title: "",
    post_sender: {},
    receiver_tags: [],
    post_content: "",
    post_images: [],
    post_time: "",
    post_update: "",
    post_responses: [],
    pages: 5,
    response_num: 0
  },

  backToTop: function(e) {
    wx.pageScrollTo({
      scrollTop: 0
    });
  },

  deletePost: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该贴？',
      success (res) {
        if (res.confirm) {
          const db = wx.cloud.database();
          const _ = db.command;
          var post_sender_id = that.data.post_sender._id;
          var post_id = that.data.post_id
          var post_responses = that.data.post_responses;
          db.collection("user").doc(post_sender_id).update({
            data: {
              posts: _.pull(post_id)
            }
          });
          post_responses.forEach(response => {
            db.collection("user").doc(response.response_sender._id).update({
              data: {
                responses: _.pull(response.response_id)
              }
            });
            response.response_inners.forEach(inner => {
              db.collection("inner").doc(inner).get().then(res => {
                db.collection("user").doc(res.data.sender_id).update({
                  data: {
                    inners: _.pull(inner)
                  }
                });
                db.collection("inner").doc(inner).remove();
              })
            });
            db.collection("response").doc(response.response_id).remove();
          });
          db.collection("post").doc(post_id).remove({
            success: function(res) {
              wx.navigateBack({
                delta: 1,
              });
            },
            fail: function(err) {
              wx.showToast({
                title: '删除失败'
              });
            }
          });
        } else if (res.cancel) {
          // do nothing
        }
      }
    })
  },

  deleteComment: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该条回复？',
      success (res) {
        if (res.confirm) {
          var response_id = that.data.popup.response_id;
          var response_inners = that.data.popup.response_inners;
          var response_sender_id = that.data.popup.response_sender._id;
          var post_id = that.data.post_id;
          const db = wx.cloud.database();
          const _ = db.command;
          response_inners.forEach(inner => {
            db.collection("inner").doc(inner).get().then(res => {
              var inner_sender_id = res.data.sender_id;
              db.collection("user").doc(inner_sender_id).update({
                data: {
                  inners: _.pull(inner)
                }
              })
            }).then(() => {
              db.collection("inner").doc(inner).remove();
            })
          });
          db.collection("user").doc(response_sender_id).update({
            data: {
              responses: _.pull(response_id)
            }
          });
          db.collection("post").doc(post_id).update({
            data: {
              responses: _.pull(response_id)
            }
          });
          db.collection("response").doc(response_id).remove({
            success: function(res) {
              that.onPopupClose();
              that.onLoad({post_id: that.data.post_id});
            },
            fail: function(err) {
              wx.showToast({
                title: '删除失败'
              });
            }
          });
        } else if (res.cancel) {
          // do nothing
        }
      }
    })
  },

  deleteInner: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该条评论？',
      success (res) {
        if (res.confirm) {
          var inner_id = that.data.popup_inner[e.currentTarget.dataset.idx].inner_id;
          var inner_response_id =that.data.popup.response_id;
          var inner_sender_id = that.data.popup_inner[e.currentTarget.dataset.idx].inner_sender._id;
          const db = wx.cloud.database();
          const _ = db.command;
          db.collection("response").doc(inner_response_id).update({
            data: {
              inners: _.pull(inner_id)
            }
          });
          db.collection("user").doc(inner_sender_id).update({
            data: {
              inners: _.pull(inner_id)
            }
          });
          db.collection("inner").doc(inner_id).remove({
            success: function(res) {
              that.onPopupClose();
              that.onLoad({post_id: that.data.post_id});
            },
            fail: function(err) {
              wx.showToast({
                title: '删除失败'
              });
            }
          });
        } else if (res.cancel) {
          // do nothing
        }
      }
    })
    
  },

  post_checkSenderInfo: function(e) {
    wx.navigateTo({
      url: '/pages/homepage/homepage?id=' + this.data.post_sender._id
    })
  },

  response_checkSenderInfo: function(e) {
    wx.navigateTo({
      url: '/pages/homepage/homepage?id=' + this.data.popup.response_sender._id
    })
  },

  inner_checkSenderInfo: function(e) {
    wx.navigateTo({
      url: '/pages/homepage/homepage?id=' + e.currentTarget.dataset.uid
    })
  },

  formatDate: function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
  },

  post_previewImg: function(e) {
    var index = e.currentTarget.dataset.index;
    var imgGroup = this.data.post_images;
    wx.previewImage({
      urls: imgGroup,
      current: imgGroup[index],
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  response_previewImg: function(e) {
    var index = e.currentTarget.dataset.index;
    var imgGroup = this.data.popup.response_images;
    wx.previewImage({
      urls: imgGroup,
      current: imgGroup[index],
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  showResponseDetail: function(e) {
    var inners = this.data.post_responses[e.currentTarget.dataset.index].response_inners;
    this.setData({
      popup_inner: [],
      popup_show: true,
      popup: this.data.post_responses[e.currentTarget.dataset.index],
      can_delete_comment: this.data.is_admin || (this.data.post_responses[e.currentTarget.dataset.index].response_sender._id == this.data.u_id)
    });
    const db = wx.cloud.database();
    const _ = db.command;
    inners.forEach((item, index) => {
      db.collection("inner").doc(item).get().then(res => {
        var inner_id = res.data._id;
        var inner_sender_id = res.data.sender_id;
        var inner_content = res.data.content;
        var inner_time_protocol = this.dateShift(res.data.time);
        db.collection("user").doc(inner_sender_id).get().then(res => {
          var inner_sender_user_id = res.data.stuid;
          var inner_sender_user_name = res.data.name;
          var inner_sender_user_avatar = res.data.avatarUrl;
          var inner_sender_user_tags_id = res.data.tags;
          var inner_sender_user_tags = [];
          var getTagTasks = inner_sender_user_tags_id.map((item, index) => db.collection("tag")
            .doc(item).get().then(res => {
              inner_sender_user_tags.push({
                tag_id: res.data._id,
                tag_style: res.data.color,
                tag_value: res.data.value 
              });
            })
          );
          Promise.all(getTagTasks).then(() => {
            var newList = this.data.popup_inner;
            newList.push({
              inner_id: inner_id,
              inner_sender: {
                _id: inner_sender_id,
                user_id: inner_sender_user_id,
                user_name: inner_sender_user_name,
                user_avatar: inner_sender_user_avatar,
                user_tags: inner_sender_user_tags,
              },
              inner_content: inner_content,
              inner_time: inner_time_protocol,
            });
            var compare = function (obj1, obj2) {
              var val1 = obj1.inner_time;
              var val2 = obj2.inner_time;
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }            
            };
            newList.sort(compare);
            this.setData({
              popup_inner: newList,
            });
          })
        })
      });
    });
  },

  onPopupClose: function() {
    this.setData({ popup_show: false });
  },

  showCommentEditor: function(e) {
    this.setData({ comment_editor_show: true });
  },

  showInnerEditor: function(e) {
    this.setData({ inner_editor_show: true });
  },

  onCommentEditorClose: function() {
    this.setData({ comment_editor_show: false });
  },

  onInnerEditorClose: function() {
    this.setData({ inner_editor_show: false });
  },

  onPageScroll: function(e) {
    this.setData({
      not_top: e.scrollTop
    });
  },

  onCommentContentChange: function(e) {
    var comment_content_not_empty = this.data.comment_content.trim().length;
    var comment_image_not_empty = this.data.comment_images.length;
    var comment_can_submit = comment_content_not_empty||comment_image_not_empty;
    this.setData({
      comment_submit_allowed: comment_can_submit
    });
  },

  onInnerContentChange: function(e) {
    var inner_content_not_empty = this.data.inner_content.trim().length;
    this.setData({
      inner_submit_allowed: inner_content_not_empty
    });
  },

  deleteImg: function (event) {
    var idxToDelete = event.detail.index;
    var newList = this.data.comment_images;
    newList.splice(idxToDelete, 1);
    this.setData({
      comment_images: newList
    });
  },

  afterRead: function (event) {
    const { file } = event.detail;
    var newList = this.data.comment_images;
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
      comment_images: newList
    });
    var comment_content_not_empty = this.data.comment_content.trim().length;
    var comment_image_not_empty = this.data.comment_images.length;
    var comment_can_submit = comment_content_not_empty||comment_image_not_empty;
    this.setData({
      comment_submit_allowed: comment_can_submit
    });
  },

  uploadCommentToCloud: function() { 
    wx.showLoading({
      title: '发布中...',
      mask: true
    });
    wx.cloud.init();
    const { comment_images } = this.data;
    var date = Date.now();
    const uploadTasks = comment_images.map((file, index) => this.uploadFilePromise(`${date}${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        var imgCloudPaths = [];
        data.forEach(item => {
          imgCloudPaths.push(item.fileID);
        });
        const comment_time = this.formatDate(new Date());
        const db = wx.cloud.database();
        const _ = db.command;
        db.collection('post').doc(this.data.post_id).get().then(res => {
          var floor_num = res.data.floors + 1;
          db.collection('response').add({
            data: {
              sender_id: this.data.u_id,
              content: this.data.comment_content,
              images: imgCloudPaths,
              time: comment_time,
              inners: [],
              number: floor_num,
              post_id: this.data.post_id
            }
          }).then((res) => {
            db.collection('user').doc(this.data.u_id).update({
              data: {
                responses: _.push([res._id])
              }
            }).then(() => {
              db.collection('post').doc(this.data.post_id).update({
                data: {
                  responses: _.push([res._id]),
                  update: Date(),
                  floors: floor_num
                }
              }).then(() => {
                wx.hideLoading({
                  success: (res) => {}
                });
                this.setData({
                  comment_editor_show: false
                });
                // wx.redirectTo({
                //   url: 'url',
                // });
                this.onLoad({post_id: this.data.post_id});
              })
            });
          }).catch(err => {
            console.log(err);
          })
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

  uploadInnerToCloud: function() {
    wx.showLoading({
      title: '发布中...',
      mask: true
    });
    const db = wx.cloud.database();
    const _ = db.command;
    var inner_time = this.formatDate(new Date());
    db.collection('inner').add({
      data: {
        sender_id: this.data.u_id,
        content: this.data.inner_content,
        time: inner_time,
        response_id: this.data.popup.response_id
      }
    }).then((res) => {
      db.collection('user').doc(this.data.u_id).update({
        data: {
          inners: _.push([res._id])
        }
      }).then(() => {
        db.collection('post').doc(this.data.post_id).update({
          data: {
            update: Date()
          }
        }).then(() => {
          db.collection('response').doc(this.data.popup.response_id).update({
            data: {
              inners: _.push([res._id])
            }
          }).then(() => {
            wx.hideLoading({
              success: (res) => {}
            });
            this.setData({
              inner_editor_show: false,
              popup_show: false
            });
            this.onLoad({post_id: this.data.post_id});
            // wx.redirectTo({
            //   url: 'url',
            // });
          });
        })
      });
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  dateShift: function (date) {
    return date.substr(0, 10);
  },

  onLoad: function (options) {
    this.setData({
      post_id: options.post_id,
      u_id: app.globalData.user[0]._id,
      is_admin: app.globalData.isAdministrator,
      pages: 5
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    const db = wx.cloud.database();
    const _ = db.command;
    var post_id = this.data.post_id;
    this.setData({
      post_responses: []
    });
    db.collection("post").doc(post_id).get().then(res => {
      var post_sender_id = res.data.sender_id;
      var post_responses_id = res.data.responses;
      var post_receiver_tags_id = res.data.receiver_tags;
      var post_receiver_tags = [];
      var getReceiverTags = post_receiver_tags_id.map((item, index) => db.collection("tag")
        .doc(item).get().then(res => {
          post_receiver_tags.push({
            tag_id: res.data._id,
            tag_style: res.data.color,
            tag_value: res.data.value 
          });
        })
      );
      Promise.all(getReceiverTags).then(() => {
        this.setData({
          post_id: post_id,
          post_title: res.data.title,
          post_content: res.data.content,
          post_images: res.data.images,
          post_time: this.dateShift(res.data.time),
          post_update: this.dateShift(res.data.update),
          receiver_tags: post_receiver_tags,
          response_num: res.data.responses.length,
          can_delete_post: app.globalData.isAdministrator||(this.data.u_id == post_sender_id)
        });
      })
      db.collection("user").doc(post_sender_id).get().then(res => {
        var post_sender_user_id = res.data.sender_stuid;
        var post_sender_user_name = res.data.name;
        var post_sender_user_avatar = res.data.avatarUrl;
        var post_sender_user_tags_id = res.data.tags;
        var post_sender_user_tags = [];
        var getTagTasks = post_sender_user_tags_id.map((item, index) => db.collection("tag")
          .doc(item).get().then(res => {
            post_sender_user_tags.push({
              tag_id: res.data._id,
              tag_style: res.data.color,
              tag_value: res.data.value 
            });
          })
        );
        Promise.all(getTagTasks).then(() => {
          this.setData({
            post_sender: {
              _id: post_sender_id,
              user_id: post_sender_user_id,
              user_name: post_sender_user_name,
              user_avatar: post_sender_user_avatar,
              user_tags: post_sender_user_tags,
            }
          });
        })
      }).then(() => {
        post_responses_id.forEach((item, index) => {
          db.collection("response").doc(item).get().then(res => {
            var response_id = res.data._id;
            var response_sender_id = res.data.sender_id;
            var response_images = res.data.images;
            var response_number = res.data.number;
            var response_inners = res.data.inners;
            var response_time = this.dateShift(res.data.time);
            var response_content = res.data.content;
            db.collection("user").doc(response_sender_id).get().then(res => {
              var response_sender_user_id = res.data.sender_stuid;
              var response_sender_user_name = res.data.name;
              var response_sender_user_avatar = res.data.avatarUrl;
              var response_sender_user_tags_id = res.data.tags;
              var response_sender_user_tags = [];
              var getTagTasks1 = response_sender_user_tags_id.map((item, index) => db.collection("tag")
                .doc(item).get().then(res => {
                  response_sender_user_tags.push({
                    tag_id: res.data._id,
                    tag_style: res.data.color,
                    tag_value: res.data.value 
                  });
                })
              );
              Promise.all(getTagTasks1).then(() => {
                var response_sender = {
                  _id: response_sender_id,
                  user_id: response_sender_user_id,
                  user_name: response_sender_user_name,
                  user_avatar: response_sender_user_avatar,
                  user_tags: response_sender_user_tags,
                };
                var newList = this.data.post_responses;
                newList.push({
                  response_id: response_id,
                  response_number: response_number,
                  response_sender: response_sender,
                  response_time: response_time,
                  response_content: response_content,
                  response_images: response_images,
                  image_num: response_images.length,
                  response_inners: response_inners,
                  inner_num: response_inners.length
                });
                var compare = function (obj1, obj2) {
                  var val1 = obj1.response_number;
                  var val2 = obj2.response_number;
                  if (val1 < val2) {
                    return -1;
                  } else if (val1 > val2) {
                    return 1;
                  } else {
                    return 0;
                  }            
                };
                newList.sort(compare);
                this.setData({
                  post_responses: newList
                });
              })
            })
          })
        });
      }).then(() => {
        wx.hideLoading({
          success: (res) => {

          }
        });
      })
    })
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
    var new_pages = this.data.pages + 5;
    this.setData({
      pages: new_pages
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})