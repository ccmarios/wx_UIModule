Page({
  data: {
    passWord: '',
    passWordArr: [],
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  onChangeInput: function (e) {
    let that = this;
    if (e.detail.value.length > 6) {
      return;
    }
    if (e.detail.value.length > that.data.passWord.length) {
      that.data.passWordArr.push(true);
    } else if (e.detail.value.length < that.data.passWord.length) {
      that.data.passWordArr.pop();
    }
    that.setData({
      passWord: e.detail.value,
      passWordArr: that.data.passWordArr
    });
  },
  onTapCommit:function(){
    let that = this;
    if (that.data.passWord.length == 0){
      that.isShowToast('请输入密码');
      return;
    }
    wx.showModal({
      title: '输入的密码是：',
      content: that.data.passWord,
      confirmText: '返回上页',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    })
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
  }
})