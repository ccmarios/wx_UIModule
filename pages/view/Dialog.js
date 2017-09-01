Page({
  data: {
    showDialog: false,
    showCenterDialog: false
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
  
  },
  onClickButton:function(e){
    let that = this;
    switch(e.currentTarget.dataset.index){
      case '0':
        that.setData({
          showDialog: !this.data.showDialog
        });
        break;
      case '1':
        that.setData({
          showCenterDialog: !this.data.showCenterDialog
        });
        break;
    }
  },
  onClickdiaView:function(){
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  onClickdiaCenterView:function(){
    this.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  }
})