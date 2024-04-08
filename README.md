# frontend-vite javascript 模板项目

## 文件目录

目录结构为当前示例项目

```
│  .env.development         开发环境变量
│  .env.production          生产环境变量
│  .eslintrc.cjs            ESLint 配置文件
│  .gitignore               Git 忽略文件
│  .npmrc                   npm 配置文件
│  .prettierrc.json         Prettier 配置文件
│  index.html               应用入口 HTML 文件
│  package-lock.json        依赖包版本锁定文件
│  package.json             项目配置文件
│  README.md                项目说明文档
│  vite.config.js           Vite 配置文件

│
├─.vscode
│  extensions.json          Visual Studio Code 扩展配置文件
│
├─public
│  logo.png                 Logo 图片
│
└─src
   │  App.vue               应用主组件
   │  main.js               项目入口文件
   │
   ├─api
   │  index.js              接口总览
   │  login.js              登录接口
   │  table.js              表格接口
   │
   ├─assets
   │  login-bg.jpg          登录页面背景图
   │  logo.png              Logo 图片
   │
   ├─components
   │  index.js              组件总览
   │  Loading.vue           加载组件
   │  VirtualTable.vue      虚拟表格组件
   │
   ├─charts
   │  Charts.vue            图表组件
   │  install.js            组件安装脚本
   │
   ├─hooks
   │  modalVisible.js       模态框显示状态 Hook
   │  useResponsiveHeight.js 使用响应式高度 Hook
   │
   ├─layout
   │  index.js              布局组件总览
   │  Layout.vue            核心布局组件
   │
   ├─router
   │  index.js              路由配置总览
   │  keepAlive.js          缓存路由配置
   │  tableRouter.js        表格路由配置
   │
   ├─store
   │  index.js              状态管理总览
   │
   ├─style
   │  antd-override.less    Ant Design 样式覆盖
   │  common.less           公共样式
   │  global.less           全局样式
   │  theme.less            主题样式
   │
   ├─utils
   │  directive.js          自定义指令
   │  request.js            网络请求
   │
   └─views
      ├─auth
      │  Login.vue          登录页面
      │
      └─pages
         │  Calculation.vue  计算页面
         │  Dashboard.vue    仪表盘页面
         │
         └─table
            │  DataTable.vue   数据表格页面
            │  DetailTable.vue  详细表格页面
            │  VirtualTable.vue 虚拟表格页面
            │
            └─components
               ModalEdit.vue       编辑模态框组件
               SearchCriteria.vue  搜索条件组件
```

## 安装依赖

```
npm run install
```

### 开发

```
npm run start
```

### 打包

```
npm run build
```

### 单元测试

```
npm run test:unit
```

### 检查错误并修复

```
npm run lint
```
