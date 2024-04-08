<template>
  <!-- 侧边栏组件 -->
  <a-layout-sider class="side" v-model:collapsed="isCollapsed" :trigger="null" collapsible :theme="theme">
    <div class="logo" />
    <!-- 导航菜单 -->
    <a-menu v-model:selectedKeys="selectedKeys" :theme="theme" mode="inline" @click="onMenuClick">
      <!-- 主页菜单项 -->
      <a-menu-item key="Dashboard">
        <template #title>主页</template>
        <template #icon>
          <HomeOutlined />
        </template>
        <span>主页</span>
      </a-menu-item>
      <!-- 表格子菜单 -->
      <a-sub-menu key="Table">
        <template #title>表格</template>
        <template #icon>
          <TableOutlined />
        </template>
        <a-menu-item key="DataTable">数据表格</a-menu-item>
        <a-menu-item key="VirtualTable">虚拟表格</a-menu-item>
      </a-sub-menu>
      <!-- 高精计算菜单项 -->
      <a-menu-item key="Calculation">
        <template #title>高精计算</template>
        <template #icon>
          <CalculatorOutlined />
        </template>
        <span>高精计算</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { HomeOutlined, TableOutlined, CalculatorOutlined } from '@ant-design/icons-vue';

import { useConfigStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const configStore = useConfigStore();
const route = useRoute();
const router = useRouter();
const selectedKeys = ref(['Home']);

// 创建一个计算属性，用于确定侧边栏是否被收起
const isCollapsed = computed(() => configStore.isCollapsed);
const theme = 'dark'; // 主题颜色设置

// 菜单点击事件，根据点击的菜单项进行路由跳转
const onMenuClick = obj => {
  router.push({ name: obj.key });
};

// 选中当前页面对应的菜单项
const selectMenu = () => {
  selectedKeys.value = [route.name];
};

// 监听路由的变化，当路由发生变化时，自动选中新页面对应的菜单项
watch(
  () => route.name,
  () => {
    selectMenu();
  }
);

// 组件加载完成时，自动选中当前页面对应的菜单项
onMounted(() => {
  selectMenu();
});
</script>

<style lang="less" scoped>
// 侧边栏样式
.side {
  // logo 样式
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  // 深色主题下的菜单项样式
  .ant-menu-dark {
    // 当前选中的菜单项样式
    .router-link-exact-active {
      display: block;
      background-color: #1890ff;
      color: #fff;
    }
  }

  // 浅色主题下的菜单项样式
  .ant-menu-light {
    // 当前选中的菜单项样式
    .router-link-exact-active {
      display: block;
      background-color: #e6f7ff;

      &:after {
        opacity: 1;
        transform: scaleY(1);
      }
    }
  }
}
</style>
