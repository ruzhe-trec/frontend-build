<template>
  <!-- 布局组件，包含侧边栏、头部和内容区域 -->
  <a-layout class="layout">
    <!-- 侧边栏组件 -->
    <LayoutSide />
    <!-- 内层布局，包含头部和内容区域 -->
    <a-layout class="layout">
      <!-- 头部组件 -->
      <LayoutHeader />
      <!-- 内容区域组件 -->
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script setup>
// 导入需要的组件
import LayoutHeader from './components/Header.vue'; // 导入头部组件
import LayoutSide from './components/Side.vue'; // 导入侧边栏组件
import LayoutContent from './components/Content.vue'; // 导入内容区域组件
</script>

<style lang="less" scoped>
// 布局样式，设置为100%高度以覆盖全屏
.layout {
  height: 100%;
}
</style>
