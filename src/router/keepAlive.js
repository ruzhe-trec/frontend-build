import { useConfigStore } from '@/store';
import { cloneDeep } from '@/utils/frontend-utils';

export const keepAliveChange = (keepAliveConfig, to, from) => {
  const configStore = useConfigStore();
  // 动态控制 keep-alive include 包含组件 ( 此处 组件为组件的真实 name, 非 router name, 请保持组件名称与路由名称一致 )
  const keepAliveList = cloneDeep(configStore.keepAliveList);

  // 根据来源查找到达列表
  const fromConfig = keepAliveConfig[from.name];

  if (fromConfig) {
    // 检查目的路由是否于列表, 设置缓存
    if (fromConfig.includes(to.name) || fromConfig.includes('*')) {
      // 不包含当前, 则追加
      !keepAliveList.includes(from.name) && keepAliveList.push(from.name);
    } else {
      // 包含则移除
      keepAliveList.includes(from.name) && keepAliveList.splice(keepAliveList.indexOf(from.name), 1);
    }
  }

  // 根据到达查找来源列表
  const toConfig = keepAliveConfig[to.name];

  // 检查来源路由是否于列表, 不包含则检查缓存移除
  if (toConfig && !toConfig.includes(from.name) && !toConfig.includes('*')) {
    // 包含则移除
    keepAliveList.includes(to.name) && keepAliveList.splice(keepAliveList.indexOf(to.name), 1);
  }
  configStore.setKeepAliveList(keepAliveList);
};
