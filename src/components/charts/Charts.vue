<template>
  <div ref="chart"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { debounce } from '@/utils/frontend-utils';
import { useConfigStore } from '@/store';
import echarts from './install';

const configStore = useConfigStore();
// 获取 DOM 元素
const chart = ref(null);
let charts;

const props = defineProps({
  option: Object
});

// 折叠标记
const isCollapsed = computed(() => configStore.isCollapsed);

const init = () => {
  charts = echarts.init(chart.value);
  charts.setOption(props.option);
};

const dispose = () => {
  charts.dispose();
};

const resize = debounce(() => {
  // resize 方法效果不佳，此处采用重新创建
  dispose();
  init();
}, 200);

// 监听变化
watch(
  () => props.option,
  newValue => {
    charts.setOption(newValue);
  }
);

// 折叠菜单重置
watch(
  () => isCollapsed.value,
  () => {
    resize();
  }
);

// 加载完成
onMounted(() => {
  init();
  window.addEventListener('resize', resize, false);
});

// 离开销毁实例
onUnmounted(() => {
  dispose();
  window.removeEventListener('resize', resize, false);
});
</script>
