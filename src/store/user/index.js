import { defineStore } from 'pinia';

// 使用 pinia 的 defineStore 方法定义一个用户信息的全局状态管理器
export const useUserStore = defineStore({
  id: 'user', // 状态管理器的 ID
  // 定义状态对象，这里包含两个状态
  state: () => ({
    account: '10073306', // 用户账户，默认为 '10073306'
    userName: '张三' // 用户名称，默认为 '张三'
  })
});
