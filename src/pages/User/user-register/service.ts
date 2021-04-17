// import request from 'umi-request';
import request from '@/utils/request';
import type { UserRegisterParams } from './index';

export async function register(params: UserRegisterParams) {
  return request('/strapi/auth/local/register', {
    method: 'POST',
    data: params,
  });
}
