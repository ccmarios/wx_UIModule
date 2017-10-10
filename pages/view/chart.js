// pages/view/chart.js
Page({

  data: {
  
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  onClickButton: function(e){
    let tempIndex = e.currentTarget.dataset.index;
    let title = '';
    switch (tempIndex){
      case '0':
        title = '线形图';
        break;
      case '1':
        title = '线形滚动图';
        break;
      case '2':
        title = '柱状图';
        break;
      case '3':
        title = '饼图';
        break;
      case '4':
        title = '圆环图';
        break;
      case '5':
        title = '区域图';
        break;
      case '6':
        title = '雷达图';
        break;
    }
    wx.navigateTo({
      url: 'chart_view?type=' + tempIndex + '&navigationTitle=' + title,
    })
  }
})