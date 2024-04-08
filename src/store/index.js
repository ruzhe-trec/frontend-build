// 导入配置状态管理器
import { useConfigStore } from './config/index';
// 导入用户信息状态管理器
import { useUserStore } from './user/index';

// 将这两个状态管理器重新导出，供其他文件使用
export { useConfigStore, useUserStore };
