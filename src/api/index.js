import { request, download, url } from '@/utils/request';

// 查询基础信息
export function getInfo(data) {
  return request({
    url: '/mock/user',
    method: 'get',
    data
  });
}

// 新增信息或修改信息
export function updateInfo(data) {
  return request({
    url: '/mock/user',
    method: 'post',
    data
  });
}

//删除模板
export function deleteInfo(data) {
  return request({
    url: '/mock/user',
    method: 'delete',
    data
  });
}

//下载模板
export function getFile() {
  const path = '/mock/file';
  return download(url + path);
}
