const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasTask: false,
  },
  switchTime: function (e) {
    if (!hasUserInfo){
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
    this.setData({
      skin: e.detail.value
    });
  },
})