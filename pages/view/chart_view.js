let wxCharts = require('../../utils/wxcharts.js');
let app = getApp();
//线形图、线形滚动图
let lineChart = null;
//柱状图
let columnChart = null;
let chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015']
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
};
//饼图
let pieChart = null;
//圆环图
let ringChart = null;
//区域图
let areaChart = null;
//雷达图
let radarChart = null;

Page({

  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true
  },

  onLoad: function (options) {
    this.setData({
      chartType: options.type
    });
    wx.setNavigationBarTitle({
      title: options.navigationTitle,
    });

    this.initChart();
  },

  onShow: function () {

  },

  onReady: function (e) {
    let that = this;
    let windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    if (that.data.chartType == '2') {
      that.readyColumnChart(windowWidth);
    } else if (that.data.chartType == '4') {
      that.readyRing(windowWidth);
    } else if (that.data.chartType == '6') {
      that.readyRadar(windowWidth);
    }
  },

  createSimulationData: function () {
    var categories = [];
    var data = [];

    if (this.data.chartType == '0') {
      for (var i = 0; i < 10; i++) {
        categories.push('2016-' + (i + 1));
        data.push(Math.random() * (20 - 10) + 10);
      }
    } else if (this.data.chartType == '1') {
      for (var i = 0; i < 10; i++) {
        categories.push('201620162-' + (i + 1));
        data.push(Math.random() * (20 - 10) + 10);
      }
    }

    return {
      categories: categories,
      data: data
    }
  },


  //线形图
  touchHandler: function (e) {
    //0:线形图  1:线形滚动图  2:柱状图  3:饼图  4:圆环图  5:区域图  6:雷达图
    if (this.data.chartType == '0') {
      lineChart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    } else if (this.data.chartType == '1') {
      lineChart.scrollStart(e);
    } else if (this.data.chartType == '2') {
      this.initColumnChart(e);
    } else if (this.data.chartType == '3') {
      console.log(pieChart.getCurrentDataIndex(e));
    } else if (this.data.chartType == '4') {
      console.log(ringChart.getCurrentDataIndex(e));
    } else if (this.data.chartType == '5') {
      console.log(areaChart.getCurrentDataIndex(e));
      areaChart.showToolTip(e);
    } else if (this.data.chartType == '6') {
      console.log(radarChart.getCurrentDataIndex(e));
    }
  },
  updateData: function () {
    if (this.data.chartType == '0') {
      var simulationData = this.createSimulationData();
      var series = [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }];
      lineChart.updateData({
        categories: simulationData.categories,
        series: series
      });
    } else if (this.data.chartType == '4') {
      ringChart.updateData({
        title: {
          name: '80%'
        },
        subtitle: {
          color: '#ff0000'
        }
      });
    }
  },


  //线形滚动图
  moveHandler: function (e) {
    lineChart.scroll(e);
  },

  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },


  //柱状图
  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }]
    });
  },
  initColumnChart: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });
    }
  },


  //初始化数据
  initChart: function () {
    let that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    if (that.data.chartType == '0') {           //线形图
      that.initLine(windowWidth);
    } else if (that.data.chartType == '1') {    //线形滚动图
      that.initScrollLine(windowWidth);
    } else if (that.data.chartType == '3') {    //饼图
      that.initPie(windowWidth);
    } else if (that.data.chartType == '5') {
      that.initArea(windowWidth);
    }
  },

  //初始化线形图
  initLine: function (windowWidth) {
    let simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  //初始化线形滚动图
  initScrollLine: function (windowWidth) {
    let simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  //初始化柱状图
  readyColumnChart: function (windowWidth) {
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  //初始化饼图
  initPie: function (windowWidth) {
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '成交量1',
        data: 15,
      }, {
        name: '成交量2',
        data: 35,
      }, {
        name: '成交量3',
        data: 78,
      }, {
        name: '成交量4',
        data: 63,
      }, {
        name: '成交量5',
        data: 35,
      }, {
        name: '成交量6',
        data: 78,
      }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },
  //初始化圆环图
  readyRing: function (windowWidth) {
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '70%',
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '收益率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: false,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
  },
  //初始化区域图
  initArea: function (windowWidth) {
    areaChart = new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',
      categories: ['1', '2', '3', '4', '5', '6'],
      animation: true,
      series: [{
        name: '成交量1',
        data: [32, 45, null, 56, 33, 34],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0,
        fontColor: '#8085e9',
        gridColor: '#8085e9',
        titleFontColor: '#f7a35c'
      },
      xAxis: {
        fontColor: '#7cb5ec',
        gridColor: '#7cb5ec'
      },
      extra: {
        legendTextColor: '#cb2431'
      },
      width: windowWidth,
      height: 200
    });
  },
  //初始化雷达图
  readyRadar: function (windowWidth) {
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['1', '2', '3', '4', '5', '6'],
      series: [{
        name: '成交量1',
        data: [90, 110, 125, 95, 87, 122]
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  },
})