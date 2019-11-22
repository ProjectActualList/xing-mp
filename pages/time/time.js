const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasTask: false,
    list: [
      {
        name: '工作',
        value: 0,
        checked: false
      },
      {
        name: '健身',
        value: 1,
        checked: false
      },
      {
        name: '通勤',
        value: 2,
        checked: false
      },
      {
        name: '阅读',
        value: 3,
        checked: false
      },
      {
        name: '学习',
        value: 4,
        checked: false
      }
    ]
  },
  switchTime: function (e) {
    console.log(e)
    let userInfo = app.globalData.userInfo
    if (!userInfo) {
      wx.switchTab({
        url: '/pages/index/index'
      })
      return
    }
    if (! this.data.hasUserInfo){
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
    let index = e.currentTarget.dataset.index
    let checked = e.detail.value
    let list = this.data.list
    
    for (var i=0; i<list.length; i++) {
      if (i === index) {
        list[i].checked = checked
      } else {
        list[i].checked = !checked
      }
    }
    this.setData({
      list
    })
  },
  getData() {
    
  },
  onShow() {
    
  }
})