var app = getApp()

Page({
  data: {
    userInfo: {'avatarUrl':'../../images/headIcon.png'},
    gitUrl: 'https://github.com/ccmarios/wx_UIModule'
  },
  onLoad: function (options) {
    let that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  isShowToast: function (title) {
    this.setData({
      toastShow: true,
      title: title
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        toastShow: false
      });
    }, 1500);
  },
  onClickCopy:function(){
    let that = this;
    wx.setClipboardData({
      data: that.data.gitUrl,
      success: function (res) {
        that.isShowToast('复制成功，快去点赞吧~~');
      }
    });
  }
})