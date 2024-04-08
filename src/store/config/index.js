import { defineStore } from 'pinia';

// 使用 pinia 的 defineStore 方法定义一个全局状态管理器
export const useConfigStore = defineStore({
  id: 'config', // 状态管理器的 ID
  // 定义状态对象，这里包含三个状态
  state: () => ({
    isCollapsed: window.innerWidth <= 1024, // 折叠窗口标识，如果窗口宽度小于或等于 1024，该标识为 true，否则为 false
    isLoading: false, // 加载状态标识，默认为 false
    keepAliveList: [] // 存放需要进行 keep-alive 缓存的路由名称列表，初始为空
  }),
  // 定义操作状态的方法
  actions: {
    // 设置 isLoading 状态
    setIsLoading(isLoading) {
      this.isLoading = isLoading;
    },
    // 切换 isCollapsed 状态
    toggleIsCollapsed() {
      this.isCollapsed = !this.isCollapsed;
    },
    // 设置需要进行 keep-alive 缓存的路由名称列表
    setKeepAliveList(keepAliveList) {
      this.keepAliveList = keepAliveList;
    }
  }
});
