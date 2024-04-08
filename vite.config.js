import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量

  return defineConfig({
    base: env.VITE_BASE_URL || './',
    plugins: [vue()],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        // 处理vite报错Internal server error: Inline JavaScript is not enabled. Is it set in your options?
        less: {
          additionalData: '@import "./src/style/theme.less";',
          javascriptEnabled: true
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('components')) {
              // 把 components 文件里面的文件都打包到 components.js 中
              return 'components';
            }
          }
        }
      }
    },
    //配置代理,解决跨域问题
    server: {
      port: 8000, // 自定义端口
      open: true, // 自动打开浏览器
      proxy: {
        '/api': {
          target: 'http://yapi.trechina.cn/mock/1535',
          changeOrigin: true
          //rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  });
};
