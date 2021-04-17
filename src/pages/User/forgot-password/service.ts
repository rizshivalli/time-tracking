import request from 'umi-request';

export async function forgotPassword(params: { email: string }) {
  return request('/strapi/auth/forgot-password', {
    method: 'POST',
    data: params,
  });
}
