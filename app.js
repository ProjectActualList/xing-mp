var util = require('./utils/util.js');
var api = require('./config/api.js');

App({
  onLaunch: function () {
    // 更新新版版本检测代码 提示： 只在线上环境有用
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      wx.showToast({
        title: '更新失败',
        icon: 'none'
      })
      // 新版本下载失败
    })
    wx.login({
      success(res) {
        util.request(api.AuthLogin, {
          code: res.code
        }).then(function (res) {
          if (res.code === "000000") {
            console.log(res.result)
            wx.setStorageSync("userInfo", res.result)
          }
          wx.hideLoading();
        });
      }
    })
  },
  globalData: {
    userInfo: null
  }
})