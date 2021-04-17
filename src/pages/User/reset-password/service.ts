import request from 'umi-request';

export async function resetPassword(params: any) {
  return request('/strapi/auth/reset-password', {
    method: 'POST',
    data: params,
  });
}
