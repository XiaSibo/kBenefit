// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

var responseList = []
var responses = []
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('user').doc(event.user_id).get().then(res => {
    responses = res.data.responses
  })
  await db.collection('response').where({
    _id: _.in(responses)
  }).skip(event.skip).limit(event.limit).get()
  .then(res => {
    for (i = 0; i < res.data.length; i ++) {
      responseList.push({
        post_id: res.data[i].post_id,
        content: res.data[i].content,
        title: "title"
      })
    }
  })
  for (i = 0; i < responseList.length; i ++) {
    await db.collection('post').doc(responseList[i].post_id).get().then(res => {
      responseList[i].title = res.data.title
    })
  }
  return responseList
}