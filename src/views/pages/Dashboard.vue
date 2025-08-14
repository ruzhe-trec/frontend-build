<template>
  <div>
    <h1>本次访问时间: {{ now }}</h1>
    <h1>随机标识: {{ sign }}</h1>
    <pre>{{ json }}</pre>
    <a-button type="primary" v-permission="true" @click="showLoad"> 全局 loading </a-button>
    <a-button type="primary" v-permission="false"> 我是没有权限的按钮 v-permission="false" </a-button>
    <Charts
      :style="{
        width: '100%',
        height: '400px'
      }"
      :option="lineOption"></Charts>
    <Charts
      :style="{
        width: '100%',
        height: '300px'
      }"
      :option="barOption"></Charts>
    <Charts
      :style="{
        width: '100%',
        height: '300px'
      }"
      :option="pieOption"></Charts>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfigStore } from '@/store';
import { getInfo } from '@/api/index';
import { Charts } from '@/components';
import { uuid, date, shuffle } from '@/utils/frontend-utils';

const configStore = useConfigStore();

// 本次访问时间
const now = date().format('YYYY-MM-DD HH:mm:ss');

// 随机标识
const sign = uuid();

// 请求的数据
const json = ref({});

// 请求 api
getInfo({ userId: 1000 }).then(data => {
  json.value = data;
});

// 全局 loading
const showLoad = () => {
  configStore.setIsLoading(true);
  setTimeout(() => {
    configStore.setIsLoading(false);
  }, 2000);
};

// 折线图
const lineOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: 'blue'
      }
    }
  },
  legend: {
    data: ['Email', 'Union Ads']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
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
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
});

setInterval(() => {
  lineOption.value.series[0].data = shuffle(lineOption.value.series[0].data);
}, 3000);

// 柱状图
const barOption = ref({
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['product', '2020', '2021', '2022'],
    source: [
      { product: 'Matcha Latte', 2020: 43.3, 2021: 85.8, 2022: 93.7 },
      { product: 'Milk Tea', 2020: 83.1, 2021: 73.4, 2022: 55.1 },
      { product: 'Cheese Cocoa', 2020: 86.4, 2021: 65.2, 2022: 82.5 },
      { product: 'Walnut Brownie', 2020: 72.4, 2021: 53.9, 2022: 39.1 }
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
});

// 饼状图
const pieOption = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    data: [
      'Direct',
      'Marketing',
      'Search Engine',
      'Email',
      'Union Ads',
      'Video Ads',
      'Baidu',
      'Google',
      'Bing',
      'Others'
    ]
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1548, name: 'Search Engine' },
        { value: 775, name: 'Direct' },
        { value: 679, name: 'Marketing', selected: true }
      ]
    },
    {
      name: 'Access From',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 1048, name: 'Baidu' },
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 251, name: 'Google' },
        { value: 234, name: 'Union Ads' },
        { value: 147, name: 'Bing' },
        { value: 135, name: 'Video Ads' },
        { value: 102, name: 'Others' }
      ]
    }
  ]
});
</script>
