<template>
  <!-- 页面头部组件 -->
  <a-layout-header class="header">
    <!-- 菜单收起/展开图标，使用 v-if 和 v-else 进行切换 -->
    <MenuUnfoldOutlined v-if="isCollapsed" class="trigger" @click="collapsedHandle" />
    <MenuFoldOutlined v-else class="trigger" @click="collapsedHandle" />

    <!-- 占位符 div，使用 flex:1 来撑开空间 -->
    <div style="flex: 1"></div>

    <!-- 用户设置下拉菜单 -->
    <a-dropdown class="setting" :trigger="['click']">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <!-- 显示用户的账号和用户名 -->
        {{ user.account }} {{ user.userName }}
        <DownOutlined />
      </a>

      <!-- 下拉菜单内容 -->
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item>
            <a> 系统设置 </a>
          </a-menu-item>
          <a-menu-item>
            <!-- 点击退出按钮执行退出函数 -->
            <a @click="logout"> 退出 </a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script setup>
import { computed } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useConfigStore, useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import storage from 'store2';

// 使用 Vue Router
const router = useRouter();
// 使用全局状态管理
const configStore = useConfigStore();
const userStore = useUserStore();
// 创建一个计算属性，用于确定菜单是否被收起
const isCollapsed = computed(() => configStore.isCollapsed);
// 切换菜单的收起/展开状态
const collapsedHandle = () => {
  configStore.toggleIsCollapsed();
};
// 获取用户信息
const user = computed(() => userStore);

// 用户退出函数
const logout = () => {
  // 移除本地存储的 token
  storage.remove('token');
  // 跳转到登录页
  router.push({ path: '/login' });
};
</script>

<style lang="less" scoped>
// 页面头部样式
header {
  display: flex;
  background: #fff;
  padding: 0;
}

// 菜单切换按钮样式
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  // 鼠标悬停时的颜色变化
  &:hover {
    color: #1890ff;
  }
}

// 用户设置下拉菜单样式
.setting {
  margin-right: 25px;
}
</style>
