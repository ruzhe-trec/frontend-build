<template>
  <!-- 页面主体内容区域 -->
  <a-layout-content class="page-content">
    <a-row>
      <!-- 页面标题区 -->
      <a-col span="24" class="page-content-header">
        <span class="title">{{ routeName }}</span>
      </a-col>
      <!-- 页面主体内容区 -->
      <a-col span="24" class="page-content-main">
        <!-- 使用 vue-router 的 router-view 元素来渲染匹配的子路由组件 -->
        <!-- 通过 v-slot 获取到当前路由匹配的组件，并使用动态组件 component 来渲染 -->
        <!-- 使用 keep-alive 对组件进行缓存，优化性能 -->
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAliveList">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useConfigStore } from '@/store';

const route = useRoute(); // 使用 Vue Router 的钩子函数 useRoute 获取当前路由对象
const configStore = useConfigStore(); // 获取全局状态管理

// 计算属性，获取当前路由的元数据中的标题
const routeName = computed(() => route.meta.title);

// 缓存的路由名称列表
const keepAliveList = computed(() => configStore.keepAliveList);
</script>

<style lang="less" scoped>
// 页面内容样式
.page-content {
  overflow: auto;

  // 页面标题区样式
  &-header {
    padding: 12px 24px 16px 24px;
    margin-top: 1px;
    background: #ffffff;

    // 标题样式
    .title {
      display: block;
      float: left;
      margin-bottom: 0;
      padding-right: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
    }
  }

  // 页面主体内容区样式
  &-main {
    padding: 24px;
  }
}
</style>
