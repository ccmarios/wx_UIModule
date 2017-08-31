Page({
  data: {
    num: 1,
    totalNum: 10
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  },
  onTapMinus: function () {
    //减号点击
    if (this.data.totalNum > 1) {
      this.plusMinus('minus');
    }
  },
  onTapPlus: function () {
    //加号点击
    if (this.data.totalNum > 1) {
      this.plusMinus('plus');
    }
  },
  onInputNum: function (e) {
    //input输入时
    this.inputFunc('input', Number(e.detail.value));
  },
  lossFocus: function (e) {
    //input失去焦点时
    this.inputFunc('loss', Number(e.detail.value));
  },
  plusMinus: function (pars) {
    let totalNum = this.data.totalNum;    //上限
    let num = this.data.num;    //当前操作数

    if (pars == "plus" && num == 1) {
      num++;
    } else if (pars == "minus" && num == totalNum) {
      num--;
    } else if (num > 1 && num < totalNum) {
      pars == "plus" ? num++ : num--;
    }
    this.setData({
      num: num
    });
  },
  inputFunc: function (pars, evalue) {
    let totalNum = this.data.totalNum;    //当前优惠券总数量

    if (pars == 'input') {
      if (evalue.length == 1 && evalue[0] == 0) { evalue = 1; }
    } else {
      if (evalue == '' || evalue == 0) {
        evalue = 1;
      } else if (evalue > totalNum) {
        evalue = totalNum;
      }
    }
    this.setData({
      num: evalue
    });
  },
  onClickButton: function(){
    this.isShowToast(this.data.num);
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