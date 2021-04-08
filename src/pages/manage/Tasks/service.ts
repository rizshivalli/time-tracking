import request from '@/utils/request';
import { getOrganization, getToken } from '@/utils/token';

type identifier = string | number | undefined;

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

export async function getCommonTasks() {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/tasks`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

export async function deleteCommonTask(test_id: identifier) {
  const token = await getToken();
  const organization = await getOrganization();
  const response = await request(`/strapi/tasks/${test_id}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}`, orgid: organization },
  });
  if (response.statusCode === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}
