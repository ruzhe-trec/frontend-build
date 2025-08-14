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

import dayjs from 'dayjs';
// 导入 updateLocale 插件以允许修改本地化设置
import updateLocale from 'dayjs/plugin/updateLocale';
// 导入中文（中国）本地化配置
import 'dayjs/locale/zh-cn';

// 启用 updateLocale 插件
dayjs.extend(updateLocale);

// 设置 dayjs 的本地化为中文（中国）
dayjs.locale('zh-cn');

/**
 * 更新 dayjs 的本地化设置，主要用于自定义周和年的开始时间
 * @param {string} locale - 本地化配置的语言标识符，这里是 'zh-cn' 中文（中国）。
 * @param {object} config - 包含本地化修改参数的对象。
 * @param {number} config.weekStart - 一周的起始日，这里设置为 1 表示周一为每周的开始。
 * @param {number} config.yearStart - 定义一年开始的第几天，这里设置为 5 表示每年的第五天为新年的开始。
 */
dayjs.updateLocale('zh-cn', {
  weekStart: 1,
  yearStart: 5
});

// 使用 useConfigStore 方法得到配置
const configStore = useConfigStore();

// 根据配置的加载状态创建计算属性
const isLoading = computed(() => configStore.isLoading);
</script>
