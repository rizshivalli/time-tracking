import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';

export async function createTask(params: any) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request('/strapi/tasks', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
    data: params,
  });

  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function createNewFolder(params: any) {
  const token = await getToken();
  const response = await request(`/strapi/contents`, {
    method: 'post',
    headers: { Authorization: `Bearer ${token}` },
    data: params,
  });
  try {
    return response.data;
  } catch (err) {
    throw err;
  }
}
