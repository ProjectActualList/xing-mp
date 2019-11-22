var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    recordList: [],
    page: 1,
    limit: 10,
    totalPages: 1
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getRecordList();
  },
  getRecordList: function () {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.RecordList).then(function (res) {
      if (res.code === "000000") {
        that.setData({
          recordList: res.result,
        });
      }
      wx.hideLoading();
    });
  },
  switchTime: function (e) {
    let index = e.currentTarget.dataset.index
    let checked = e.detail.value
    let list = this.data.recordList
    let userId = this.data.userId
    let userInfo = app.globalData.userInfo
    if (!userInfo) {
      wx.switchTab({
        url: '/pages/index/index'
      })
      return
    }
    if (!checked){
      list[index].checked = checked
    }
    for (var i=0; i<list.length; i++) {
      if (i === index) {
        list[i].checked = checked
      }
    }
    this.recordingTime(userId, index, checked)
  },
  recordingTime(userId, index, checked) {
    console.log(userId + "," +checked + "," + index)
    let that = this;
    util.request(api.RecordingTime, {
      categoryId: index,
      status: checked,
      userId: userId
    }, 'POST').then(function (res) {
      if (res.code === "000000") {
      }
      wx.hideLoading();
    });
  },
  getData() {
  },
  onShow() {
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        userId:userInfo.id
      });
  }
})