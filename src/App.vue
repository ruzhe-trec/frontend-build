<template>
  <!-- 使用 a-config-provider 组件并设置本地化语言为简体中文 -->
  <a-config-provider :locale="zhCN">
    <!-- 加载组件，根据 isLoading 属性显示或隐藏 -->
    <Loading :isLoading="isLoading" />
    <!-- 路由视图，显示根据路由加载的组件 -->
    <router-view />
  </a-config-provider>
</template>

<script setup>
// 引入 Vue 的 computed 方法
import { computed } from 'vue';

// 导入组件库语言，包括中文(zhCN)，日语(ja_JP)，英语(en_US)
import zhCN from 'ant-design-vue/es/locale/zh_CN';

// 引入 Loading 组件
import { Loading } from '@/components';

// 引入 useConfigStore 方法
import { useConfigStore } from '@/store';

// 使用 useConfigStore 方法得到配置
const configStore = useConfigStore();

// 根据配置的加载状态创建计算属性
const isLoading = computed(() => configStore.isLoading);
</script>
