Page({
  data: {
    dataSource_One: [true, true, true],
    dataSource_Two: [true, true, true, true],
    dataSource_Three: [true, true, true, true, true],
    dataSource_Four: [true, true],
    starText: '2级'
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onClickStar_One: function (e) {
    this.data.dataSource_One = [];
    for (let i = 0; i < e.currentTarget.dataset.index + 1; i++) {
      this.data.dataSource_One.push(true);
    }
    this.setData({
      dataSource_One: this.data.dataSource_One
    });
  },
  onClickStar_Two: function (e) {
    this.data.dataSource_Two = [];
    for (let i = 0; i < e.currentTarget.dataset.index + 1; i++) {
      this.data.dataSource_Two.push(true);
    }
    this.setData({
      dataSource_Two: this.data.dataSource_Two
    });
  },
  onClickStar_Three: function (e) {
    this.data.dataSource_Three = [];
    for (let i = 0; i < e.currentTarget.dataset.index + 1; i++) {
      this.data.dataSource_Three.push(true);
    }
    this.setData({
      dataSource_Three: this.data.dataSource_Three
    });
  },
  onClickStar_Four: function (e) {
    this.data.dataSource_Four = [];
    for (let i = 0; i < e.currentTarget.dataset.index + 1; i++) {
      this.data.dataSource_Four.push(true);
    }
    this.setData({
      dataSource_Four: this.data.dataSource_Four
    });
    console.log(this.data.dataSource_Four.length);

    let starText = '';
    switch (this.data.dataSource_Four.length) {
      case 1:
        starText = '1级';
        break;
      case 2:
        starText = '2级';
        break;
      case 3:
        starText = '3级';
        break;
      case 4:
        starText = '4级';
        break;
      case 5:
        starText = '5级';
        break;
    }
    this.setData({
      starText: starText
    });


  }
})