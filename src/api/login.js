import { request } from '@/utils/request';

// 登录
export function login(data) {
  return request({
    url: '/mock/login',
    method: 'post',
    data
  });
}
