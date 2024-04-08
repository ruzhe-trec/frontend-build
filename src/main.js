import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 自定义指令
import { permission } from './utils/directive';

// Ant Design Vue 组件库参照 https://www.antdv.com/docs/vue/getting-started-cn
import Antd from 'ant-design-vue';

// 引入全局样式
import './style/global.less';

// 创建 Pinia 实例
const pinia = createPinia();
// 使用 createApp 方法创建 Vue 实例
const app = createApp(App);

// 在 Vue 实例上添加自定义指令 'permission'
app.directive('permission', permission);
// 在 Vue 实例上使用 Ant Design Vue 组件库，Pinia 状态管理库，路由配置，然后挂载到 #root 元素上
app.use(Antd).use(pinia).use(router).mount('#root');
