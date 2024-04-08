import { createRouter, createWebHistory } from 'vue-router';
import { keepAliveChange } from './keepAlive';
import { Layout } from '@/layout/index';
import storage from 'store2';
import TableRouter from './tableRouter';
import packConfig from '../../package.json';

// 缓存路由控制, 键名为 from.name ( 即路由name 及 组件 name, 请保持组件名称与路由名称一致), 值为到达路由需要缓存
const keepAliveConfig = {
  DataTable: ['DetailTable'], // DataTable 路由需要缓存 DetailTable
  VirtualTable: ['DetailTable'],
  Calculation: ['*'] // Calculation 路由需要缓存所有
};

// 定义路由配置
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue') // 使用懒加载方式加载 Login 组件
  },
  {
    path: '/',
    name: 'Index',
    redirect: '/dashboard', // 重定向到 /home 路径
    component: Layout, // 使用 Layout 作为布局组件
    children: [
      // 定义子路由
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '主页' // 设置页面标题
        },
        component: () => import('@/views/pages/Dashboard.vue') // 使用懒加载方式加载 Home 组件
      },
      {
        path: 'table',
        children: [...TableRouter] // 使用扩展运算符扩展 TableRouter
      },
      {
        path: 'calculation',
        name: 'Calculation',
        meta: {
          title: '高精计算' // 设置页面标题
        },
        component: () => import('@/views/pages/Calculation.vue') // 使用懒加载方式加载 Calculation 组件
      }
    ]
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL), // 使用 HTML5 history 模式
  routes // 使用定义的路由配置
});

// 定义路由前置守卫
router.beforeEach((to, from, next) => {
  // 处理缓存的路由
  keepAliveChange(keepAliveConfig, to, from);

  // 检查是否登录，是否存在 token
  if (to.path !== '/login') {
    if (storage.get('token')) {
      // 此处预留根据token获取当前登录者信息，更新store
      next(); // 允许导航
    } else {
      next({ path: '/login' }); // 重定向到登录页面
    }
  } else {
    next(); // 允许导航
  }

  // 根据路由元信息设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = packConfig.name; // 使用项目名作为默认页面标题
  }

  return false; // 取消导航，已在上面的判断中处理导航
});

// 导出 router
export default router;
