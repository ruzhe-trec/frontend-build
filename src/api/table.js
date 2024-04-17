import { request } from '@/utils/request';

// 数据表格
export function getTableList(data) {
  return request({
    url: `/mock/getTableList`,
    method: 'get',
    data
  });
}

// 虚拟数据表格
export function getVirtualTableList(data) {
  return request({
    url: `/mock/getVirtualTableList`,
    method: 'get',
    data
  });
}

// 删除表格
export function deleteTable(data) {
  return request({
    url: '/mock/deleteTable',
    method: 'delete',
    params: data
  });
}

// 添加表格
export function addTable(data) {
  return request({
    url: '/mock/addTable',
    method: 'post',
    data
  });
}

// 编辑表格
export function editTable(data) {
  return request({
    url: '/mock/editTable',
    method: 'put',
    data
  });
}

// 获取表格详情
export function getTableDetail(data) {
  return request({
    url: '/mock/getTableDetail',
    method: 'get',
    data
  });
}
