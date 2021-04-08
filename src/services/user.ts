import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';

export async function query(): Promise<any> {
  return request('/api/users');
}

// To set user object in redux
export async function queryCurrent() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/users/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response?.statusCode === 200) {
    if (response?.data && response?.data?.id) {
      response.userid = response?.data?.id;
      response.name = `${response?.data?.first_name} ${response?.data?.last_name}`;
      response.avatar =
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    }
  }
  return response;
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
