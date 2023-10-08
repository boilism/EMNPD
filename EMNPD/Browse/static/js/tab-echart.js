
    // 监听标签页切换事件
document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.nav-tabs .nav-link');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = this.getAttribute('href'); // 获取目标标签页的ID

      // 根据目标标签页ID加载相应的图表
      switch (target) {
        case '#Natural-Product':
          loadNaturalProductChart();
          break;
        case '#Endophyte':
          loadEndophyteChart();
          break;
        case '#Target':
          loadTargetChart();
          break;
        // 添加其他标签页的处理逻辑
        default:
          break;
      }
    });
  });
});

    // 加载自然产品图表
function loadNaturalProductChart() {
  // 在这里编写自然产品图表的初始化代码
  // 例如：
  var dom2 = document.getElementById('container2');
  var myChart2 = echarts.init(dom2, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  // 设置图表配置项和数据
  var app = {};

  var option2;

  option2 = {
    title: {
      text: 'Molecular Weight Distribution',
      x: 'center' // 居中对齐
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['0-100', '100-150', '150-200', '200-250', '250-300', '300-350', '350-400', '400-450', '450-500', '500-550',
          '550-600', '600-650', '> 650'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,  // 设置刻度全部显示
          rotate: 45   // 可选，如果刻度标签过长可以旋转角度，使其更好地显示
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Molecular Weight Distribution:',
        type: 'bar',
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontWeight: 'bold'
          }
        },
        // 在每个柱子上设置 data-url 属性
        itemStyle: {
          emphasis: {
            barBorderRadius: [5, 5, 0, 0],
            color: '#ff6600',
            label: {
              show: true,
              position: 'top',
              fontWeight: 'bold'
            }
          },
          normal: {
            barBorderRadius: [5, 5, 0, 0],
            color: '#1991eb',
            label: {
              show: true,
              position: 'top',
              fontWeight: 'bold'
            }
          }
        },
        // 在这里设置每个柱子对应的跳转链接
        data: [
          {
            value: 69,
            range: '[Molecular_Weight: 0=>100]',
            itemStyle: {normal: {color: '#0079bf'}}
          },
          {
            value: 394,
            range: '[Molecular_Weight: 100=>150]',
            itemStyle: {normal: {color: '#70b500'}}
          },
          {
            value: 801,
            range: '[Molecular_Weight: 150=>200]',
            itemStyle: {normal: {color: '#ff9f1a'}}
          },
          {
            value: 1000,
            range: '[Molecular_Weight: 200=>250]',
            itemStyle: {normal: {color: '#eb5a46'}}
          },
          {
            value: 1120,
            range: '[Molecular_Weight: 250=>300]',
            itemStyle: {normal: {color: '#f2d600'}}
          },
          {
            value: 793,
            range: '[Molecular_Weight: 300=>350]',
            itemStyle: {normal: {color: '#c377e0'}}
          },
          {
            value: 565,
            range: '[Molecular_Weight: 350=>400]',
            itemStyle: {normal: {color: '#ff78cb'}}
          },
          {
            value: 496,
            range: '[Molecular_Weight: 400=>450]',
            itemStyle: {normal: {color: '#00c2e0'}}
          },
          {
            value: 297,
            range: '[Molecular_Weight: 450=>500]',
            itemStyle: {normal: {color: '#51e898'}}
          },
          {
            value: 216,
            range: '[Molecular_Weight: 500=>550]',
            itemStyle: {normal: {color: '#6a76ac'}}
          },
          {
            value: 122,
            range: '[Molecular_Weight: 550=>600]',
            itemStyle: {normal: {color: '#d52b1d'}}
          },
          {
            value: 85,
            range: '[Molecular_Weight: 600=>650]',
            itemStyle: {normal: {color: '#f8cc1b'}}
          },
          {
            value: 188,
            range: '[Molecular_Weight: 650=>10000]',
            itemStyle: {normal: {color: '#c4c9cc'}}
          }
        ]

      }
    ]

  };

  if (option2 && typeof option2 === 'object') {
    myChart2.setOption(option2);
  }

  myChart2.on('click', function (params) {
    var range = params.data.range;
    if (range) {
      window.open('/search/?mw_range=' + range + '&chart=1', '_blank');
    }
  });
  window.addEventListener('resize', myChart2.resize);

  var dom3 = document.getElementById('container3');
  var myChart3 = echarts.init(dom3);
  // 设置图表配置项和数据
  var option3 = {
    // ...
  };
  myChart3.setOption(option3);

  var dom4 = document.getElementById('container4');
  var myChart4 = echarts.init(dom4);
  // 设置图表配置项和数据
  var option4 = {
    // ...
  };
  myChart4.setOption(option4);

  var dom5 = document.getElementById('container5');
  var myChart5 = echarts.init(dom5);
  // 设置图表配置项和数据
  var option5 = {
    // ...
  };
  myChart5.setOption(option5);
}

// 加载内生菌图表
function loadEndophyteChart() {
  // 在这里编写内生菌图表的初始化代码
  // 例如：
  var dom1 = document.getElementById('container1');
  var myChart1 = echarts.init(dom1);
  // 设置图表配置项和数据
  var option1 = {
    // ...
  };
  myChart1.setOption(option1);
}

// 加载目标图表
function loadTargetChart() {
  // 在这里编写目标图表的初始化代码
  // 例如：
  var dom6 = document.getElementById('container6');
  var myChart6 = echarts.init(dom6);
  // 设置图表配置项和数据
  var option6 = {
    // ...
  };
  myChart6.setOption(option6);

  var dom7 = document.getElementById('container7');
  var myChart7 = echarts.init(dom7);
  // 设置图表配置项和数据
  var option7 = {
    // ...
  };
  myChart7.setOption(option7);

  var dom8 = document.getElementById('container8');
  var myChart8 = echarts.init(dom8);
  // 设置图表配置项和数据
  var option8 = {
    // ...
  };
  myChart8.setOption(option8);
}